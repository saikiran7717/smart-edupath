
package com.smartedupath.service;

import java.util.List;

import com.smartedupath.model.EducationPath;
import com.smartedupath.model.UserProfile;

public interface RecommendationService {

    /*
     * Generates education path recommendations based on user profile data.
     * @return List of recommended education paths
     */
    List<EducationPath> generateRecommendations(UserProfile userProfile);
}
