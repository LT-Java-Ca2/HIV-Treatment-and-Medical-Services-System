package com.hospital.service;

import com.hospital.dto.response.AdminResponse;
import com.hospital.entity.Admin; // Import Admin entity

public interface AdminService {

    public AdminResponse getAdminData(String email);

    // Phương thức để đăng ký Admin mới
    public Admin registerAdmin(Admin admin); // Nhận Admin entity và trả về Admin đã được lưu

    // Phương thức để kiểm tra email đã tồn tại chưa
    public boolean existsByEmail(String email);
}