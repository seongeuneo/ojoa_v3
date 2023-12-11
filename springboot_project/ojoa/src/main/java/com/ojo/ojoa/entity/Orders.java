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
	
	@Column(name="orders_num_confirm")
	private String orders_num_confirm; // 주문확인
	
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
	
	@Column(name="buyer")
	private String buyer; 
	
	@Column(name="post_number")
	private String post_number;
	
	@Column(name="address1")
	private String address1;
	
	@Column(name="address2")
	private String address2;
	
	@Column(name="phone1")
	private String phone1; 
	
	@Column(name="phone2")
	private String phone2; 
	
	@Column(name="phone3")
	private String phone3; 
	
	@Column(name="email1")
	private String email1; 
	
	@Column(name="email2")
	private String email2; 
	
	@Column(name="message")
	private String message; 
	
	@Column(name="orders_password")
	private String orders_password;

}
