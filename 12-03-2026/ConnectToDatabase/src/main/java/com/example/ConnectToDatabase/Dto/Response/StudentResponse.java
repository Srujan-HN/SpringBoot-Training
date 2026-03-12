package com.example.ConnectToDatabase.Dto.Response;

public class StudentResponse {
    private Long id;
    private String name;
    private String registerNumber;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getRegisterNumber() {
        return registerNumber;
    }
    public void setRegisterNumber(String registerNumber) {
        this.registerNumber = registerNumber;
    }
    public StudentResponse(Long id, String name, String registerNumber) {
        this.id = id;
        this.name = name;
        this.registerNumber = registerNumber;
    }
    
    
}
