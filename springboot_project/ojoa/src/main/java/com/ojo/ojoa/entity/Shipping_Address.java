package com.ojo.ojoa.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "shipping_address")

public class Shipping_Address {
	
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shipping_num")
	private int shipping_num;
    
    @Column(name = "id", length = 20)
	private String id;
    
    @Column(name="shipping_name", nullable =false, length = 20)
	private String shipping_name;
    
    @Column(name="shipping_zipcode", nullable =false, length =7)
	private String shipping_zipcode;
    
    @Column(name="shipping_address", nullable=false, length=100)
    private String shipping_address;
    
    @Column(name="shipping_addressdetail", nullable=false, length=100)    
	private String shipping_addressdetail;
    
    @Column(name="shipping_phone", nullable=false, length=20)  
	private String shipping_phone;
	
}
