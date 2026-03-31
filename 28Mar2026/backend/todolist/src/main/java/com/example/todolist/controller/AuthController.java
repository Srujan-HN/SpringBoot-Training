package com.example.todolist.controller;

import org.springframework.web.bind.annotation.*;

import com.example.todolist.dto.request.LoginRequest;
import com.example.todolist.dto.request.RegisterRequest;
import com.example.todolist.dto.response.ApiResponse;
import com.example.todolist.service.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173") // ✅ FIXED PORT
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ApiResponse<String> register(@RequestBody RegisterRequest request) {
        String message = authService.register(request.getUsername(), request.getPassword());
        return new ApiResponse<>(true, "Registered", message);
    }

    @PostMapping("/login")
    public ApiResponse<String> login(@RequestBody LoginRequest request) {
        String token = authService.login(request.getUsername(), request.getPassword());
        return new ApiResponse<>(true, "Login success", token);
    }
}