package com.ojo.ojoa.DTO;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrdersResDTO {
	// orders
	private Integer orders_num;
	private String id;
	private LocalDateTime orders_indate;
	private Integer orders_totalprice;
	private Integer orders_price;
	private String orders_method;
	private String orders_addresscheck;
	private String shipping_name;
	private String shipping_zipcode;
	private String shipping_address;
	private String shipping_addressdetail;
	private String shipping_phone;
	private String shipping_message;

	// orders_detail
	private Integer ordersdt_num;
	private Integer prod_num;
	private Integer quantity;
	private Integer ordersdt_shippingfee;
	private Integer ordersdt_totalprice;
	private Character ordersdt_result;

	// product fields
	private String prod_name;
	private String prod_kind;
	private int prod_discount;
	private int prod_price1;
	private String prod_content;
	private String prod_mainimage;
	private String prod_sellyn;
	private String prod_regdate;
	private int prod_stock;
	private float prod_grade;

	// 생성자
	public OrdersResDTO(Integer orders_num, String id, LocalDateTime orders_indate, Integer orders_totalprice,
			Integer orders_price, String orders_method, String orders_addresscheck, String shipping_name,
			String shipping_zipcode, String shipping_address, String shipping_addressdetail, String shipping_phone,
			String shipping_message, Integer ordersdt_num, Integer prod_num, Integer quantity,
			Integer ordersdt_shippingfee, Integer ordersdt_totalprice, Character ordersdt_result, String prod_name,
			String prod_kind, int prod_discount, int prod_price1, String prod_content, String prod_mainimage,
			String prod_sellyn, String prod_regdate, int prod_stock, float prod_grade) {
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
		this.shipping_message = shipping_message;
		this.ordersdt_num = ordersdt_num;
		this.prod_num = prod_num;
		this.quantity = quantity;
		this.ordersdt_shippingfee = ordersdt_shippingfee;
		this.ordersdt_totalprice = ordersdt_totalprice;
		this.ordersdt_result = ordersdt_result;
		this.prod_name = prod_name;
		this.prod_kind = prod_kind;
		this.prod_discount = prod_discount;
		this.prod_price1 = prod_price1;
		this.prod_content = prod_content;
		this.prod_mainimage = prod_mainimage;
		this.prod_sellyn = prod_sellyn;
		this.prod_regdate = prod_regdate;
		this.prod_stock = prod_stock;
		this.prod_grade = prod_grade;
	}
}
