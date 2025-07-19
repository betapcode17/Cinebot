package com.movieweb.ai.cinebot.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.movieweb.ai.cinebot.entity.Movie;
import com.movieweb.ai.cinebot.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class TmdbService {

    private final RestTemplate restTemplate;
    private final MovieRepository movieRepository;

    @Value("${tmdb.api.key}")
    private String apiKey;

    /**
     * Tìm kiếm phim theo từ khóa
     */
    public String searchMovie(String query) {
        try {
            String encodedQuery = URLEncoder.encode(query, "UTF-8");
            String url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=vi&query=" + encodedQuery;
            return restTemplate.getForObject(url, String.class);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return "Lỗi mã hóa truy vấn.";
        }
    }
    public void fetchAndSaveMovie() {
        try {
            String url = "https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey + "&language=vi";
            String response = restTemplate.getForObject(url, String.class);
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            JsonNode results = root.path("results");
            for (JsonNode movieNode : results) {
                Long tmdbId = movieNode.get("id").asLong();
                // Kiểm tra xem phim đã tồn tại chưa (tránh lưu trùng)
                if (movieRepository.existsByTmdbId(tmdbId)) {
                    continue;
                }
                Movie movie = new Movie();
                System.out.println("Đang xử lý phim TMDB ID: " + movieNode.get("id").asLong());
                System.out.println("Tên phim: " + movieNode.get("title").asText());
                movie.setVoteCount(movieNode.get("vote_count").asInt());
                movie.setOriginalTitle(movieNode.get("original_title").asText());
                movie.setOriginalLanguage(movieNode.get("original_language").asText());
                movie.setPosterPath(movieNode.get("poster_path").asText());
                movie.setBackdropPath(movieNode.get("backdrop_path").asText());
                movie.setReleaseDate(LocalDate.parse(movieNode.get("release_date").asText()));
                movie.setAdult(movieNode.get("adult").asBoolean());
                movie.setVideo(movieNode.get("video").asBoolean());
                movie.setPopularity(movieNode.get("popularity").asDouble());
                movie.setTitle(movieNode.get("title").asText());
                movie.setOverview(movieNode.get("overview").asText());
                movie.setVoteAverage(movieNode.get("vote_average").asDouble());
                movieRepository.save(movie);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
