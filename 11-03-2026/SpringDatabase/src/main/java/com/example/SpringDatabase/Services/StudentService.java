package com.example.SpringDatabase.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.SpringDatabase.Dto.Request.StudentRequest;
import com.example.SpringDatabase.Dto.Response.StudentResponse;
import com.example.SpringDatabase.Entity.Student;
import com.example.SpringDatabase.Repository.StudentRepository;
@Service
public class StudentService {
    private final StudentRepository studentRepository;
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }
    
    public StudentResponse process(StudentRequest req){
        int total=req.getMarks().stream().mapToInt(Integer::intValue).sum();
        int subjects =req.getMarks().size();
        double percentage =(double) total/subjects;
        String result =percentage>=75 ?"Pass":"Fail";

        Student student=new Student();
        student.setName(req.getName());
        student.setRollno(req.getRollnumber());
        student.setTotal(total);
        student.setPercentage(percentage);
        student.setResult(result);

        studentRepository.save(student);
        return  new StudentResponse(req.getName(),req.getRollnumber(), total, percentage, result);

}
 
    
    public List<StudentResponse>getAllStudentResult(){
        return studentRepository.findAll().stream().map(student -> new StudentResponse(
        student.getName(), 
        student.getRollno(),
        student.getTotal(),
         student.getPercentage(), 
         student.getResult())).toList();

    }
    
}
