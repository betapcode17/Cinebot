package com.movieweb.ai.cinebot.repository;

import com.movieweb.ai.cinebot.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    boolean existsByTmdbId(Long tmdbId); // để kiểm tra trùng phim trước khi insert
    //Tìm tên film
    List<Movie> findByTitleContainingIgnoreCase(String keyword);

}
