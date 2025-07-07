package com.hospital.service;

import com.hospital.dto.request.TestResultRequestDTO;
import com.hospital.dto.response.TestResultResponseDTO;
import java.util.List;

public interface TestResultService {
    TestResultResponseDTO addTestResult(TestResultRequestDTO requestDTO);
    TestResultResponseDTO updateTestResult(Long id, TestResultRequestDTO requestDTO);
    List<TestResultResponseDTO> getTestResultsByPatient(Long patientId);
    List<TestResultResponseDTO> getAllTestResults();
} 