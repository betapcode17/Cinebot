package com.movieweb.ai.cinebot.controller;


import com.movieweb.ai.cinebot.service.TmdbService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {
    private final TmdbService tmdbService;
    @GetMapping("/search")
    public String searchMovies(@RequestParam String query) {
        return tmdbService.searchMovie(query);
    }
}
