	package com.hospital.repository;

	import org.springframework.data.jpa.repository.JpaRepository;
	import org.springframework.stereotype.Repository;

	import com.hospital.entity.Admin;

	import java.util.Optional; // Import lớp Optional

	@Repository
	public interface AdminRepository extends JpaRepository<Admin, Integer> {

		// Thay đổi kiểu trả về thành Optional<Admin>
		Optional<Admin> findByEmail(String email);

		// Bạn cũng có thể thêm phương thức này để kiểm tra sự tồn tại nhanh hơn
		boolean existsByEmail(String email); // Rất hữu ích cho việc kiểm tra email trùng lặp
	}