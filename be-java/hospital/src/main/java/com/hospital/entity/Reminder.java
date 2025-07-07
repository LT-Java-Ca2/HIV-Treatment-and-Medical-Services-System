package com.hospital.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Reminder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    private String message;
    private LocalDateTime reminderDateTime;
    private boolean sent;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public LocalDateTime getReminderDateTime() { return reminderDateTime; }
    public void setReminderDateTime(LocalDateTime reminderDateTime) { this.reminderDateTime = reminderDateTime; }
    public boolean isSent() { return sent; }
    public void setSent(boolean sent) { this.sent = sent; }
} 