package com.smartedupath.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EducationPath {
    private String title;
    private String description;
    private List<String> steps;
    private String timeframe;
    private List<String> institutions;
}
