package com.hospital.controller;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.dto.request.PatientRegistrationRequest;
import com.hospital.dto.response.PatientResponse;
import com.hospital.exception.EmailAlreadyExistsException;
import com.hospital.security.SecurityUtil;
import com.hospital.service.PatientService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

	private static final Logger logger = LoggerFactory.getLogger(PatientController.class);

	private final PatientService patientService;
	private final SecurityUtil securityUtil;

	public PatientController(PatientService patientService, SecurityUtil securityUtil) {
		this.patientService = patientService;
		this.securityUtil = securityUtil;
	}

	// Public endpoint - No authentication required
	@PostMapping("/register")
	public ResponseEntity<?> registerPatient(@Valid @RequestBody PatientRegistrationRequest request) {
		try {
			logger.info("Received registration request for email: {}", request.getEmail());
			
			// Log the request details
			logger.debug("Registration request details: {}", request);
			
			PatientResponse response = patientService.registerPatient(request);
			logger.info("Successfully registered patient with email: {}", request.getEmail());
			
			Map<String, Object> successResponse = new HashMap<>();
			successResponse.put("status", "success");
			successResponse.put("message", "Đăng ký thành công");
			successResponse.put("data", response);
			
			return ResponseEntity.ok(successResponse);
			
		} catch (EmailAlreadyExistsException e) {
			logger.warn("Email already exists: {}", request.getEmail());
			Map<String, Object> errorResponse = new HashMap<>();
			errorResponse.put("status", "error");
			errorResponse.put("code", "EMAIL_EXISTS");
			errorResponse.put("message", "Email đã được đăng ký");
			return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
			
		} catch (IllegalArgumentException e) {
			logger.warn("Validation error for email {}: {}", request.getEmail(), e.getMessage());
			Map<String, Object> errorResponse = new HashMap<>();
			errorResponse.put("status", "error");
			errorResponse.put("code", "VALIDATION_ERROR");
			errorResponse.put("message", e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
			
		} catch (Exception e) {
			logger.error("Error during patient registration for email: " + request.getEmail(), e);
			Map<String, Object> errorResponse = new HashMap<>();
			errorResponse.put("status", "error");
			errorResponse.put("code", "INTERNAL_ERROR");
			errorResponse.put("message", "Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
		}
	}

	// Admin only endpoint
	@GetMapping("/fetchAllPatients")
	public ResponseEntity<?> getAllPatientDetails() {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

			if (!securityUtil.isAdmin(authentication)) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN)
						.body("Access denied. Only administrators can access this resource.");
			}

			List<PatientResponse> patientResponse = patientService.getAllPatients();
			return ResponseEntity.ok(patientResponse);
		} catch (Exception e) {
			logger.error("Error fetching all patients: ", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while fetching patient details: " + e.getMessage());
		}
	}

	// Endpoint accessible by both Admin and Patient (with proper authorization)
	@GetMapping("/details/{email}")
	public ResponseEntity<?> getPatientDetails(@PathVariable String email) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			UserDetails userDetails = (UserDetails) authentication.getPrincipal();

			// Allow access if user is admin or if user is requesting their own details
			if (!securityUtil.isAdmin(authentication) && !userDetails.getUsername().equals(email)) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN)
						.body("Access denied. You can only view your own details.");
			}

			PatientResponse patient = patientService.getPatientByEmail(email);
			if (patient == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found with email: " + email);
			}

			return ResponseEntity.ok(patient);
		} catch (Exception e) {
			logger.error("Error fetching patient details: ", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while fetching patient details");
		}
	}

	// Endpoint for patients to view their own details
	@GetMapping("/mydetails")
	public ResponseEntity<?> getMyDetails() {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String email = ((UserDetails) authentication.getPrincipal()).getUsername();

			PatientResponse patient = patientService.getPatientByEmail(email);
			if (patient == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient details not found");
			}

			return ResponseEntity.ok(patient);
		} catch (Exception e) {
			logger.error("Error fetching patient details: ", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while fetching your details");
		}
	}

	// Endpoint for updating patient details (accessible by both Admin and Patient
	// with proper authorization)
	@PutMapping("/update/{email}")
	public ResponseEntity<?> updatePatient(@PathVariable String email,
			@Valid @RequestBody PatientResponse updatedPatient) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			UserDetails userDetails = (UserDetails) authentication.getPrincipal();

			// Allow update if user is admin or if user is updating their own details
			if (!securityUtil.isAdmin(authentication) && !userDetails.getUsername().equals(email)) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN)
						.body("Access denied. You can only update your own details.");
			}

			PatientResponse updated = patientService.updatePatient(email, updatedPatient);
			return ResponseEntity.ok(updated);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid data provided: " + e.getMessage());
		} catch (Exception e) {
			logger.error("Error updating patient: ", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while updating patient details");
		}
	}

	@DeleteMapping("/delete/{email}")
	public ResponseEntity<?> deletePatient(@PathVariable String email) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			UserDetails userDetails = (UserDetails) authentication.getPrincipal();

			// Allow delete if user is admin or if user is deleting their own details
			if (!securityUtil.isAdmin(authentication) && !userDetails.getUsername().equals(email)) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN)
						.body("Access denied. You can only delete your own details.");
			}

			boolean deleted = patientService.deletePatient(email);

			if (deleted) {
				return ResponseEntity.ok("Patient deleted successfully.");
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found with the provided email.");
			}
		} catch (Exception e) {
			logger.error("Error deleting patient: ", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while deleting patient details.");
		}
	}

}