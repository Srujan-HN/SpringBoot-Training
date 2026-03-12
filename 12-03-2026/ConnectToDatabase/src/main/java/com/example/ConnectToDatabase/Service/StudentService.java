package com.example.ConnectToDatabase.Service;

import org.springframework.stereotype.Service;

import com.example.ConnectToDatabase.Dto.Request.StudentRequest;
import com.example.ConnectToDatabase.Dto.Response.StudentResponse;
import com.example.ConnectToDatabase.Entity.RegisterNumberEntity;
import com.example.ConnectToDatabase.Entity.StudentModel;
import com.example.ConnectToDatabase.Repository.RegistrationNumberRepository;
import com.example.ConnectToDatabase.Repository.StudentRepository;

@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final RegistrationNumberRepository registrationNumberRepository;

   
    
    public StudentService(StudentRepository studentRepository,
            RegistrationNumberRepository registrationNumberRepository) {
        this.studentRepository = studentRepository;
        this.registrationNumberRepository = registrationNumberRepository;
    }
    public StudentResponse saveStudent(StudentRequest request){
        
        StudentModel student= new StudentModel();
        student.setName(request.getName());

        StudentModel savedStudent= studentRepository.save(student);

        return new StudentResponse(savedStudent.getId(),savedStudent.getName() , null);
    }
    public StudentResponse assign(Long StudentId,String regNumber){
        StudentModel student =studentRepository.findById(StudentId).orElseThrow(()->new RuntimeException("Stugent not found"));

         RegisterNumberEntity register=new RegisterNumberEntity();
         register.setRegisterNumber(regNumber);
         RegisterNumberEntity savedreg=registrationNumberRepository.save(register);

         student.setRegisterNumberEntity(savedreg);

         studentRepository.save(student);
            return new StudentResponse(student.getId(), student.getName(), savedreg.getRegisterNumber());
       
       



    }
}
