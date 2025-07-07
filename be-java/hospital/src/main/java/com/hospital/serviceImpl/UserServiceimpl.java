package com.hospital.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hospital.entity.User;
import com.hospital.exception.EmailAlreadyExistsException;
import com.hospital.repository.UserRepository;
import com.hospital.service.UserService;

@Service
public class UserServiceimpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public User createUser(String email, String password, String role) {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email không được để trống");
        }
        if (password == null || password.trim().isEmpty()) {
            throw new IllegalArgumentException("Mật khẩu không được để trống");
        }
        if (role == null || role.trim().isEmpty()) {
            throw new IllegalArgumentException("Vai trò không được để trống");
        }

        if (userRepository.findByEmail(email).isPresent()) {
            throw new EmailAlreadyExistsException("Email đã được đăng ký");
        }

        try {
            User user = User.builder()
                    .email(email)
                    .password(passwordEncoder.encode(password))
                    .role(role)
                    .isActive(true)
                    .build();

            return userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Có lỗi xảy ra khi tạo tài khoản. Vui lòng thử lại sau.", e);
        }
    }

    @Override
    @Transactional
    public void deleteUser(Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID không được để trống");
        }
        try {
            userRepository.deleteById(userId);
        } catch (Exception e) {
            throw new RuntimeException("Có lỗi xảy ra khi xóa tài khoản. Vui lòng thử lại sau.", e);
        }
    }
}