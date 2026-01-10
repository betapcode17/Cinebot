package com.movieweb.ai.cinebot.controller;


import com.movieweb.ai.cinebot.service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
public class RatingController {

    private final RatingService ratingService;

    @PostMapping("/{movieId}")
    public ResponseEntity<Void> rateMovie(
            @PathVariable Long movieId,
            @RequestParam String username,
            @RequestParam int rating,
            @RequestParam(required = false) String comment) {

        ratingService.rateMovie(username, movieId, rating, comment);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/{movieId}/average")
    public ResponseEntity<Double> getMovieAverageRating(@PathVariable Long movieId) {
        double avg = ratingService.getAverageRating(movieId);
        return ResponseEntity.ok(avg);
    }
}
