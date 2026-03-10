package com.example.Product.Services;

import org.springframework.stereotype.Service;

import com.example.Product.Dto.Request.RequestPrice;
import com.example.Product.Dto.Response.ResponsePrice;

@Service
public class PriceService {
    public ResponsePrice cResponsePrice(RequestPrice req){
        double total=0;
        total=req.getPrice1()+req.getPrice2()+req.getPrice3()+req.getPrice4()+req.getPrice5()+
              req.getPrice6()+req.getPrice7()+req.getPrice8()+req.getPrice9()+req.getPrice10();
        double gst=(18/100.0)*total;
        double grandtotal=gst+total;

         return new ResponsePrice(req.getCustomername(),req.getId(),total,gst,grandtotal);
    }
    
}
