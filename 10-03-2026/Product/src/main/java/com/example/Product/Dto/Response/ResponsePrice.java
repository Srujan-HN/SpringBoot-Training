package com.example.Product.Dto.Response;

public class ResponsePrice {
    private String customername;
    private int id;
    private double total;
    private double gst;
    private double grandtotal;
    public ResponsePrice(String customername, int id, double total, double gst, double grandtotal) {
        this.customername = customername;
        this.id = id;
        this.total = total;
        this.gst = gst;
        this.grandtotal = grandtotal;
    }
    public String getCustomername() {
        return customername;
    }
    public void setCustomername(String customername) {
        this.customername = customername;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public double getTotal() {
        return total;
    }
    public void setTotal(int total) {
        this.total = total;
    }
    public double getGst() {
        return gst;
    }
    public void setGst(int gst) {
        this.gst = gst;
    }
    public double getGrandtotal() {
        return grandtotal;
    }
    public void setGrandtotal(double grandtotal) {
        this.grandtotal = grandtotal;
    }
    


    
}
