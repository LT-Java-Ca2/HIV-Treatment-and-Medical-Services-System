package com.hospital.serviceImpl;

import com.hospital.dto.request.AppointmentRequestDTO;
import com.hospital.dto.response.AppointmentResponseDTO;
import com.hospital.entity.Appointment;
import com.hospital.entity.Doctor;
import com.hospital.entity.Patient;
import com.hospital.repository.AppointmentRepository;
import com.hospital.repository.DoctorRepository;
import com.hospital.repository.PatientRepository;
import com.hospital.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public AppointmentResponseDTO bookAppointment(AppointmentRequestDTO requestDTO) {
        Appointment appointment = new Appointment();
        Optional<Patient> patientOpt = patientRepository.findById(requestDTO.getPatientId());
        Optional<Doctor> doctorOpt = doctorRepository.findById(requestDTO.getDoctorId());
        if (patientOpt.isEmpty() || doctorOpt.isEmpty()) return null; // Nên xử lý lỗi rõ ràng hơn, ví dụ throw exception

        appointment.setPatient(patientOpt.get());
        appointment.setDoctor(doctorOpt.get());
        appointment.setAppointmentDateTime(requestDTO.getAppointmentDateTime());
        appointment.setAnonymous(requestDTO.isAnonymous());
        appointment.setStatus("SCHEDULED");
        Appointment saved = appointmentRepository.save(appointment);
        return toDTO(saved);
    }

    @Override
    public List<AppointmentResponseDTO> getAppointmentsByPatient(Long patientId) {
        return appointmentRepository.findAll().stream()
                // Dòng này đã được sửa: thay .getId() bằng .getPatientId()
                .filter(a -> a.getPatient() != null && a.getPatient().getPatientId().equals(patientId))
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AppointmentResponseDTO> getAppointmentsByDoctor(Long doctorId) {
        return appointmentRepository.findAll().stream()
                // Dòng này cần kiểm tra Doctor entity của bạn.
                // Nếu Doctor có getDoctorId(), thay bằng a.getDoctor().getDoctorId()
                // Ngược lại, nếu Doctor vẫn có getId(), giữ nguyên
                .filter(a -> a.getDoctor() != null && a.getDoctor().getId().equals(doctorId))
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AppointmentResponseDTO> getAllAppointments() {
        return appointmentRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public void cancelAppointment(Long appointmentId) {
        appointmentRepository.deleteById(appointmentId);
    }

    private AppointmentResponseDTO toDTO(Appointment appointment) {
        AppointmentResponseDTO dto = new AppointmentResponseDTO();
        dto.setId(appointment.getId());
        // Dòng này đã được sửa: thay .getId() bằng .getPatientId()
        dto.setPatientId(appointment.getPatient() != null ? appointment.getPatient().getPatientId() : null);
        // Dòng này cần kiểm tra Doctor entity của bạn.
        // Nếu Doctor có getDoctorId(), thay bằng .getDoctorId()
        // Ngược lại, nếu Doctor vẫn có getId(), giữ nguyên
        dto.setDoctorId(appointment.getDoctor() != null ? appointment.getDoctor().getId() : null);
        dto.setAppointmentDateTime(appointment.getAppointmentDateTime());
        dto.setAnonymous(appointment.isAnonymous());
        dto.setStatus(appointment.getStatus());
        return dto;
    }
}