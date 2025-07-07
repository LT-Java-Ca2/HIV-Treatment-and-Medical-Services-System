package com.hospital.service;

import com.hospital.dto.request.ReminderRequestDTO;
import com.hospital.dto.response.ReminderResponseDTO;
import java.util.List;

public interface ReminderService {
    ReminderResponseDTO createReminder(ReminderRequestDTO requestDTO);
    ReminderResponseDTO updateReminder(Long id, ReminderRequestDTO requestDTO);
    void deleteReminder(Long id);
    List<ReminderResponseDTO> getRemindersByPatient(Long patientId);
    List<ReminderResponseDTO> getAllReminders();
} 