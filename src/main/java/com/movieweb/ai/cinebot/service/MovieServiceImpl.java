package com.movieweb.ai.cinebot.service;

import com.movieweb.ai.cinebot.entity.Movie;
import com.movieweb.ai.cinebot.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class MovieServiceImpl implements MovieService {
    private final MovieRepository movieRepository;

    public MovieServiceImpl(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }


    @Override
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @Override
    public List<Movie> seacrchMovies(String keyword) {
        return movieRepository.findByTitleContainingIgnoreCase(keyword);
    }

    @Override
    public Movie getMovieDetails(Long movieId) {
        return movieRepository.findById(movieId).orElseThrow(()-> new RuntimeException("Phim không tồn tại"));
    }
}
