package com.movieweb.ai.cinebot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfig {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

//File này được sử dụng để cung cấp một instance của RestTemplate cho các thành phần khác trong ứng dụng, ví dụ như để gọi API bên ngoài