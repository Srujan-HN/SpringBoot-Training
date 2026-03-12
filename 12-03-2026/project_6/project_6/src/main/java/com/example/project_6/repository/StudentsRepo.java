package com.example.project_6.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project_6.entity.StudentEntity;

public interface StudentsRepo extends JpaRepository<StudentEntity, Long> {

    
} 
