package com.example.project_6.service;

import org.springframework.stereotype.Service;

import com.example.project_6.dto.request.StudentRequest;
import com.example.project_6.dto.request.TeachersRequest;
import com.example.project_6.dto.response.StudentResponse;
import com.example.project_6.dto.response.TeachersResponse;
import com.example.project_6.entity.StudentEntity;
import com.example.project_6.entity.TeachersEntity;
import com.example.project_6.repository.StudentsRepo;
import com.example.project_6.repository.TeachersRepo;

@Service
public class StudentService {

    private final StudentsRepo studentsRepo;
    private final TeachersRepo teachersRepo;

    public StudentService(StudentsRepo studentsRepo, TeachersRepo teachersRepo) {
        this.studentsRepo = studentsRepo;
        this.teachersRepo = teachersRepo;
    }

    
    public StudentResponse getStudent(StudentRequest studentRequest) {

        StudentEntity entity = new StudentEntity();
        entity.setName(studentRequest.getName());

        StudentEntity save = studentsRepo.save(entity);

        return new StudentResponse(
                save.getId(),
                save.getName()
        );
    }

    
    public TeachersResponse getDetails(Long id, TeachersRequest request) {

        StudentEntity studentEntity = studentsRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        TeachersEntity teachersEntity = new TeachersEntity();
        teachersEntity.setName(request.getName());
        teachersEntity.setDob(request.getDob());

        TeachersEntity savedEntity = teachersRepo.save(teachersEntity);

        studentEntity.setTeachers(savedEntity);
        studentsRepo.save(studentEntity);

        return new TeachersResponse(
                savedEntity.getId(),
                savedEntity.getName(),
                savedEntity.getDob()
        );
    }
}