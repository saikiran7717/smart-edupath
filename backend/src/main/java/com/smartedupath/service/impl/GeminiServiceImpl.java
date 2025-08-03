package com.smartedupath.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartedupath.service.GeminiService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class GeminiServiceImpl implements GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public GeminiServiceImpl(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    @Override
    public String getCompletion(String prompt) {
        try {
            String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;
            log.debug("Making request to Gemini API");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> request = new HashMap<>();
            Map<String, Object> part = new HashMap<>();
            part.put("text", prompt);
            request.put("contents", new Object[]{ Map.of("parts", new Object[]{part}) });

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

            return extractContent(response.getBody());

        } catch (Exception e) {
            log.error("Error calling Gemini API", e);
            return "[]"; // return empty recommendation
        }
    }

    private String extractContent(String response) throws Exception {
        JsonNode root = objectMapper.readTree(response);
        JsonNode textNode = root.path("candidates").get(0).path("content").path("parts").get(0).path("text");
        return textNode.asText();
    }
}
