package com.hospital.controller;

import com.hospital.dto.request.ReminderRequestDTO;
import com.hospital.dto.response.ReminderResponseDTO;
import com.hospital.service.ReminderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/reminders")
public class ReminderController {
    @Autowired
    private ReminderService reminderService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ReminderResponseDTO createReminder(@RequestBody ReminderRequestDTO requestDTO) {
        return reminderService.createReminder(requestDTO);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ReminderResponseDTO updateReminder(@PathVariable Long id, @RequestBody ReminderRequestDTO requestDTO) {
        return reminderService.updateReminder(id, requestDTO);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteReminder(@PathVariable Long id) {
        reminderService.deleteReminder(id);
    }

    @GetMapping("/patient/{patientId}")
    @PreAuthorize("hasAnyRole('PATIENT','ADMIN')")
    public List<ReminderResponseDTO> getRemindersByPatient(@PathVariable Long patientId) {
        return reminderService.getRemindersByPatient(patientId);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ReminderResponseDTO> getAllReminders() {
        return reminderService.getAllReminders();
    }
} 