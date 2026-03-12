package com.example.Grocery.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Grocery.entiry.Customer;

public interface CustomerRepository extends JpaRepository <Customer, Long> {
    
}
