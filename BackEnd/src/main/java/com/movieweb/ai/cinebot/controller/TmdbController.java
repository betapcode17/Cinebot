package com.movieweb.ai.cinebot.controller;

import com.movieweb.ai.cinebot.service.TmdbService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tmdb")
@RequiredArgsConstructor
public class TmdbController {

    private final TmdbService tmdbService;

    /**
     * Đồng bộ danh sách phim phổ biến từ TMDB về database
     */
    @PostMapping("/sync/popular")
    public ResponseEntity<String> syncPopularMovies() {
        try {
            tmdbService.fetchAndSaveMovie();
            return ResponseEntity.ok("Đồng bộ phim phổ biến thành công!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Lỗi khi đồng bộ: " + e.getMessage());
        }
    }

    /**
     * Tìm kiếm phim TMDB theo từ khóa (trả về raw JSON)
     */
    @GetMapping("/search")
    public ResponseEntity<String> searchMovies(@RequestParam("query") String query) {
        String result = tmdbService.searchMovie(query);
        return ResponseEntity.ok(result);
    }
}
