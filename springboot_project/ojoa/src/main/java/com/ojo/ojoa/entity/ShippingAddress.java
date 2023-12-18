package com.ojo.ojoa.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "shipping_address")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShippingAddress {
	
    
    @Id
    @Column(name="shipping_num")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int shipping_num;
    
    @Column(name="id")
	private String id;
    
    @Column(name="shipping_name")
	private String shipping_name;
    
    @Column(name="shipping_zipcode")
	private String shipping_zipcode;
    
    @Column(name="shipping_address")
    private String shipping_address;
    
    @Column(name="shipping_addressdetail")
	private String shipping_addressdetail;
    
    @Column(name="shipping_phone")
	private String shipping_phone;
	
}
