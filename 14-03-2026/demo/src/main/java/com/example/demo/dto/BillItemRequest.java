package com.example.demo.dto;

import lombok.Data;

@Data
public class BillItemRequest {
    private Long billId;
    private Long productId;
    private Integer qty;
}

