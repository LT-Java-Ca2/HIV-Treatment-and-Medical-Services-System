package com.hospital.service;

import com.hospital.dto.request.AppointmentRequestDTO;
import com.hospital.dto.response.AppointmentResponseDTO;
import java.util.List;

public interface AppointmentService {
    AppointmentResponseDTO bookAppointment(AppointmentRequestDTO requestDTO);
    List<AppointmentResponseDTO> getAppointmentsByPatient(Long patientId);
    List<AppointmentResponseDTO> getAppointmentsByDoctor(Long doctorId);
    List<AppointmentResponseDTO> getAllAppointments();
    void cancelAppointment(Long appointmentId);
} 