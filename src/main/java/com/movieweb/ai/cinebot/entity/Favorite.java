package com.movieweb.ai.cinebot.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table(name = "favorites")
public class Favorite {
    @Id
    private Long id; // Khóa chính duy nhất

    @Column(value = "user_id")
    private Long userId; // Thay vì lưu toàn bộ đối tượng User

    @Column(value = "movie_id")
    private Long movieId; // Thay vì lưu toàn bộ đối tượng Movie

    // Getters và setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }
}