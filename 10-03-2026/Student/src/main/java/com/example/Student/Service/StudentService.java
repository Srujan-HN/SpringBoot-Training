package com.example.Student.Service;

import org.springframework.stereotype.Service;

import com.example.Student.Dto.Request.StudentRequest;
import com.example.Student.Dto.Response.StudentResponse;

@Service
public class StudentService {
    public StudentResponse calStudentResponse(StudentRequest req){
        int Total;
        Total=req.getMarks1()+req.getMarks2()+req.getMarks3()+req.getMarks4()+req.getMarks5();

        double percentage=Total/5.0;
        String result = percentage >=75 ? "PASS" :"FAIL";

        return new StudentResponse(req.getName(), req.getRollnumber(), Total, percentage, result);

    }
    
}
