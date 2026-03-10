package com.example.Product.Dto.Response;

public class ApiResponse {
    private ResponsePrice data;

    public ApiResponse(ResponsePrice data) {
        this.data = data;
    }

    public ResponsePrice getData() {
        return data;
    }

    public void setData(ResponsePrice data) {
        this.data = data;
    }
    
    
}
