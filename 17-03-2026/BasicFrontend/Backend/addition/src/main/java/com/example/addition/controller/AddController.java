package com.example.addition.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.addition.dto.AddRequest;
import com.example.addition.dto.AddResponse;
import com.example.addition.dto.ApiResponse;
import com.example.addition.services.AddService;

@RestController
@RequestMapping("/addition")
@CrossOrigin(origins = "http://localhost:5173/")
public class AddController {
    private AddService addService;
    
    public AddController(AddService addService) {
        this.addService = addService;
    }

    @PostMapping 
    public ApiResponse<AddResponse> getAdditionResult(@RequestBody AddRequest req){
        AddResponse response = addService.addingTwoNumber(req);
        return new ApiResponse<>("Success", response);
    }
    @GetMapping
    public ApiResponse<List<AddResponse>> getEveryAddition(){
        List<AddResponse> responses = addService.getDatabaseResponses();
         return new ApiResponse<List<AddResponse>>("Success", responses);

    }
}
