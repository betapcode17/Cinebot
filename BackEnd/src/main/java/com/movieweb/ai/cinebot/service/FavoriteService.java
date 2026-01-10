package com.movieweb.ai.cinebot.service;

import com.movieweb.ai.cinebot.entity.Favorite;
import com.movieweb.ai.cinebot.entity.FavoriteId;
import com.movieweb.ai.cinebot.entity.User;
import com.movieweb.ai.cinebot.repository.FavoriteRepository;
import com.movieweb.ai.cinebot.repository.MovieRepository;
import com.movieweb.ai.cinebot.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;

    public FavoriteService(FavoriteRepository favoriteRepository, UserRepository userRepository, MovieRepository movieRepository) {
        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
    }

    public void addFavorite(String username, Long movieId) {
        Long userId = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username))
                .getId();

        // Validate movieId
        if (!movieRepository.existsById(movieId)) {
            throw new IllegalArgumentException("Movie not found: " + movieId);
        }

        if (!favoriteRepository.existsByUserIdAndMovieId(userId, movieId)) {
            FavoriteId favoriteId = new FavoriteId();
            favoriteId.setUserId(userId);
            favoriteId.setMovieId(movieId);

            Favorite favorite = new Favorite();
            favorite.setId(favoriteId);

            favoriteRepository.save(favorite);
        }
    }

    public void removeFavorite(String username, Long movieId) {
        Long userId = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username))
                .getId();
        if (!movieRepository.existsById(movieId)) {
            throw new IllegalArgumentException("Movie not found: " + movieId);
        }
        if (!favoriteRepository.existsByUserIdAndMovieId(userId, movieId)) {
            throw new IllegalArgumentException("Movie not found: " + movieId);
        }
        favoriteRepository.deleteById_UserIdAndId_MovieId(userId, movieId);
    }


    public List<Long> getFavoriteMovieIds(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        List<Favorite> favorites = favoriteRepository.findById_UserId(user.getId());

        return favorites.stream()
                .map(fav -> fav.getId().getMovieId())
                .collect(Collectors.toList());
    }

}