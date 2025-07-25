package com.movieweb.ai.cinebot.controller;

import com.movieweb.ai.cinebot.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    @Autowired
    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }




    //Lấy danh sách phim yêu thích
    @GetMapping("/{username}")
    public ResponseEntity<List<Long>> getFavoritesByUsername(@PathVariable String username) {
        List<Long> movieIDs = favoriteService.getFavoriteMovieIds(username);
        return ResponseEntity.ok(movieIDs);
    }



    //Thêm phim
    @PostMapping("/{movieId}")
    public ResponseEntity<String> addFavorite(@PathVariable Long movieId,
                                              @AuthenticationPrincipal UserDetails userDetails) {
        try {
            favoriteService.addFavorite(userDetails.getUsername(), movieId);
            return ResponseEntity.ok("Movie added to favorites");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }


    }

    // Xoá phim khỏi danh sách yêu thích
    @DeleteMapping("/{username}/{movieId}")
    public ResponseEntity<String> removeFavorite(@PathVariable String username, @PathVariable Long movieId) {
        favoriteService.removeFavorite(username, movieId);
        return ResponseEntity.ok("Removed from favorites");
    }
}