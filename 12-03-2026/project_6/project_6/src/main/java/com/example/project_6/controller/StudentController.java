package com.example.project_6.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_6.dto.request.StudentRequest;
import com.example.project_6.dto.request.TeachersRequest;
import com.example.project_6.dto.response.ApiResponse;
import com.example.project_6.dto.response.StudentResponse;
import com.example.project_6.dto.response.TeachersResponse;
import com.example.project_6.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    
    @PostMapping("/college")
    public ApiResponse<StudentResponse> getStudentDetails(@RequestBody StudentRequest request) {

        StudentResponse studentResponse = studentService.getStudent(request);

        return new ApiResponse<>("Student created successfully", studentResponse);
    }

    
    @PostMapping("/{id}/details")
    public ApiResponse<TeachersResponse> getStuDetails(
            @PathVariable Long id,
            @RequestBody TeachersRequest request) {

        TeachersResponse teachersResponse = studentService.getDetails(id, request);

        return new ApiResponse<>("Details added successfully", teachersResponse);
    }
}