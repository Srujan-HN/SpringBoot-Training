package com.example.StudyVault.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
public class TestController {

    @GetMapping("/test")
    public String test(Authentication authentication) {
        return "Logged in user: " + authentication.getName();
    }
}