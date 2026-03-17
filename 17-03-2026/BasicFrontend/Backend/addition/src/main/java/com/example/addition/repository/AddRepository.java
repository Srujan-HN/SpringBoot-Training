package com.example.addition.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.addition.entity.Addit;

public interface AddRepository extends JpaRepository<Addit, Long>{
    
}
