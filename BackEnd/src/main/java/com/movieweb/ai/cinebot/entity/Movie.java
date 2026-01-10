package com.movieweb.ai.cinebot.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "movies")
public class Movie {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Size(max = 255)
    @Column(name = "title")
    private String title;

    @Size(max = 255)
    @Column(name = "original_title")
    private String originalTitle;

    @Lob
    @Column(name = "overview")
    private String overview;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Size(max = 10)
    @Column(name = "original_language", length = 10)
    private String originalLanguage;

    @Column(name = "vote_average")
    private Double voteAverage;

    @Column(name = "vote_count")
    private Integer voteCount;

    @Column(name = "popularity")
    private Double popularity;

    @Size(max = 255)
    @Column(name = "poster_path")
    private String posterPath;

    @Size(max = 255)
    @Column(name = "backdrop_path")
    private String backdropPath;

    @Column(name = "adult")
    private Boolean adult;

    @Column(name = "video")
    private Boolean video;

    @Column(name = "tmdb_id")
    private Long tmdbId;

}