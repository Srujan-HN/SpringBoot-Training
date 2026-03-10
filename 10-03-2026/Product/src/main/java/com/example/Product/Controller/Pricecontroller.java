package com.example.Product.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.Product.Dto.Request.RequestPrice;
import com.example.Product.Dto.Response.ApiResponse;
import com.example.Product.Dto.Response.ResponsePrice;
import com.example.Product.Services.PriceService;

@RestController
@RequestMapping("/price")
public class Pricecontroller {
    private  final PriceService pService;

    public Pricecontroller(PriceService pService) {
        this.pService = pService;
    }
    @PostMapping("/bill")
    public ApiResponse result(@RequestBody RequestPrice rq){
        ResponsePrice getresult =pService.cResponsePrice(rq);
        return new ApiResponse(getresult);
    }
    
}
