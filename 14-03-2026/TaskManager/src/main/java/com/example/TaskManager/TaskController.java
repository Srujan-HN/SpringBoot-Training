package com.example.TaskManager;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.TaskManager.dto.TaskRequest;
import com.example.TaskManager.dto.TaskResponse;
import com.example.TaskManager.entity.TaskEntity;

import jakarta.validation.Valid;

@RestController
@RequestMapping("tasks")

public class TaskController {
    public final TaskService taskService;
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }
    @PostMapping("/bulk")
   public ApiResponse<List<TaskResponse>>createtask(@Valid@RequestBody List<TaskRequest> requests){
    List<TaskResponse> responses=taskService.createtask(requests);
    return new ApiResponse<List<TaskResponse>>("Success",responses);
   }

   @GetMapping
   public ApiResponse<Page<TaskEntity>>gettask(Pageable pageable){
    Page<TaskEntity>response=taskService.page(pageable);
    return new ApiResponse<Page<TaskEntity>>("Success",response);
   }
    
}
