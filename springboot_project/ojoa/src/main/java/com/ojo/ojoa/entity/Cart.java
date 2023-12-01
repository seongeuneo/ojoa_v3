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
@Table(name = "cart")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Cart {
	
       @Id
       @GeneratedValue(strategy = GenerationType.IDENTITY)
       @Column(name="cart_num")
	   private int cart_num; // pk
	
       @Column(name="id")
	   private String id; // 장바구니 이용 회원 FK for user(id)
	   
       @Column(name="prod_num")
	   private int prod_num; // 상품번호 FK for product(prod_num)
	   
       @Column(name="quantity")
	   //@Column(nullable = false, columnDefinition = "int default 1")
	   private int quantity;
       
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
       
      //private String prod_mainimage;

}