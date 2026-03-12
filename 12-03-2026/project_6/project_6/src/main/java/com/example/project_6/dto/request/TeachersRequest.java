package com.example.project_6.dto.request;

public class TeachersRequest {

    private String name;
    private int dob;    

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getDob() {
        return dob;
    }

    public void setDob(int dob) {
        this.dob = dob;
    }
}