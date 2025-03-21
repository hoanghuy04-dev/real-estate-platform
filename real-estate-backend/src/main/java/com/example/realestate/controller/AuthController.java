package com.example.realestate.controller;

import com.example.realestate.dto.request.LoginRequest;
import com.example.realestate.dto.request.RegisterRequest;
import com.example.realestate.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        return userService.login(loginRequest.getUsername(), loginRequest.getPassword());
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest registerRequest) {
        return userService.register(registerRequest.getUsername(), registerRequest.getPassword(), registerRequest.getEmail());
    }
}
