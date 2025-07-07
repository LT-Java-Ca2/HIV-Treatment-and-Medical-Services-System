package com.hospital.dto.response;

import java.time.LocalDateTime;

public class AppointmentResponseDTO {
    private Long id;
    private Long patientId;
    private Long doctorId;
    private LocalDateTime appointmentDateTime;
    private boolean anonymous;
    private String status;
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }
    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }
    public LocalDateTime getAppointmentDateTime() { return appointmentDateTime; }
    public void setAppointmentDateTime(LocalDateTime appointmentDateTime) { this.appointmentDateTime = appointmentDateTime; }
    public boolean isAnonymous() { return anonymous; }
    public void setAnonymous(boolean anonymous) { this.anonymous = anonymous; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
} 