package com.example.project_6.dto.response;

public class TeachersResponse {

    private long id;
    private String name;
    private int dob;

    public TeachersResponse(long id, String name, int dob) {
        this.id = id;
        this.name = name;
        this.dob = dob;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

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