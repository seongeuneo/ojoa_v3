package com.ojo.ojoa.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "delivery_address_user")

public class Delivery_Address_User {
	
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "delivery_num")
	private int delivery_num;
    
    @Column(name = "id", length = 20)
	private String id;
    
    @Column(name="delivery_name", nullable =false, length = 20)
	private String delivery_name;
    
    @Column(name="delivery_zipcode", nullable =false, length =7)
	private String delivery_zipcode;
    
    @Column(name="delivery_address", nullable=false, length=100)
    private String delivery_address;
    
    @Column(name="delivery_addressdetail", nullable=false, length=100)    
	private String delivery_addressdetail;
    
    @Column(name="delivery_phone", nullable=false, length=20)  
	private String delivery_phone;
	
}
