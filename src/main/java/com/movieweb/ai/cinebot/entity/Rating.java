package com.movieweb.ai.cinebot.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.Instant;

@Table(name = "ratings")
public class Rating {
    @Id
    public Long id;

    @Column(value = "user_id")
    public com.movieweb.ai.cinebot.entity.User user;

    @Column(value = "movie_id")
    public Movie movie;

    @Column(value = "rating")
    public Integer rating;

    @Column(value = "comment")
    public String comment;

    @Column(value = "created_at")
    public Instant createdAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public com.movieweb.ai.cinebot.entity.User getUser() {
        return user;
    }

    public void setUser(com.movieweb.ai.cinebot.entity.User user) {
        this.user = user;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

}