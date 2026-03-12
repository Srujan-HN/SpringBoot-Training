package com.example.Grocery.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Grocery.dto.request.CustomerRequest;
import com.example.Grocery.dto.response.CustomerResponse;
import com.example.Grocery.entiry.Customer;
import com.example.Grocery.repository.CustomerRepository;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public CustomerResponse calculateCustomerDetails(CustomerRequest req) {
        double total = req.getProductPrice().stream().mapToInt(Integer::intValue).sum();
        int gst = 18;
        double gstInRupees = ((double) gst / 100) * total;
        double netTotal = total + gstInRupees;

        Customer customer = new Customer();
        customer.setCustomerName(req.getCustomerName());
        customer.setTotal(total);
        customer.setGst(gst);
        customer.setNetTotal(netTotal);

        customerRepository.save(customer);

        return new CustomerResponse(req.getCustomerName(), total, netTotal, gst);

    }

    public List<CustomerResponse> getMultipleCustomerDetails() {
        return customerRepository.findAll().stream().map(
                customer -> new CustomerResponse(customer.getCustomerName(), customer.getTotal(),
                        customer.getNetTotal(), customer.getGst()))
                .toList();
    }
}
