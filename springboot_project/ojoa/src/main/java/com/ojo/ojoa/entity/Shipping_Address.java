package com.ojo.ojoa.entity;

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
	private int shipping_num;
    
	private String id;
    
	private String shipping_name;
    
	private String shipping_zipcode;
    
    private String shipping_address;
    
	private String shipping_addressdetail;
    
	private String shipping_phone;
	
}
