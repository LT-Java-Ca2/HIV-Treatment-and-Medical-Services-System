package com.hospital.controller;

import com.hospital.dto.request.ARVRegimenRequestDTO;
import com.hospital.dto.response.ARVRegimenResponseDTO;
import com.hospital.service.ARVRegimenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/arv-regimens")
public class ARVRegimenController {
    @Autowired
    private ARVRegimenService arvRegimenService;

    @PostMapping("/create")
    @PreAuthorize("hasAnyRole('DOCTOR','ADMIN')")
    public ARVRegimenResponseDTO createARVRegimen(@RequestBody ARVRegimenRequestDTO requestDTO) {
        return arvRegimenService.createARVRegimen(requestDTO);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAnyRole('DOCTOR','ADMIN')")
    public ARVRegimenResponseDTO updateARVRegimen(@PathVariable Long id, @RequestBody ARVRegimenRequestDTO requestDTO) {
        return arvRegimenService.updateARVRegimen(id, requestDTO);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('DOCTOR','ADMIN')")
    public void deleteARVRegimen(@PathVariable Long id) {
        arvRegimenService.deleteARVRegimen(id);
    }

    @GetMapping("/all")
    public List<ARVRegimenResponseDTO> getAllARVRegimens() {
        return arvRegimenService.getAllARVRegimens();
    }

    @GetMapping("/{id}")
    public ARVRegimenResponseDTO getARVRegimenById(@PathVariable Long id) {
        return arvRegimenService.getARVRegimenById(id);
    }
} 