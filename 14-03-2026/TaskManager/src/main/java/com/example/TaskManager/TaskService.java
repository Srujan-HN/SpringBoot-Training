package com.example.TaskManager;



import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.TaskManager.dto.TaskRequest;
import com.example.TaskManager.dto.TaskResponse;
import com.example.TaskManager.entity.TaskEntity;
import com.example.TaskManager.repository.TaskRepo;
import java.util.stream.Collectors;



@Service
public class TaskService {
    private final TaskRepo taskRepo;
    
    public TaskService(TaskRepo taskRepo) {
        this.taskRepo = taskRepo;
    }
    public List<TaskResponse>createtask(List<TaskRequest>requests){
        List<TaskEntity>task=requests.stream().map(
            req->{
            TaskEntity tasks=new TaskEntity();
            tasks.setTitle(req.getTitle());
            tasks.setDescription(req.getDescription());
            tasks.setPriority(req.getPriority());
            return tasks;

        }).collect(Collectors.toList());

        List<TaskEntity>savedTasks=taskRepo.saveAll(task);
         return savedTasks.stream().map(
            taskss -> {
                TaskResponse response=new TaskResponse();
                response.setId(taskss.getId());
                response.setTitle(taskss.getTitle());
                response.setDescription(taskss.getDescription());
                response.setPriority(taskss.getPriority());
                return response;
                
            }
         ).collect(Collectors.toList());
         }
        public Page<TaskEntity>page(Pageable pageable){
            return taskRepo.findAll(pageable);
        } 
    
}
