package com.movieweb.ai.cinebot.repository;

import com.movieweb.ai.cinebot.entity.User;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository  extends CrudRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
