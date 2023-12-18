package com.ojo.ojoa.DTO;

import java.time.LocalDateTime;
import java.util.List;

import com.ojo.ojoa.entity.OrdersDetail;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrdersReqDTO {

	private int orders_num; // 주문번호 PK, AI

	private String id; // 주문한 회원 아이디 FK for users(id)

	private LocalDateTime orders_indate; // 주문날짜

	private int orders_totalprice; // 주문총금액

	private int orders_price; // 결제액

	private String orders_method; // 결제수단

	private String orders_addresscheck; // 배송지

	private String shipping_name;

	private String shipping_zipcode;

	private String shipping_address;

	private String shipping_addressdetail;

	private String shipping_phone;

	private String shipping_message;

	private List<OrdersDetail> displayedCartList;

}
