package com.ojo.ojoa.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

//** Cart, Product JoinDTO

@Data
public class CartDTO {

//	@JsonProperty("id")
//	private String cartid;

	@JsonProperty("userId")
	private String id;

	@JsonProperty("prod_num")
	private int prod_num;

	@JsonProperty("quantity")
	private int quantity;

	@JsonProperty("imgNo")
	private String prod_mainimage;

	@JsonProperty("prod_name")
	private String prod_name;

	@JsonProperty("productPromotion")
	private int prod_discount;

	@JsonProperty("productPriceFormatted")
	private int prod_price1;

	@JsonProperty("prod_content")
	private String prod_content;

	private String state;

	// => Join 구문결과 받기위해서는
	// select 구문의 순서와 동일하게 모든 컬럼을 초기화하는 생성자 필요함.

	public CartDTO(String id, int prod_num, int quantity, String prod_mainimage, String prod_name, int prod_discount,
			int prod_price1, String prod_content) {

		super();

		this.id = id;
		this.prod_num = prod_num;
		this.quantity = quantity;
		this.prod_mainimage = prod_mainimage;
		this.prod_name = prod_name;
		this.prod_discount = prod_discount;
		this.prod_price1 = prod_price1;
		this.prod_content = prod_content;

	}

}
