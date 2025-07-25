package com.movieweb.ai.cinebot.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "chat_history")
public class ChatHistory {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id")
    private com.movieweb.ai.cinebot.entity.User user;

    @NotNull
    @Lob
    @Column(name = "message", nullable = false)
    private String message;

    @Lob
    @Column(name = "response")
    private String response;

    @Column(name = "created_at")
    private Instant createdAt;

}