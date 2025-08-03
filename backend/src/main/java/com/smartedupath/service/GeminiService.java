
package com.smartedupath.service;

public interface GeminiService {

    /**
     * Get a completion from the DeepSeek API
     *
     * @param prompt The prompt to send to the API
     * @return The completion text
     */
    String getCompletion(String prompt);
}
