package com.movieweb.ai.cinebot.repository;

import com.movieweb.ai.cinebot.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    boolean existsByTmdbId(Long tmdbId); // để kiểm tra trùng phim trước khi insert
}
