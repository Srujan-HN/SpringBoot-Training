package com.example.addition.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.addition.dto.AddRequest;
import com.example.addition.dto.AddResponse;
import com.example.addition.entity.Addit;
import com.example.addition.repository.AddRepository;

@Service
public class AddService {
    private final AddRepository addRepository;

    public AddService(AddRepository addRepository) {
        this.addRepository = addRepository;
    }
    public AddResponse addingTwoNumber(AddRequest request){
        Addit entitAddit = new Addit();
        Double a = request.getA();
        Double b = request.getB();
        Double result = a+b;
        entitAddit.setA(a);
        entitAddit.setB(b);
        entitAddit.setResult(result);

        Addit res = addRepository.save(entitAddit);

        return new AddResponse(res.getId(), a, b, result);
    }
    public List<AddResponse> getDatabaseResponses(){
        List<AddResponse> addResponses = addRepository.findAll().stream().map(add -> new AddResponse(add.getId(),add.getA() ,add.getB() , add.getResult())).toList();
        return addResponses;
    }
    
}
