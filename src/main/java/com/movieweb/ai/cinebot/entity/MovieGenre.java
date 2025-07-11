package com.movieweb.ai.cinebot.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table(name = "movie_genres")
public class MovieGenre {
    @Id
    private Long id; // Khóa chính duy nhất

    @Column(value = "movie_id")
    private Long movieId; // Thay vì lưu toàn bộ đối tượng Movie

    @Column(value = "genre_id")
    private Integer genreId; // Thay vì lưu toàn bộ đối tượng Genre

    // Getters và setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public Integer getGenreId() {
        return genreId;
    }

    public void setGenreId(Integer genreId) {
        this.genreId = genreId;
    }
}