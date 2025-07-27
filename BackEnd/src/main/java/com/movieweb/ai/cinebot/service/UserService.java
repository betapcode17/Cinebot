package com.movieweb.ai.cinebot.service;


import com.movieweb.ai.cinebot.entity.User;
import com.movieweb.ai.cinebot.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
public class UserService {

    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired
    UserRepository userRepository;
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");
        user.setCreatedAt(Instant.now());
        return userRepository.save(user);
    }
    public User updateUserPassword(String username, String newPassword) {
        Optional<User> existingUser = userRepository.findByUsername(username);
        User user = existingUser.orElseGet(User::new);
        user.setUsername(username);
        String encodedPassword = passwordEncoder.encode(newPassword);
        System.out.println("New encoded password for " + username + ": " + encodedPassword);
        user.setPassword(encodedPassword);
        user.setRole("USER");
        user.setCreatedAt(Instant.now());
        User savedUser = userRepository.save(user);
        System.out.println("Saved user " + savedUser.getUsername() + " with password: " + savedUser.getPassword());
        return savedUser;
    }


}
