package com.smartedupath.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartedupath.model.EducationPath;
import com.smartedupath.model.UserProfile;
import com.smartedupath.service.RecommendationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;

    @PostMapping("/recommendations")
    public ResponseEntity<List<EducationPath>> getRecommendations(@Valid @RequestBody UserProfile userProfile) {
        List<EducationPath> recommendations = recommendationService.generateRecommendations(userProfile);
        return ResponseEntity.ok(recommendations);
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("API is running");
    }
}
