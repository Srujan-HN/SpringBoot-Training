package com.example.Grocery.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Grocery.dto.request.CustomerRequest;
import com.example.Grocery.dto.response.ApiCustomerResponse;
import com.example.Grocery.dto.response.CustomerResponse;
import com.example.Grocery.service.CustomerService;

@RestController
@RequestMapping("/customer")

public class CustomerController {
    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/customerResult")
    public ApiCustomerResponse<CustomerResponse> getResults(@RequestBody CustomerRequest req) {
        CustomerResponse result = customerService.calculateCustomerDetails(req);
        return new ApiCustomerResponse<CustomerResponse>("successs", result);

    }

    @GetMapping("/multipleCustomerResult")
    public ApiCustomerResponse<List<CustomerResponse>> getMultipleCustomerDetails() {
        List<CustomerResponse> results = customerService.getMultipleCustomerDetails();
        return new ApiCustomerResponse<List<CustomerResponse>>("success", results);
    }

}
