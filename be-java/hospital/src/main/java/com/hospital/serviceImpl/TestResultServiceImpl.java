package com.hospital.serviceImpl;

import com.hospital.dto.request.TestResultRequestDTO;
import com.hospital.dto.response.TestResultResponseDTO;
import com.hospital.entity.ARVRegimen;
import com.hospital.entity.Patient;
import com.hospital.entity.TestResult;
import com.hospital.repository.ARVRegimenRepository;
import com.hospital.repository.PatientRepository;
import com.hospital.repository.TestResultRepository;
import com.hospital.service.TestResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TestResultServiceImpl implements TestResultService {
    @Autowired
    private TestResultRepository testResultRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private ARVRegimenRepository arvRegimenRepository;

    @Override
    public TestResultResponseDTO addTestResult(TestResultRequestDTO requestDTO) {
        TestResult testResult = new TestResult();
        Optional<Patient> patientOpt = patientRepository.findById(requestDTO.getPatientId());
        Optional<ARVRegimen> arvOpt = arvRegimenRepository.findById(requestDTO.getArvRegimenId());
        if (patientOpt.isEmpty() || arvOpt.isEmpty()) return null; // Nên xử lý lỗi rõ ràng hơn
        testResult.setPatient(patientOpt.get());
        testResult.setArvRegimen(arvOpt.get());
        testResult.setCd4Count(requestDTO.getCd4Count());
        testResult.setHivLoad(requestDTO.getHivLoad());
        testResult.setTestDate(requestDTO.getTestDate());
        TestResult saved = testResultRepository.save(testResult);
        return toDTO(saved);
    }

    @Override
    public TestResultResponseDTO updateTestResult(Long id, TestResultRequestDTO requestDTO) {
        Optional<TestResult> resultOpt = testResultRepository.findById(id);
        if (resultOpt.isEmpty()) return null; // Nên xử lý lỗi rõ ràng hơn
        TestResult testResult = resultOpt.get();
        Optional<Patient> patientOpt = patientRepository.findById(requestDTO.getPatientId());
        Optional<ARVRegimen> arvOpt = arvRegimenRepository.findById(requestDTO.getArvRegimenId());
        if (patientOpt.isEmpty() || arvOpt.isEmpty()) return null; // Nên xử lý lỗi rõ ràng hơn
        testResult.setPatient(patientOpt.get());
        testResult.setArvRegimen(arvOpt.get());
        testResult.setCd4Count(requestDTO.getCd4Count());
        testResult.setHivLoad(requestDTO.getHivLoad());
        testResult.setTestDate(requestDTO.getTestDate());
        TestResult saved = testResultRepository.save(testResult);
        return toDTO(saved);
    }

    @Override
    public List<TestResultResponseDTO> getTestResultsByPatient(Long patientId) {
        return testResultRepository.findAll().stream()
                // Dòng này đã được sửa: thay .getId() bằng .getPatientId()
                .filter(r -> r.getPatient() != null && r.getPatient().getPatientId().equals(patientId))
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TestResultResponseDTO> getAllTestResults() {
        return testResultRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    private TestResultResponseDTO toDTO(TestResult testResult) {
        TestResultResponseDTO dto = new TestResultResponseDTO();
        dto.setId(testResult.getId());
        // Dòng này đã được sửa: thay .getId() bằng .getPatientId()
        dto.setPatientId(testResult.getPatient() != null ? testResult.getPatient().getPatientId() : null);
        // Dòng này cần kiểm tra ARVRegimen entity của bạn.
        // Nếu ARVRegimen có getArvRegimenId(), thay bằng .getArvRegimenId()
        // Ngược lại, nếu ARVRegimen vẫn có getId(), giữ nguyên
        dto.setArvRegimenId(testResult.getArvRegimen() != null ? testResult.getArvRegimen().getId() : null);
        dto.setArvRegimenName(testResult.getArvRegimen() != null ? testResult.getArvRegimen().getName() : null);
        dto.setCd4Count(testResult.getCd4Count());
        dto.setHivLoad(testResult.getHivLoad());
        dto.setTestDate(testResult.getTestDate());
        return dto;
    }
}