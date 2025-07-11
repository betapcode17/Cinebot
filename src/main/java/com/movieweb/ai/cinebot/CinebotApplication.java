package com.movieweb.ai.cinebot;

import com.movieweb.ai.cinebot.service.TmdbService;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CinebotApplication {

    public static void main(String[] args) {
        SpringApplication.run(CinebotApplication.class, args);
    }

}
