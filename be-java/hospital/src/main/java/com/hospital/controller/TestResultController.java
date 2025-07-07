package com.hospital.controller;

import com.hospital.dto.request.TestResultRequestDTO;
import com.hospital.dto.response.TestResultResponseDTO;
import com.hospital.service.TestResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test-results")
public class TestResultController {
    @Autowired
    private TestResultService testResultService;

    @PostMapping("/add")
    public TestResultResponseDTO addTestResult(@RequestBody TestResultRequestDTO requestDTO) {
        return testResultService.addTestResult(requestDTO);
    }

    @PutMapping("/update/{id}")
    public TestResultResponseDTO updateTestResult(@PathVariable Long id, @RequestBody TestResultRequestDTO requestDTO) {
        return testResultService.updateTestResult(id, requestDTO);
    }

    @GetMapping("/patient/{patientId}")
    public List<TestResultResponseDTO> getTestResultsByPatient(@PathVariable Long patientId) {
        return testResultService.getTestResultsByPatient(patientId);
    }

    @GetMapping("/all")
    public List<TestResultResponseDTO> getAllTestResults() {
        return testResultService.getAllTestResults();
    }
} 