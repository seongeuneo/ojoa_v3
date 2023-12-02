package com.ojo.ojoa.domain;

import lombok.Data;


//** Wish, Product JoinDTO

@Data
public class WishDTO {
	
	private int wish_num;
	private String id;
	private int prod_num;
	private String prod_mainimage;
	private String prod_name;
	
	// => Join 구문결과 받기위해서는 
	//	  select 구문의 순서와 동일하게 모든 컬럼을 초기화하는 생성자 필요함. 
	
	public WishDTO(int wish_num, String id, int prod_num, String prod_mainimage, String prod_name) {
					 
		super();
		
		this.wish_num =wish_num;
		this.id = id;
		this.prod_num = prod_num;
		this.prod_mainimage = prod_mainimage;
		this.prod_name = prod_name;
	}
	
	
	
}
