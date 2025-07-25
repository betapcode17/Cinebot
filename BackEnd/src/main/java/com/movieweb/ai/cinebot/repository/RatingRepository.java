package com.movieweb.ai.cinebot.repository;

import com.movieweb.ai.cinebot.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByMovie_Id(Long movieId);
    List<Rating> findByUser_Id(Long userId);
}
