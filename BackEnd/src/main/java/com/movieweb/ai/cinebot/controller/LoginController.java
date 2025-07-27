package com.movieweb.ai.cinebot.controller;

import com.movieweb.ai.cinebot.dto.LoginRequest;
import com.movieweb.ai.cinebot.entity.User;
import com.movieweb.ai.cinebot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController // Sửa từ @Repository
@RequestMapping("/api/auth")
public class LoginController {

    private final AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    // Sử dụng constructor injection
    public LoginController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String rawPassword = loginRequest.getPassword();

        System.out.println("Login attempt - Username: " + username + ", Raw password: " + rawPassword);

        // Lấy user từ DB
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // In mật khẩu từ DB (mã hóa)
        System.out.println("DB password: " + user.getPassword());

        // Kiểm tra mật khẩu có khớp không
        boolean matches = passwordEncoder.matches(rawPassword, user.getPassword());
        System.out.println("Password match: " + matches);

        if (!matches) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, rawPassword)
            );

            System.out.println("Authentication success for: " + auth.getName());
            return ResponseEntity.ok("Login successful");
        } catch (AuthenticationException ex) {
            System.out.println("Authentication failed: " + ex.getMessage() + ", Cause: " + ex.getCause());
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
    @PostMapping("/debug/encode")
    public ResponseEntity<?> debugEncodePassword(@RequestBody Map<String, String> req) {
        String encoded = passwordEncoder.encode(req.get("password"));
        return ResponseEntity.ok("Encoded: " + encoded);
    }



    @PostMapping("/debug/match")
    public ResponseEntity<?> debugMatch(@RequestBody LoginRequest loginRequest) {
        String raw = loginRequest.getPassword();
        String encoded = "$2a$10$187OlVlqiJ362DQia3/j/.B89ZkW/lFEmpilnNHLl0evVs0zvnqCu";

        boolean match = passwordEncoder.matches(raw, encoded);
        return ResponseEntity.ok("Match? " + match);
    }

}