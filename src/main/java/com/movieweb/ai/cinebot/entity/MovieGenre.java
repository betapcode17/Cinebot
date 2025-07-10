package com.movieweb.ai.cinebot.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table(name = "movie_genres")
public class MovieGenre {
    @Column(value = "movie_id")
    public com.movieweb.ai.cinebot.entity.Movie movie;

    @Column(value = "genre_id")
    public Genre genre;

    @Id
    @Column(value = "movie_id")
    public Long id;

    @Id
    @Column(value = "genre_id")
    public Integer id1;

    public com.movieweb.ai.cinebot.entity.Movie getMovie() {
        return movie;
    }

    public void setMovie(com.movieweb.ai.cinebot.entity.Movie movie) {
        this.movie = movie;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getId1() {
        return id1;
    }

    public void setId1(Integer id1) {
        this.id1 = id1;
    }

}