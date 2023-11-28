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
	private int orders_num; // 주문번호 PK, AI
	
	private String id; // 주문한 회원 아이디 FK for users(id)
	
	private LocalDateTime orders_indate; // 주문날짜
	
	private int orders_totalprice; // 주문총금액
	
	private int orders_price; // 결제액

	private String orders_method; // 결제수단 
	
	private String orders_addresscheck; // 배송지

}
