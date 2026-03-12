package com.example.project_6.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "students_db")
public class StudentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToOne
    @JoinColumn(name = "teacher_id")
    private TeachersEntity teachers;

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

    public TeachersEntity getTeachers() {
        return teachers;
    }

    public void setTeachers(TeachersEntity teachers) {
        this.teachers = teachers;
    }
}