package com.ojo.ojoa.DTO;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

public class OrdersDTO {
	
	@JsonProperty("")
	private int orders_num;
	
	@JsonProperty("id")
	private String id;
	
	@JsonProperty("")
	private LocalDateTime orders_indate;
	
	@JsonProperty("displayedPrice")
	private int orders_totalprice;
	
	@JsonProperty("displatedTotalPrice")
	private int orders_price;
	
	@JsonProperty("")
	private String orders_method;

	@JsonProperty("")
	private String orders_addresscheck;

	
	public OrdersDTO(int orders_num, String id, LocalDateTime orders_indate,
			int orders_totalprice, int orders_price, String orders_method, String orders_addresscheck) {
		 
		super();

		this.orders_num = orders_num;
		this.id = id;
		this.orders_indate = orders_indate;
		this.orders_totalprice = orders_totalprice;
		this.orders_price = orders_price;
		this.orders_method = orders_method;
		this.orders_addresscheck = orders_addresscheck;
	}
}