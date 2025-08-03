package com.smartedupath.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartedupath.model.EducationPath;
import com.smartedupath.model.UserProfile;
import com.smartedupath.repo.UserRepo;
import com.smartedupath.service.GeminiService;
import com.smartedupath.service.RecommendationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendationServiceImpl implements RecommendationService {

    private final GeminiService geminiService;
    private final ObjectMapper objectMapper;
    private final UserRepo repo;

    @Override
    public List<EducationPath> generateRecommendations(UserProfile userProfile) {
        try {
            // Generate prompt for Gemini API based on user profile
            String prompt = generatePrompt(userProfile);

            repo.save(userProfile);
            log.debug("Generated prompt for user profile: {}", userProfile.getEmail());

            // Get response from Gemini API
            String aiResponse = geminiService.getCompletion(prompt);
            //System.out.println("AI Response: " + aiResponse);
            log.debug("Received AI response for user: {}", userProfile.getEmail());

            // Parse AI response into education paths
            return parseAIResponse(aiResponse);
        } catch (Exception e) {
            log.error("Error generating recommendations for user: {}", userProfile.getEmail(), e);
            // Return fallback recommendations if AI service fails
            return generateFallbackRecommendations(userProfile);
        }
    }

    private String generatePrompt(UserProfile userProfile) {
        return "You are an educational advisor AI that helps students find the best education path to achieve their career goals. " +
                "Based on the following user profile, provide 2-3 detailed education path recommendations that would help them achieve their dream job. " +
                "For each recommendation, include a title, description, specific steps to follow, estimated timeframe, and recommended institutions if applicable. " +
                "IMPORTANT: The recommended institutions (colleges/universities) should be based in India and relevant to the given field. " +
                "Format your response as a JSON array of objects, each with 'title', 'description', 'steps' (as an array), 'timeframe', and 'institutions' (as an array) fields. " +
                "\n\nUser Profile:\n" +
                "- Current Education Level: " + userProfile.getEducationLevel() + "\n" +
                "- Field of Study: " + (userProfile.getFieldOfStudy() != null ? userProfile.getFieldOfStudy() : "Not specified") + "\n" +
                "- Interests: " + String.join(", ", userProfile.getInterests()) + "\n" +
                "- Skills: " + (userProfile.getSkills() != null ? userProfile.getSkills() : "Not specified") + "\n" +
                "- Dream Job: " + userProfile.getDreamJob() + "\n" +
                "- Career Goal Description: " + (userProfile.getJobDescription() != null ? userProfile.getJobDescription() : "Not specified") + "\n" +
                "- Preferred Timeframe: " + (userProfile.getTimeframe() != null ? userProfile.getTimeframe() : "Not specified") + "\n\n" +
                "Respond with a well-structured JSON array containing education path recommendations focused on institutions in India.";
    }

    private List<EducationPath> parseAIResponse(String aiResponse) {
        try {
            // Extract JSON array from the response
            String jsonContent = extractJsonFromResponse(aiResponse);

            // Parse JSON to EducationPath objects
            EducationPath[] paths = objectMapper.readValue(jsonContent, EducationPath[].class);
            return Arrays.asList(paths);
        } catch (JsonProcessingException e) {
            log.error("Error parsing AI response", e);
            return new ArrayList<>();
        }
    }

    private String extractJsonFromResponse(String aiResponse) {
        // Simple extraction of JSON content from potential text wrapping
        int startIndex = aiResponse.indexOf('[');
        int endIndex = aiResponse.lastIndexOf(']') + 1;

        if (startIndex >= 0 && endIndex > 0 && endIndex > startIndex) {
            return aiResponse.substring(startIndex, endIndex);
        }

        return "[]"; // Return empty array if no valid JSON found
    }

    private List<EducationPath> generateFallbackRecommendations(UserProfile userProfile) {
        List<EducationPath> fallbackRecommendations = new ArrayList<>();

        // Create a generic recommendation based on user's dream job
        String dreamJob = userProfile.getDreamJob() != null ? userProfile.getDreamJob() : "your career goals";

        EducationPath fallback = EducationPath.builder()
                .title("Personalized Education Path for " + dreamJob)
                .description("We recommend researching programs that align with your interests and career goals in " + dreamJob + ".")
                .steps(Arrays.asList(
                        "Research universities or training programs in your field of interest",
                        "Connect with professionals in your target industry",
                        "Gain practical experience through internships or projects",
                        "Build a portfolio showcasing your skills and knowledge"
                ))
                .timeframe("Varies based on your starting point and goals")
                .institutions(Arrays.asList("Consult with educational counselors for specific institution recommendations"))
                .build();

        fallbackRecommendations.add(fallback);
        return fallbackRecommendations;
    }
}
