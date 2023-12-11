package com.ojo.ojoa.DTO;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
public class OrdersDTO {
	
	@JsonProperty("orders_num")
	private int orders_num;
	
	@JsonProperty("id")
	private String id;
	
	@JsonProperty("orders_indate")
	private LocalDateTime orders_indate;
	
	@JsonProperty("orders_totalprice")
	private int orders_totalprice;
		
	@JsonProperty("orders_price")
	private int orders_price;
	
	@JsonProperty("orders_method")
	private String orders_method;

	@JsonProperty("orders_addresscheck")
	private String orders_addresscheck;

	private String shipping_name;
	
	private String shipping_zipcode;
	
	private String shipping_address;
	
	private String shipping_addressdetail;
	
	private String shipping_phone;

	
	public OrdersDTO(int orders_num, String id, LocalDateTime orders_indate,
			int orders_totalprice, int orders_price, String orders_method, String orders_addresscheck,
			String shipping_name, String shipping_zipcode, String shipping_address, 
			String shipping_addressdetail, String shipping_phone) {
		super();

		this.orders_num = orders_num;
		this.id = id;
		this.orders_indate = orders_indate;
		this.orders_totalprice = orders_totalprice;
		this.orders_price = orders_price;
		this.orders_method = orders_method;
		this.orders_addresscheck = orders_addresscheck;
		this.shipping_name = shipping_name;
		this.shipping_zipcode = shipping_zipcode;
		this.shipping_address = shipping_address;
		this.shipping_addressdetail = shipping_addressdetail;
		this.shipping_phone = shipping_phone;
	}
}
