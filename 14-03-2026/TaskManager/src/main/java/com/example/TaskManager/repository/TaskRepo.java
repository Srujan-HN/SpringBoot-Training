package com.example.TaskManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.TaskManager.entity.TaskEntity;
public interface TaskRepo extends JpaRepository<TaskEntity, Long> {
    
}
