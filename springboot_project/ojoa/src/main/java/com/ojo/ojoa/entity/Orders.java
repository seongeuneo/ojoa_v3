package com.ojo.ojoa.entity;

import java.time.LocalDateTime;

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
@Table(name = "orders")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Orders {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="orders_num")
	private int orders_num; // 주문번호 PK, AI
	
	@Column(name="id")
	private String id; // 주문한 회원 아이디 FK for users(id)
	
	@Column(name="orders_indate")
	private LocalDateTime orders_indate; // 주문날짜
	
	@Column(name="orders_totalprice")
	private int orders_totalprice; // 주문총금액
	
	@Column(name="orders_price")
	private int orders_price; // 결제액

	@Column(name="orders_method")
	private String orders_method; // 결제수단 
	
	@Column(name="orders_addresscheck")
	private String orders_addresscheck; // 배송지
	
	private String shipping_name;
	
	private String shipping_zipcode;
	
	private String shipping_address;
	
	private String shipping_addressdetail;
	
	private String shipping_phone;

	private String shipping_message;
}