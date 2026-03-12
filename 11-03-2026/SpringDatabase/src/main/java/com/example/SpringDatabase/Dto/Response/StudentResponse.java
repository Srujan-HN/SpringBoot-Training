package com.example.SpringDatabase.Dto.Response;

public class StudentResponse {
    private String name;
    private int rollno;
    private int total;
    private double percentage;
    private String result;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getRollno() {
        return rollno;
    }
    public void setRollno(int rollno) {
        this.rollno = rollno;
    }
    public int getTotal() {
        return total;
    }
    public void setTotal(int total) {
        this.total = total;
    }
    public double getPercentage() {
        return percentage;
    }
    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }
    public String getResult() {
        return result;
    }
    public void setResult(String result) {
        this.result = result;
    }
    public StudentResponse(String name, int rollno, int total, double percentage, String result) {
        this.name = name;
        this.rollno = rollno;
        this.total = total;
        this.percentage = percentage;
        this.result = result;
    }
    

    
}
