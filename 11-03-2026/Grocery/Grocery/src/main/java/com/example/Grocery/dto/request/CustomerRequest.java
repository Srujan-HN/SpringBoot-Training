package com.example.Grocery.dto.request;

import java.util.List;

public class CustomerRequest {

    private String customerName;
    private List<Integer> productPrice;

    public CustomerRequest(String customerName, List<Integer> productPrice) {
        this.customerName = customerName;
        this.productPrice = productPrice;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public List<Integer> getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(List<Integer> productPrice) {
        this.productPrice = productPrice;
    }

}
