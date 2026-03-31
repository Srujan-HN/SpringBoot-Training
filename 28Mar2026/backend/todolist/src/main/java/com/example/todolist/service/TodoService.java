package com.example.todolist.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.todolist.dto.request.TodoRequest;
import com.example.todolist.dto.response.TodoResponse;
import com.example.todolist.entity.Todos;
import com.example.todolist.entity.User;
import com.example.todolist.exceptions.ResourceNotFoundException;
import com.example.todolist.repository.TodoRepo;
import com.example.todolist.repository.UserRepo;

@Service
public class TodoService {
    private final TodoRepo todoRepo;
    private final UserRepo userRepo;

    public TodoService(TodoRepo todoRepo, UserRepo userRepo) {
        this.todoRepo = todoRepo;
        this.userRepo = userRepo;
    }

    public List<TodoResponse> getAllTodos(String username) {
        return todoRepo.findByUser_Username(username)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public TodoResponse getTodoById(Long id, String username) {
        Todos todo = getOwnedTodo(id, username);
        return mapToResponse(todo);
    }

    public TodoResponse createTodo(TodoRequest request, String username) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Todos todo = new Todos();
        todo.setTitle(request.getTitle());
        todo.setDescription(request.getDescription());
        todo.setUser(user);
        return mapToResponse(todoRepo.save(todo));
    }

    public TodoResponse updateTodo(Long id, TodoRequest request, String username) {
        Todos todo = getOwnedTodo(id, username);
        todo.setTitle(request.getTitle());
        todo.setDescription(request.getDescription());
        return mapToResponse(todoRepo.save(todo));
    }

    public void deleteTodo(Long id, String username) {
        todoRepo.delete(getOwnedTodo(id, username));
    }

    private Todos getOwnedTodo(Long id, String username) {
        Todos todo = todoRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id: " + id));
        if (!todo.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Access denied");
        }
        return todo;
    }

    private TodoResponse mapToResponse(Todos todo) {
        return new TodoResponse(todo.getId(), todo.getTitle(), todo.getDescription());
    }
}
