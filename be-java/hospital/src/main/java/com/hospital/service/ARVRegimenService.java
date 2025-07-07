package com.hospital.service;

import com.hospital.dto.request.ARVRegimenRequestDTO;
import com.hospital.dto.response.ARVRegimenResponseDTO;
import java.util.List;

public interface ARVRegimenService {
    ARVRegimenResponseDTO createARVRegimen(ARVRegimenRequestDTO requestDTO);
    ARVRegimenResponseDTO updateARVRegimen(Long id, ARVRegimenRequestDTO requestDTO);
    void deleteARVRegimen(Long id);
    List<ARVRegimenResponseDTO> getAllARVRegimens();
    ARVRegimenResponseDTO getARVRegimenById(Long id);
} 