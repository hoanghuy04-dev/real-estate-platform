package com.example.realestate.service;

import com.example.realestate.model.UserEntity;
import com.example.realestate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


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

    public void initUserData() {
        if (userRepository.count() == 0) {
            UserEntity admin = new UserEntity();
            admin.setUsername("admin");
            admin.setPassword(encoder.encode("123")); // Nên mã hóa mật khẩu trước khi lưu vào DB
            admin.setEmail("admin@example.com");
            admin.setName("Admin Real Estate");
            admin.setPhone("0123456789");

            UserEntity user1 = new UserEntity();
            user1.setUsername("user1");
            user1.setPassword(encoder.encode("123"));
            user1.setEmail("user1@example.com");
            user1.setName("Hoàng");
            user1.setPhone("0987654321");

            UserEntity user2 = new UserEntity();
            user2.setUsername("user2");
            user2.setPassword(encoder.encode("123"));
            user2.setEmail("user2@example.com");
            user2.setName("Huy");
            user2.setPhone("0364635032");

            userRepository.saveAll(List.of(admin, user1, user2));
        }
    }
}
