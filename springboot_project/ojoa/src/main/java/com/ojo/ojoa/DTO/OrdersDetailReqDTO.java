package com.ojo.ojoa.DTO;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrdersDetailReqDTO {
	// 주문 상세 내역 요청 DTO : 결제시 가져오는 상세 내역 
	
	private String imgNo;
	
	private String prod_content;
	
	private String prod_name;
	
	private int prod_num;

	private int productPriceFormatted;
	
	private int productPromotion;

	private int quantity;
	
	private String userId;
}
