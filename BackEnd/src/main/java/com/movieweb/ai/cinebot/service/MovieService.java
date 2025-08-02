package com.movieweb.ai.cinebot.service;

import com.movieweb.ai.cinebot.entity.Movie;

import java.util.List;

public interface MovieService {
    List<Movie>  getAllMovies();
    List<Movie>  seacrchMovies(String keyword);
    Movie getMovieDetails(Long movieId);
}
