package com.movieweb.ai.cinebot.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.Instant;

@Table(name = "chat_history")
public class ChatHistory {
    @Id
    public Long id;

    @Column(value = "user_id")
    public com.movieweb.ai.cinebot.entity.User user;

    @Column(value = "message")
    public String message;

    @Column(value = "response")
    public String response;

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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

}