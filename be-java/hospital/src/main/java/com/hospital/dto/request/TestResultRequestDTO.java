package com.hospital.dto.request;

import java.time.LocalDate;

public class TestResultRequestDTO {
    private Long patientId;
    private Long arvRegimenId;
    private Integer cd4Count;
    private Integer hivLoad;
    private LocalDate testDate;
    // Getters and setters
    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }
    public Long getArvRegimenId() { return arvRegimenId; }
    public void setArvRegimenId(Long arvRegimenId) { this.arvRegimenId = arvRegimenId; }
    public Integer getCd4Count() { return cd4Count; }
    public void setCd4Count(Integer cd4Count) { this.cd4Count = cd4Count; }
    public Integer getHivLoad() { return hivLoad; }
    public void setHivLoad(Integer hivLoad) { this.hivLoad = hivLoad; }
    public LocalDate getTestDate() { return testDate; }
    public void setTestDate(LocalDate testDate) { this.testDate = testDate; }
} 