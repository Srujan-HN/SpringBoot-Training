package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Hellocontroller {
   @GetMapping("/")
    public String hello(){
        return "Hello World";
    }
   @GetMapping("/add")
    public String addnumbers(@RequestParam int a, @RequestParam int b){
        int sum = a + b;
        return "sum = " + sum;
    }

    @GetMapping("/sub/{a}/{b}")
    public String diff(@PathVariable int a, @PathVariable int b){
        int difference = a - b;
        return "diff = " + difference;
    }
    @PostMapping("/multiple")
public int addNumbers(@RequestBody Numbers num){
    return num.getX() * num.getY();
}

@PostMapping("/student")
public String stu(@RequestBody Student student){

    String s=student.getName();
    int total= student.getMarks1()+student.getMarks2()+student.getMarks3()+student.getMarks4();
    return "total sum="+total+"\nname="+s;
    }
    
}