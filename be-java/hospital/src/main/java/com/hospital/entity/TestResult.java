package com.hospital.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class TestResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "arv_regimen_id")
    private ARVRegimen arvRegimen;

    private Integer cd4Count;
    private Integer hivLoad;
    private LocalDate testDate;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }
    public ARVRegimen getArvRegimen() { return arvRegimen; }
    public void setArvRegimen(ARVRegimen arvRegimen) { this.arvRegimen = arvRegimen; }
    public Integer getCd4Count() { return cd4Count; }
    public void setCd4Count(Integer cd4Count) { this.cd4Count = cd4Count; }
    public Integer getHivLoad() { return hivLoad; }
    public void setHivLoad(Integer hivLoad) { this.hivLoad = hivLoad; }
    public LocalDate getTestDate() { return testDate; }
    public void setTestDate(LocalDate testDate) { this.testDate = testDate; }
} 