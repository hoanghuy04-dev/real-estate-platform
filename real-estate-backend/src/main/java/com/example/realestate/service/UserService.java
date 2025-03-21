package com.example.realestate.service;

import com.example.realestate.model.UserEntity;
import com.example.realestate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    public String login(String username, String password) {
        UserEntity user = userRepository.findByUsername(username).orElse(null);
        if(user == null) {
            return "Username is invalid!";
        } else if (!encoder.matches(password, user.getPassword())) {
            return "Password is incorrect!";
        }
        return "Welcome " + username + " to Real Estate Hub";
    }

    public String register(String username, String password, String email) {
        if (userRepository.findByUsername(username).isPresent()) {
            return "Username already exists!";
        }
        if (userRepository.findByEmail(email).isPresent()) {
            return "Email already exists!";
        }

        //Create new user to save to database
        UserEntity newUser = new UserEntity();
        newUser.setUsername(username);
        newUser.setPassword(encoder.encode(password));
        newUser.setEmail(email);
        userRepository.save(newUser);



        return "Registration successful for " + username + "!";
    }
}
