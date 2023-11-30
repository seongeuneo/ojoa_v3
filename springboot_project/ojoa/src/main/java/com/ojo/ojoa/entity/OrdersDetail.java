package com.ojo.ojoa.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "orders_detail")

public class OrdersDetail {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ordersdt_num")
	private int ordersdt_num;
    
    @Column(name="orders_num")
	private int orders_num;
	
    @Column(name="prod_num")
	private int prod_num;
	
    @Column(name="quantity")
	private int quantity;
	
    @Column(name="ordersdt_shippingfee")
	//@Column(name = "ordersdt_shippingfee", columnDefinition = "INT DEFAULT 3000")
	private int ordersdt_shippingfee;
	
    @Column(name="ordersdt_totalprice")
	private int ordersdt_totalprice;
	
    @Column(name="ordersdt_result")
	//@Column(name = "ordersdt_result", columnDefinition = "CHAR(1) DEFAULT 'B'")
	private char ordersdt_result;


	
}
