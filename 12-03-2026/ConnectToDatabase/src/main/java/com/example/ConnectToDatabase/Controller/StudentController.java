package com.example.ConnectToDatabase.Controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ConnectToDatabase.Dto.Request.RegisterRequest;
import com.example.ConnectToDatabase.Dto.Request.StudentRequest;
import com.example.ConnectToDatabase.Dto.Response.ApiResponse;
import com.example.ConnectToDatabase.Dto.Response.StudentResponse;
import com.example.ConnectToDatabase.Service.StudentService;

@RestController
@RequestMapping("/student")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }
    @PostMapping("/add")
    public ApiResponse<StudentResponse>createStudent(@RequestBody StudentRequest request){
        StudentResponse studentResponse =studentService.saveStudent(request);

        return new ApiResponse<>("success", studentResponse);
    }

    @PostMapping("/{id}/register")
    public ApiResponse<StudentResponse>assignRegister(
        @PathVariable Long id,@RequestBody RegisterRequest req){
        StudentResponse studentResponse=studentService.assign(id, req.getRegistrationNumber());
        return new ApiResponse<>("success", studentResponse);
        }
        

}
