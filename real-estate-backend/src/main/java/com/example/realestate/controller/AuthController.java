package com.example.realestate.controller;

import com.example.realestate.dto.request.LoginRequest;
import com.example.realestate.dto.request.RegisterRequest;
import com.example.realestate.dto.response.AuthResponse;
import com.example.realestate.model.UserEntity;
import com.example.realestate.service.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostConstruct
    public void init() {
        userService.initUserData();
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        UserEntity user = userService.login(loginRequest.getUsername(), loginRequest.getPassword());

        if (user != null) {
            return ResponseEntity.ok(new AuthResponse(true, "Login successful!", user));
        }
        return ResponseEntity.badRequest().body(new AuthResponse(false, "Invalid credentials!", null));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest) {
        try{
            UserEntity user = userService.register(registerRequest.getUsername(), registerRequest.getPassword(), registerRequest.getEmail());
            return ResponseEntity.ok(new AuthResponse(true, "Registration successful!", user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new AuthResponse(false, "Registration failed: " + e.getMessage(), null));
        }
    }
}
