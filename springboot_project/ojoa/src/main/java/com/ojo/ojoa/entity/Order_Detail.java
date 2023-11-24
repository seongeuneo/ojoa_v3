package com.ojo.ojoa.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "order_detail")

public class Order_Detail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderdt_num")
	private int orderdt_num;
    
	private int order_num;
	private int prod_num;
	private int quantity;
	
	@Column(name = "orderdt_deliveryfee", columnDefinition = "INT DEFAULT 3000")
	private int orderdt_deliveryfee;
	
	@Column(name = "orderdt_totalprice", nullable = false)
	private int orderdt_totalprice;
	
	@Column(name = "orderdt_result", columnDefinition = "CHAR(1) DEFAULT '1'")
	private char orderdt_result;
}
