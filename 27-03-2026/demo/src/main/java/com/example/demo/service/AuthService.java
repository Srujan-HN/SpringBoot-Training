package com.example.demo.service;

import com.example.demo.dto.AuthRequest;
import com.example.demo.dto.AuthResponse;
import com.example.demo.entity.LoginRecord;
import com.example.demo.entity.User;
import com.example.demo.repository.LoginRecordRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final LoginRecordRepository loginRecordRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse register(AuthRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Default role USER if not provided
        user.setRole(request.getRole() != null ? request.getRole() : "ROLE_USER");

        User saved = userRepository.save(user);

        String token = jwtUtil.generateToken(saved.getUsername(), saved.getRole());

        return new AuthResponse("User registered successfully", saved.getUsername(), token);
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        LoginRecord record = new LoginRecord();
        record.setUserId(user.getId());
        record.setUsername(user.getUsername());
        loginRecordRepository.save(record);

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

        return new AuthResponse("Login successful", user.getUsername(), token);
    }

    public List<User> getAllRegisteredUsers() {
        return userRepository.findAll();
    }

    public List<LoginRecord> getAllLoginRecords() {
        return loginRecordRepository.findAll();
    }
}