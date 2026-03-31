package com.example.todolist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.todolist.entity.Todos;

public interface TodoRepo extends JpaRepository<Todos, Long>{
    List<Todos> findByUser_Username(String username);
}
