package com.movieweb.ai.cinebot.service;

import com.movieweb.ai.cinebot.entity.Movie;
import com.movieweb.ai.cinebot.entity.Rating;
import com.movieweb.ai.cinebot.entity.User;
import com.movieweb.ai.cinebot.repository.MovieRepository;
import com.movieweb.ai.cinebot.repository.RatingRepository;
import com.movieweb.ai.cinebot.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RatingService {

    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;

    public Rating rateMovie(String username, Long movieId, int ratingValue, String comment) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        Rating rating = new Rating();
        rating.setId(null); // Để JPA tự sinh id nếu dùng @GeneratedValue
        rating.setUser(user);
        rating.setMovie(movie);
        rating.setRating(ratingValue);
        rating.setComment(comment);
        rating.setCreatedAt(Instant.now());

        return ratingRepository.save(rating);
    }

    public List<Rating> getRatingsByMovie(Long movieId) {
        return ratingRepository.findByMovie_Id(movieId);
    }

    public List<Rating> getRatingsByUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ratingRepository.findByUser_Id(user.getId());
    }

    public double getAverageRating(Long movieId) {
        List<Rating> ratings = ratingRepository.findByMovie_Id(movieId);
        if (ratings.isEmpty()) {
            return 0.0;
        }

        double total = ratings.stream()
                .mapToInt(Rating::getRating)
                .sum();
        return total / ratings.size();
    }
}
