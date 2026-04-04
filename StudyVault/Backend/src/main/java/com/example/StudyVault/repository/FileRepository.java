package com.example.StudyVault.repository;

import com.example.StudyVault.entity.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileRepository extends JpaRepository<FileEntity, Long> {

    List<FileEntity> findByUploadedBy_Email(String email);
}