package com.hospital.serviceImpl;

import com.hospital.dto.request.ARVRegimenRequestDTO;
import com.hospital.dto.response.ARVRegimenResponseDTO;
import com.hospital.entity.ARVRegimen;
import com.hospital.repository.ARVRegimenRepository;
import com.hospital.service.ARVRegimenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ARVRegimenServiceImpl implements ARVRegimenService {
    @Autowired
    private ARVRegimenRepository arvRegimenRepository;

    @Override
    public ARVRegimenResponseDTO createARVRegimen(ARVRegimenRequestDTO requestDTO) {
        ARVRegimen regimen = new ARVRegimen();
        regimen.setName(requestDTO.getName());
        regimen.setDescription(requestDTO.getDescription());
        ARVRegimen saved = arvRegimenRepository.save(regimen);
        return toDTO(saved);
    }

    @Override
    public ARVRegimenResponseDTO updateARVRegimen(Long id, ARVRegimenRequestDTO requestDTO) {
        Optional<ARVRegimen> regimenOpt = arvRegimenRepository.findById(id);
        if (regimenOpt.isEmpty()) return null;
        ARVRegimen regimen = regimenOpt.get();
        regimen.setName(requestDTO.getName());
        regimen.setDescription(requestDTO.getDescription());
        ARVRegimen saved = arvRegimenRepository.save(regimen);
        return toDTO(saved);
    }

    @Override
    public void deleteARVRegimen(Long id) {
        arvRegimenRepository.deleteById(id);
    }

    @Override
    public List<ARVRegimenResponseDTO> getAllARVRegimens() {
        return arvRegimenRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public ARVRegimenResponseDTO getARVRegimenById(Long id) {
        Optional<ARVRegimen> regimenOpt = arvRegimenRepository.findById(id);
        return regimenOpt.map(this::toDTO).orElse(null);
    }

    private ARVRegimenResponseDTO toDTO(ARVRegimen regimen) {
        ARVRegimenResponseDTO dto = new ARVRegimenResponseDTO();
        dto.setId(regimen.getId());
        dto.setName(regimen.getName());
        dto.setDescription(regimen.getDescription());
        return dto;
    }
} 