package com.hospital.serviceImpl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.dao.DataIntegrityViolationException;

import com.hospital.dto.request.PatientRegistrationRequest;
import com.hospital.dto.response.PatientResponse;
import com.hospital.entity.Patient;
import com.hospital.entity.User;
import com.hospital.enums.Gender;
import com.hospital.exception.CustomInternalServerException;
import com.hospital.exception.EmailAlreadyExistsException;
import com.hospital.mapper.PatientMapper;
import com.hospital.repository.PatientRepository;
import com.hospital.service.PatientService;
import com.hospital.service.UserService;

import jakarta.transaction.Transactional;

@Service
public class PatientServiceImpl implements PatientService {

    private static final Logger logger = LoggerFactory.getLogger(PatientServiceImpl.class);

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private UserService userService;

    @Override
    @Transactional
    public PatientResponse registerPatient(PatientRegistrationRequest request) {
        if (request == null) {
            logger.error("Registration request is null");
            throw new IllegalArgumentException("Thông tin đăng ký không hợp lệ");
        }

        validateRegistrationRequest(request);

        if (patientRepository.findByEmail(request.getEmail()).isPresent()) {
            logger.warn("Email already exists in patient profiles: {}", request.getEmail());
            throw new EmailAlreadyExistsException("Email đã được đăng ký cho một bệnh nhân khác.");
        }

        try {
            logger.debug("Creating user account for email: {}", request.getEmail());
            User savedUser = userService.createUser(request.getEmail(), request.getPassword(), "PATIENT");
            logger.debug("User account created successfully with ID: {}", savedUser.getId());

            Patient patient = new Patient();
            BeanUtils.copyProperties(request, patient);

            patient.setUserId(savedUser.getId());
            patient.setEmail(request.getEmail());
            patient.setUsername(request.getEmail());
            patient.setActive(true);
            patient.setRegistrationDate(LocalDate.now());
            
            // If Patient entity's password field is nullable=false, you MUST set it here.
            // Consider if Patient entity truly needs a password field, as User entity already has it.
            // Example if needed: patient.setPassword(savedUser.getHashedPassword()); // Assuming User entity stores hashed password

            logger.debug("Saving patient profile");
            Patient savedPatient = patientRepository.save(patient);
            logger.info("Patient profile saved successfully with ID: {}", savedPatient.getPatientId());

            return PatientMapper.toPatientResponse(savedPatient);

        } catch (EmailAlreadyExistsException ex) {
            logger.warn("Email already exists during user creation or patient profile check: {}", request.getEmail(), ex);
            throw ex;
        } catch (DataIntegrityViolationException ex) {
            logger.error("Data integrity violation during patient registration for email: " + request.getEmail(), ex);
            if (ex.getMessage().contains("UNIQUE_EMAIL") || ex.getMessage().contains("uq_email")) {
                throw new EmailAlreadyExistsException("Email đã được đăng ký trong hệ thống.");
            } else if (ex.getMessage().contains("UNIQUE_USERNAME") || ex.getMessage().contains("uq_username")) {
                throw new IllegalArgumentException("Username đã được sử dụng. Vui lòng chọn Username khác.");
            }
            throw new CustomInternalServerException("Có lỗi dữ liệu xảy ra khi đăng ký. Vui lòng kiểm tra lại thông tin hoặc thử lại sau.");
        } catch (IllegalArgumentException ex) {
            logger.error("Validation or conversion error during patient registration for email: " + request.getEmail(), ex);
            throw ex;
        } catch (Exception ex) {
            logger.error("Unexpected error during patient registration for email: " + request.getEmail(), ex);
            throw new CustomInternalServerException("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.");
        }
    }

    private void validateRegistrationRequest(PatientRegistrationRequest request) {
        if (request.getFirstName() == null || request.getFirstName().trim().isEmpty()) {
            logger.warn("Validation failed: First name is empty");
            throw new IllegalArgumentException("Họ không được để trống");
        }
        if (request.getLastName() == null || request.getLastName().trim().isEmpty()) {
            logger.warn("Validation failed: Last name is empty");
            throw new IllegalArgumentException("Tên không được để trống");
        }
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            logger.warn("Validation failed: Email is empty");
            throw new IllegalArgumentException("Email không được để trống");
        }
        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            logger.warn("Validation failed: Mật khẩu không được để trống");
            throw new IllegalArgumentException("Mật khẩu không được để trống");
        }
        if (request.getPhoneNumber() == null || request.getPhoneNumber().trim().isEmpty()) {
            logger.warn("Validation failed: Số điện thoại không được để trống");
            throw new IllegalArgumentException("Số điện thoại không được để trống");
        }
        if (request.getDateOfBirth() == null) {
            logger.warn("Validation failed: Ngày sinh không được để trống");
            throw new IllegalArgumentException("Ngày sinh không được để trống");
        }
        if (request.getGender() == null) {
            logger.warn("Validation failed: Giới tính không được để trống");
            throw new IllegalArgumentException("Giới tính không được để trống.");
        }
        logger.debug("Registration request validation passed");
    }

    public Optional<Patient> findByEmail(String email) {
        return patientRepository.findByEmail(email);
    }

    @Override
    public PatientResponse getPatientByEmail(String email) {
        Optional<Patient> patient = patientRepository.findByEmail(email);
        return patient.map(PatientMapper::toPatientResponse).orElse(null);
    }

    @Override
    public List<PatientResponse> getAllPatients() {
        List<Patient> patients = patientRepository.findAll();
        return patients.stream().map(PatientMapper::toPatientResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PatientResponse updatePatient(String email, PatientResponse updatedPatient) {
        Optional<Patient> existingPatient = findByEmail(email);

        if (!existingPatient.isPresent()) {
            throw new IllegalArgumentException("Patient not found");
        }

        Patient patient = existingPatient.get();

        if (updatedPatient.getFirstName() != null && !updatedPatient.getFirstName().trim().isEmpty()) {
            patient.setFirstName(updatedPatient.getFirstName().trim());
        }
        if (updatedPatient.getLastName() != null && !updatedPatient.getLastName().trim().isEmpty()) {
            patient.setLastName(updatedPatient.getLastName().trim());
        }
        if (updatedPatient.getPhoneNumber() != null && !updatedPatient.getPhoneNumber().trim().isEmpty()) {
            patient.setPhoneNumber(updatedPatient.getPhoneNumber().trim());
        }
        if (updatedPatient.getGender() != null) {
            patient.setGender(updatedPatient.getGender());
        }
        if (updatedPatient.getDateOfBirth() != null) {
            patient.setDateOfBirth(updatedPatient.getDateOfBirth());
        }
        if (updatedPatient.getCity() != null && !updatedPatient.getCity().trim().isEmpty()) {
            patient.setCity(updatedPatient.getCity().trim());
        }
        if (updatedPatient.getState() != null && !updatedPatient.getState().trim().isEmpty()) {
            patient.setState(updatedPatient.getState().trim());
        }
        if (updatedPatient.getCountry() != null && !updatedPatient.getCountry().trim().isEmpty()) {
            patient.setCountry(updatedPatient.getCountry().trim());
        }

        patientRepository.save(patient);
        return PatientMapper.toPatientResponse(patient);
    }

    @Transactional
    @Override
    public boolean deletePatient(String email) {
        Optional<Patient> optionalPatient = patientRepository.findByEmail(email);

        if (optionalPatient.isEmpty()) {
            return false;
        }

        Patient patientToDelete = optionalPatient.get();
        patientRepository.delete(patientToDelete);

        return true;
    }
}