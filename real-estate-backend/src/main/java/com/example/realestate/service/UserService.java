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
    public UserEntity login(String username, String password) {
        UserEntity user = userRepository.findByUsername(username).orElse(null);
        if(user == null || !encoder.matches(password, user.getPassword())) {
            return null;
        }
        return user;
    }

    public UserEntity register(String username, String password, String email) {
        if (userRepository.findByUsername(username).isPresent()) {
            return null;
        }
        if (userRepository.findByEmail(email).isPresent()) {
            return null;
        }

        //Create new user to save to database
        UserEntity newUser = new UserEntity();
        newUser.setUsername(username);
        newUser.setPassword(encoder.encode(password));
        newUser.setEmail(email);
        userRepository.save(newUser);



        return newUser;
    }
}
