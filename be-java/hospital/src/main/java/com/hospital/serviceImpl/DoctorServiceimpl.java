package com.hospital.serviceImpl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.dto.request.DoctorRequest;
import com.hospital.dto.response.DoctorResponse;
import com.hospital.entity.Doctor;
import com.hospital.entity.User;
import com.hospital.exception.CustomInternalServerException;
import com.hospital.exception.EmailAlreadyExistsException;
import com.hospital.repository.DoctorRepository;
import com.hospital.service.DoctorService;
import com.hospital.service.UserService;

@Service
public class DoctorServiceimpl implements DoctorService {

    private static final Logger logger = LoggerFactory.getLogger(DoctorServiceimpl.class);

    @Autowired
    private UserService userService;

    @Autowired
    private DoctorRepository doctorRepository;

    public DoctorResponse registerDoctor(DoctorRequest request) {
        if (request == null) {
            logger.error("Registration request is null in registerDoctor method.");
            throw new IllegalArgumentException("Registration request cannot be null");
        }

        try {
            User savedUser = userService.createUser(request.getEmail(), request.getPassword(), "DOCTOR");
            logger.info("User created successfully for doctor registration with email: {}", request.getEmail());

            Doctor doctor = new Doctor();
            BeanUtils.copyProperties(request, doctor);

            if (doctor.getJoiningDate() == null) {
                doctor.setJoiningDate(LocalDate.now());
                logger.info("Joining date set to current date for doctor: {}", request.getEmail());
            }

            if (doctor.getSpecialization() == null || doctor.getSpecialization().trim().isEmpty()) {
                doctor.setSpecialization("General Physician");
                logger.warn("Specialization was null/empty for doctor {}. Defaulting to 'General Physician'.", request.getEmail());
            }

            if (doctor.getBloodGroup() == null || doctor.getBloodGroup().trim().isEmpty()) {
                doctor.setBloodGroup("Unknown");
                logger.warn("Blood Group was null/empty for doctor {}. Defaulting to 'Unknown'.", request.getEmail());
            }

            doctor.setUserId(savedUser.getId());
            doctor = doctorRepository.save(doctor);
            logger.info("Doctor profile saved successfully for email: {}", doctor.getEmail());
            return convertToResponse(doctor);

        } catch (EmailAlreadyExistsException ex) {
            logger.warn("Attempted doctor registration with existing email: {}", request.getEmail(), ex);
            throw new EmailAlreadyExistsException(
                    "Email đã được đăng ký. Vui lòng sử dụng một email khác.");
        } catch (IllegalArgumentException ex) {
            logger.error("Validation error during doctor registration for email: {}. Error: {}", request.getEmail(), ex.getMessage(), ex);
            throw ex;
        } catch (Exception ex) {
            logger.error("An unexpected error occurred while registering the doctor with email: {}. Error: {}", request.getEmail(), ex.getMessage(), ex);
            throw new CustomInternalServerException(
                    "Có lỗi xảy ra khi đăng ký bác sĩ. Vui lòng thử lại sau. Chi tiết lỗi: " + ex.getMessage());
        }
    }

    public DoctorResponse fetchDoctorByEmail(String email) {
        Doctor doctor = doctorRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Doctor not found"));
        return convertToResponse(doctor);
    }

    public List<DoctorResponse> fetchAllDoctors() {
        return doctorRepository.findAll().stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    public boolean deleteDoctor(String email) {
        Doctor doctor = doctorRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Doctor not found"));
        if (doctor != null) {
            doctorRepository.delete(doctor);
            return true;
        }
        return false;
    }

    private DoctorResponse convertToResponse(Doctor doctor) {
        DoctorResponse response = new DoctorResponse();
        response.setId(doctor.getId());
        response.setFirstName(doctor.getFirstName());
        response.setLastName(doctor.getLastName());
        response.setEmail(doctor.getEmail());
        response.setPhoneNumber(doctor.getPhoneNumber());
        response.setGender(doctor.getGender());
        response.setDateOfBirth(doctor.getDateOfBirth());
        response.setCity(doctor.getCity());
        response.setState(doctor.getState());
        response.setCountry(doctor.getCountry());
        response.setJoiningDate(doctor.getJoiningDate());
        response.setSpecialization(doctor.getSpecialization());
        response.setBloodGroup(doctor.getBloodGroup());
        return response;
    }

    @Override
    public DoctorResponse updateDoctor(String email, DoctorResponse request) {
        Doctor doctor = doctorRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Doctor not found"));

        doctor.setFirstName(request.getFirstName());
        doctor.setLastName(request.getLastName());
        doctor.setPhoneNumber(request.getPhoneNumber());
        doctor.setCity(request.getCity());
        doctor.setState(request.getState());
        doctor.setCountry(request.getCountry());
        doctor.setSpecialization(request.getSpecialization());
        doctor.setBloodGroup(request.getBloodGroup());

        doctor = doctorRepository.save(doctor);
        return convertToResponse(doctor);
    }
}