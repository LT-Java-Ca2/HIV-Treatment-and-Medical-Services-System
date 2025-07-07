package com.hospital.controller;

import com.hospital.dto.request.AppointmentRequestDTO;
import com.hospital.dto.response.AppointmentResponseDTO;
import com.hospital.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/book")
    @PreAuthorize("hasRole('PATIENT')")
    public AppointmentResponseDTO bookAppointment(@RequestBody AppointmentRequestDTO requestDTO) {
        return appointmentService.bookAppointment(requestDTO);
    }

    @GetMapping("/patient/{patientId}")
    @PreAuthorize("hasAnyRole('PATIENT','ADMIN')")
    public List<AppointmentResponseDTO> getAppointmentsByPatient(@PathVariable Long patientId) {
        return appointmentService.getAppointmentsByPatient(patientId);
    }

    @GetMapping("/doctor/{doctorId}")
    @PreAuthorize("hasAnyRole('DOCTOR','ADMIN')")
    public List<AppointmentResponseDTO> getAppointmentsByDoctor(@PathVariable Long doctorId) {
        return appointmentService.getAppointmentsByDoctor(doctorId);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<AppointmentResponseDTO> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @DeleteMapping("/{appointmentId}")
    @PreAuthorize("hasAnyRole('PATIENT','ADMIN')")
    public void cancelAppointment(@PathVariable Long appointmentId) {
        appointmentService.cancelAppointment(appointmentId);
    }
} 