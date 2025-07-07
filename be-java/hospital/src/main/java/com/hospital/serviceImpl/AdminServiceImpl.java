package com.hospital.serviceImpl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hospital.dto.response.AdminResponse;
import com.hospital.entity.Admin;
import com.hospital.repository.AdminRepository;
import com.hospital.service.AdminService;

import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminServiceImpl(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AdminResponse getAdminData(String email) {
        Optional<Admin> adminOptional = this.adminRepository.findByEmail(email);
        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            AdminResponse adminResponse = new AdminResponse();
            BeanUtils.copyProperties(admin, adminResponse);
            return adminResponse;
        }
        return null;
    }

    @Override
    @Transactional
    public Admin registerAdmin(Admin admin) {
        if (adminRepository.existsByEmail(admin.getEmail())) {
            throw new RuntimeException("Email đã được đăng ký.");
        }
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    @Override
    public boolean existsByEmail(String email) {
        return adminRepository.existsByEmail(email);
    }
}