package com.smartedupath.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class UserProfile {

    @NotBlank(message = "Name is required")
    private String name;

    @Id
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @Min(value = 15, message = "Age must be at least 15")
    private int age;

    @NotBlank(message = "Education level is required")
    private String educationLevel;

    private String fieldOfStudy;

    private Double gpa;

    @Size(min = 1, message = "At least one interest is required")
    private List<String> interests;

    private String skills;

    @NotBlank(message = "Dream job is required")
    private String dreamJob;

    private String jobDescription;

    private String timeframe;
}
