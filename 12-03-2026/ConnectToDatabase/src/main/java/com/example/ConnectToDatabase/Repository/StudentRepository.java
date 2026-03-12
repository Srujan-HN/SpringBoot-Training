package com.example.ConnectToDatabase.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ConnectToDatabase.Entity.StudentModel;

public interface StudentRepository extends JpaRepository<StudentModel , Long> {
    
}
