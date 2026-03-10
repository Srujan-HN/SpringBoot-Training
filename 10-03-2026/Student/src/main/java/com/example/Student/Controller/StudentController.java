package com.example.Student.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Student.Dto.Request.StudentRequest;
import com.example.Student.Dto.Response.ApiResponse;
import com.example.Student.Dto.Response.StudentResponse;
import com.example.Student.Service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {
    private final StudentService studentService;
    public StudentController(StudentService studentService){
        this.studentService=studentService;
    }

    @PostMapping("/calc")
    public ApiResponse getResults(@RequestBody StudentRequest request){
        StudentResponse result =studentService.calStudentResponse(request);
        return new ApiResponse("Success", result);
    }
    
}
