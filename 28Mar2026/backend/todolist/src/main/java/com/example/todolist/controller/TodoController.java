package com.example.todolist.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.todolist.dto.request.TodoRequest;
import com.example.todolist.dto.response.ApiResponse;
import com.example.todolist.dto.response.TodoResponse;
import com.example.todolist.service.TodoService;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "http://localhost:5173")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public ApiResponse<List<TodoResponse>> getAllTodos(Authentication auth) {
        return new ApiResponse<>(true, "Todos fetched", todoService.getAllTodos(auth.getName()));
    }

    @GetMapping("/{id}")
    public ApiResponse<TodoResponse> getTodoById(@PathVariable Long id, Authentication auth) {
        return new ApiResponse<>(true, "Todo fetched", todoService.getTodoById(id, auth.getName()));
    }

    @PostMapping
    public ApiResponse<TodoResponse> createTodo(@RequestBody TodoRequest request, Authentication auth) {
        return new ApiResponse<>(true, "Created", todoService.createTodo(request, auth.getName()));
    }

    @PutMapping("/{id}")
    public ApiResponse<TodoResponse> updateTodo(@PathVariable Long id, @RequestBody TodoRequest request, Authentication auth) {
        return new ApiResponse<>(true, "Updated", todoService.updateTodo(id, request, auth.getName()));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteTodo(@PathVariable Long id, Authentication auth) {
        todoService.deleteTodo(id, auth.getName());
        return new ApiResponse<>(true, "Deleted", null);
    }
}
