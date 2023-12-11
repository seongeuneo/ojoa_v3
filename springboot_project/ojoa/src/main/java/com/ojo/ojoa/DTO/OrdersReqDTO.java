package com.ojo.ojoa.DTO;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrdersReqDTO {
	// 주문 내역 요청 DTO : 결제시 가져오는 주문 내역
	
    private int orders_totalprice; // 주문총금액
	
    private String memberCheck;
	
	private int orders_price; // 결제액

	private String orders_method; // 결제수단 
	
	private String buyer; 
	
	private String post_number;
	
	private String address1;
	
	private String address2;
	
	private String phone1; 
	
	private String phone2; 
	
	private String phone3; 
	
	private String email1; 
	
	private String email2; 
	
	private String message; 
	
	private List<OrdersDetailReqDTO> ordersDetail; 
}
