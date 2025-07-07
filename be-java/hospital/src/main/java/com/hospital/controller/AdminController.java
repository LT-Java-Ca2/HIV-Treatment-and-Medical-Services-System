package com.hospital.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.dto.response.AdminResponse;
import com.hospital.entity.Admin;
import com.hospital.security.JwtTokenUtil;
import com.hospital.service.AdminService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    @Autowired
    private AdminService adminService;

    @Autowired
    private JwtTokenUtil jwtUtil;

    private String extractEmailFromToken(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        return jwtUtil.extractUsername(token);
    }

    @GetMapping("/dashboard")
    public String getAdminDashboard() {
        return "Welcome to the Admin Dashboard";
    }

    @GetMapping("/details")
    public ResponseEntity<AdminResponse> getAdminDetails(@RequestHeader("Authorization") String token) {
        logger.debug("Received request to get admin details");
        logger.debug("Authorization token: {}", token);

        String email = extractEmailFromToken(token);
        logger.debug("Extracted email from token: {}", email);

        AdminResponse admin = adminService.getAdminData(email);

        if (admin != null) {
            logger.debug("Admin details found: {}", admin);
            return ResponseEntity.ok(admin);
        } else {
            logger.warn("No admin found for email: {}", email);
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerAdmin(@Valid @RequestBody Admin admin) {
        try {
            if (adminService.existsByEmail(admin.getEmail())) {
                logger.warn("Registration failed: Email already registered for admin: {}", admin.getEmail());
                return new ResponseEntity<>("Email đã được đăng ký", HttpStatus.CONFLICT);
            }

            Admin registeredAdmin = adminService.registerAdmin(admin);
            logger.info("Admin registered successfully: {}", registeredAdmin.getEmail());
            return new ResponseEntity<>(registeredAdmin, HttpStatus.CREATED);

        } catch (Exception e) {
            logger.error("Error registering admin: {}", e.getMessage(), e);
            return new ResponseEntity<>("Lỗi khi đăng ký Admin: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}