package com.hospital.dto.response;

import lombok.Data;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.hospital.enums.Gender;

@Data
public class PatientResponse {
    private Long patientId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private Gender gender; // Đã đúng kiểu Gender enum
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;
    
    private String city;
    private String state;
    private String country;
}