package com.ojo.ojoa.domain;

import lombok.Data;


//** Cart, Product JoinDTO

@Data
public class CartProdDTO {
	
	//private String cartid;
	private String id;
	private int prod_num;
	private int quantity;
	private String prod_mainimage;
	private String prod_name;
	private String prod_content;
	
	// => Join 구문결과 받기위해서는 
	//	  select 구문의 순서와 동일하게 모든 컬럼을 초기화하는 생성자 필요함. 
	
	public CartProdDTO(String id, int prod_num, int quantity,
						String prod_mainimage, String prod_name, String prod_content ) {
					 
		super();
		
		this.id = id;
		this.prod_num = prod_num;
		this.quantity = quantity;
		this.prod_mainimage = prod_mainimage;
		this.prod_name = prod_name;
		this.prod_content = prod_content;
	}
	
	
	
}
