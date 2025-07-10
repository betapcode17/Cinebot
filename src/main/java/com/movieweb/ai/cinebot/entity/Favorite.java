package com.movieweb.ai.cinebot.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table(name = "favorites")
public class Favorite {
    @Column(value = "user_id")
    public com.movieweb.ai.cinebot.entity.User user;

    @Column(value = "movie_id")
    public com.movieweb.ai.cinebot.entity.Movie movie;

    @Id
    @Column(value = "user_id")
    public Long id;

    @Id
    @Column(value = "movie_id")
    public Long id1;

    public com.movieweb.ai.cinebot.entity.User getUser() {
        return user;
    }

    public void setUser(com.movieweb.ai.cinebot.entity.User user) {
        this.user = user;
    }

    public com.movieweb.ai.cinebot.entity.Movie getMovie() {
        return movie;
    }

    public void setMovie(com.movieweb.ai.cinebot.entity.Movie movie) {
        this.movie = movie;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId1() {
        return id1;
    }

    public void setId1(Long id1) {
        this.id1 = id1;
    }

}