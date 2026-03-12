package com.example.SpringDatabase.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.SpringDatabase.Dto.Request.StudentRequest;
import com.example.SpringDatabase.Dto.Response.ApiResponse;
import com.example.SpringDatabase.Dto.Response.StudentResponse;
import com.example.SpringDatabase.Services.StudentService;

@RestController
@RequestMapping("/student")
public class StudentController {
    private final StudentService studentService;
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }


    @PostMapping("/info")
    public ApiResponse<StudentResponse> getResponse(@RequestBody StudentRequest studentRequest){
        StudentResponse response=studentService.process(studentRequest);
        return new ApiResponse<StudentResponse>("Success", response);
    }
    @GetMapping("/result")
    public ApiResponse< List<StudentResponse>> getAllStudentResult(){
        List<StudentResponse>result =studentService.getAllStudentResult();
        return new ApiResponse<List<StudentResponse>>("Success", result);
        
    }
    
}
