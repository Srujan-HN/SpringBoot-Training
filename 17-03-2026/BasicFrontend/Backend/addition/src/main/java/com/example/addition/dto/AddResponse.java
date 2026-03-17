package com.example.addition.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddResponse {
    private Long id;
    private Double a;
    private Double b;
    private Double result;
}
