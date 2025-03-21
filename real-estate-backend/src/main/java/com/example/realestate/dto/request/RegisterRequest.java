package com.example.realestate.dto.request;

import lombok.Data;
import org.springframework.context.annotation.Bean;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String email;
}
