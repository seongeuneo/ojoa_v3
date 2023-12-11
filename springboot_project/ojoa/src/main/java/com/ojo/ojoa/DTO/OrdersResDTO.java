package com.ojo.ojoa.DTO;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrdersResDTO {
	// 주문관련 응답 DTO : react로 전송 할 DTO
	
	@Data
	public static class OrderCompleteDTO {
		private int orders_totalprice; // 주문총금액
		
		private int orders_price; // 결제액

		private String orders_num_confirm;
	}

	@Data
	public static class OrderNonMemberDTO {		
		private String orders_num_confirm;

		private LocalDateTime orders_indate;
		
		private int orders_totalprice;
		
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
		
		private int ordersdt_num;
	    
		private int orders_num;
		
		private int prod_num;
		
		private int quantity;
		
		private int ordersdt_shippingfee;
		
		private int ordersdt_totalprice;
		
		private char ordersdt_result;
		
		private String prod_content; 
		
		private String prod_name; 
		
		private String prod_mainimage; 
		
	    public OrderNonMemberDTO(String orders_num_confirm, LocalDateTime orders_indate, int orders_totalprice, int orders_price, String orders_method, String buyer, String post_number,
	            String address1, String address2, String phone1, String phone2, String phone3,
	            String email1, String email2, String message, int ordersdt_num, int orders_num,
	            int prod_num, int quantity, int ordersdt_shippingfee, int ordersdt_totalprice,
	            char ordersdt_result, String prod_content, String prod_name, String prod_mainimage) {
	    	super();
	    	this.orders_num_confirm = orders_num_confirm;
	        this.orders_indate = orders_indate;
	        this.orders_totalprice = orders_totalprice;
	    	this.orders_price = orders_price;
	        this.orders_method = orders_method;
	        this.buyer = buyer;
	        this.post_number = post_number;
	        this.address1 = address1;
	        this.address2 = address2;
	        this.phone1 = phone1;
	        this.phone2 = phone2;
	        this.phone3 = phone3;
	        this.email1 = email1;
	        this.email2 = email2;
	        this.message = message;
	        this.ordersdt_num = ordersdt_num;
	        this.orders_num = orders_num;
	        this.prod_num = prod_num;
	        this.quantity = quantity;
	        this.ordersdt_shippingfee = ordersdt_shippingfee;
	        this.ordersdt_totalprice = ordersdt_totalprice;
	        this.ordersdt_result = ordersdt_result;
	        this.prod_content = prod_content;
	        this.prod_name = prod_name;
	        this.prod_mainimage = prod_mainimage;
	    }
	}
}

