package com.movieweb.ai.cinebot.repository;

import com.movieweb.ai.cinebot.entity.Favorite;
import com.movieweb.ai.cinebot.entity.FavoriteId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, FavoriteId> {
    List<Favorite> findById_UserId(Long userId); // Tên phương thức được điều chỉnh cho khóa tổng hợp

    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM Favorite f WHERE f.id.userId = ?1 AND f.id.movieId = ?2")
    boolean existsByUserIdAndMovieId(Long userId, Long movieId);

    void deleteById_UserIdAndId_MovieId(Long userId, Long movieId); // Điều chỉnh phương thức xóa
}