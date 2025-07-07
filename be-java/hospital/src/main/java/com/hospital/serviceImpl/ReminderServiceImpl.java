package com.hospital.serviceImpl;

import com.hospital.dto.request.ReminderRequestDTO;
import com.hospital.dto.response.ReminderResponseDTO;
import com.hospital.entity.Patient;
import com.hospital.entity.Reminder;
import com.hospital.repository.PatientRepository;
import com.hospital.repository.ReminderRepository;
import com.hospital.service.ReminderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReminderServiceImpl implements ReminderService {
    @Autowired
    private ReminderRepository reminderRepository;
    @Autowired
    private PatientRepository patientRepository;

    @Override
    public ReminderResponseDTO createReminder(ReminderRequestDTO requestDTO) {
        Reminder reminder = new Reminder();
        Optional<Patient> patientOpt = patientRepository.findById(requestDTO.getPatientId());
        if (patientOpt.isEmpty()) return null; // Nên xử lý lỗi rõ ràng hơn, ví dụ throw exception
        reminder.setPatient(patientOpt.get());
        reminder.setMessage(requestDTO.getMessage());
        reminder.setReminderDateTime(requestDTO.getReminderDateTime());
        reminder.setSent(requestDTO.isSent());
        Reminder saved = reminderRepository.save(reminder);
        return toDTO(saved);
    }

    @Override
    public ReminderResponseDTO updateReminder(Long id, ReminderRequestDTO requestDTO) {
        Optional<Reminder> reminderOpt = reminderRepository.findById(id);
        if (reminderOpt.isEmpty()) return null; // Nên xử lý lỗi rõ ràng hơn
        Reminder reminder = reminderOpt.get();
        Optional<Patient> patientOpt = patientRepository.findById(requestDTO.getPatientId());
        if (patientOpt.isEmpty()) return null; // Nên xử lý lỗi rõ ràng hơn
        reminder.setPatient(patientOpt.get());
        reminder.setMessage(requestDTO.getMessage());
        reminder.setReminderDateTime(requestDTO.getReminderDateTime());
        reminder.setSent(requestDTO.isSent());
        Reminder saved = reminderRepository.save(reminder);
        return toDTO(saved);
    }

    @Override
    public void deleteReminder(Long id) {
        reminderRepository.deleteById(id);
    }

    @Override
    public List<ReminderResponseDTO> getRemindersByPatient(Long patientId) {
        return reminderRepository.findAll().stream()
                // Dòng này đã được sửa: thay .getId() bằng .getPatientId()
                .filter(r -> r.getPatient() != null && r.getPatient().getPatientId().equals(patientId))
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReminderResponseDTO> getAllReminders() {
        return reminderRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    private ReminderResponseDTO toDTO(Reminder reminder) {
        ReminderResponseDTO dto = new ReminderResponseDTO();
        dto.setId(reminder.getId());
        // Dòng này đã được sửa: thay .getId() bằng .getPatientId()
        dto.setPatientId(reminder.getPatient() != null ? reminder.getPatient().getPatientId() : null);
        dto.setMessage(reminder.getMessage());
        dto.setReminderDateTime(reminder.getReminderDateTime());
        dto.setSent(reminder.isSent());
        return dto;
    }
}