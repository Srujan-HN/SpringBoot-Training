package com.example.SpringDatabase.Dto.Request;
import java.util.List;

public class StudentRequest {
    private String name;
    private int rollnumber;
    private List<Integer>marks;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getRollnumber() {
        return rollnumber;
    }
    public void setRollnumber(int rollnumber) {
        this.rollnumber = rollnumber;
    }
    public List<Integer> getMarks() {
        return marks;
    }
    public void setMarks(List<Integer> marks) {
        this.marks = marks;
    }
    
    
}
