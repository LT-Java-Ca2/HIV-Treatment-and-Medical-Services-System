package com.hospital.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "education_material")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EducationMaterial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long materialId;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String fileUrl;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isPublic = true;

    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
} 