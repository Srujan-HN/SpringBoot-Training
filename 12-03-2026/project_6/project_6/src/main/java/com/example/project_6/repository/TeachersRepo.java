package com.example.project_6.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project_6.entity.TeachersEntity;

public interface TeachersRepo extends JpaRepository<TeachersEntity, Integer> {
    
}
