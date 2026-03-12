package com.example.Grocery.dto.response;

public class CustomerResponse {
    private String customerName;
    private double total, netTotal;
    private int gst;

    public CustomerResponse(String customerName, double total, double netTotal, int gst) {
        this.customerName = customerName;
        this.total = total;
        this.netTotal = netTotal;
        this.gst = gst;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public double getNetTotal() {
        return netTotal;
    }

    public void setNetTotal(double netTotal) {
        this.netTotal = netTotal;
    }

    public int getGst() {
        return gst;
    }

    public void setGst(int gst) {
        this.gst = gst;
    }

}
