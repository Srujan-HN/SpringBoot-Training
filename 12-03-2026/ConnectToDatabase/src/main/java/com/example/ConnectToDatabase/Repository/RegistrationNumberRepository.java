package com.example.ConnectToDatabase.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ConnectToDatabase.Entity.RegisterNumberEntity;

public interface RegistrationNumberRepository extends JpaRepository<RegisterNumberEntity,Long>{
    
}
