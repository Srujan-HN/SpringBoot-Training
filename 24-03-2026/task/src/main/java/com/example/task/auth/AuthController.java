package com.example.task.auth;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest registerRequest){
        String message = authService.register(registerRequest.getUsername(), registerRequest.getPassword());
        return new AuthResponse(null, message);

    }
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest loginRequest){
        String token = authService.login(loginRequest.getUsername(), loginRequest.getPassword());
        return new AuthResponse(token, "Login successful");
        
    }
    @GetMapping("/hello")
    public String hello(){
        return "Hello, You Are Authenticated User!";
        
}
    
}
