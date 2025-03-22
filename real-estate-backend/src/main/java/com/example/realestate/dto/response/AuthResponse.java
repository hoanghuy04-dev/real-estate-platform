package com.example.realestate.dto.response;

import com.example.realestate.model.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private boolean success;
    private String message;
    private UserEntity user;

}
