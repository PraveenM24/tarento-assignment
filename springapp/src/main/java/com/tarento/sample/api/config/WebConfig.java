package com.tarento.sample.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // Global CORS Config
    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry
                .addMapping("/api/v/1")
                .allowedMethods("POST")
                .allowedOrigins(
                        "http://localhost:3000"
                )
                .allowedHeaders("*");
    }

}
