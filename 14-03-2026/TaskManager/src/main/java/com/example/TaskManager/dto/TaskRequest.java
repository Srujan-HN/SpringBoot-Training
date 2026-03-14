package com.example.TaskManager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data

public class TaskRequest {
@NotBlank(message = "Title is required")
    private String title;
    private String description;
    @Positive(message = "Priority must be a positive integer")
    private String priority;
    
}
