package com.ojo.ojoa.domain;

import lombok.Data;

@Data
public class Prod_imageDTO {
	
	private int prod_imagenum;
	private int prod_num;
	private String prod_image1;
	private String prod_image2;
	private String prod_image3;
	private String prod_image4;
	private String prod_imagedetail;
	
	public Prod_imageDTO(int prod_imagenum, int prod_num, String prod_image1, String prod_image2, String prod_image3,  String prod_image4, String prod_imagedetail) {
		 
		super();
		
		this.prod_imagenum =prod_imagenum;
		this.prod_num = prod_num;
		this.prod_image1 = prod_image1;
		this.prod_image2 = prod_image2;
		this.prod_image3 = prod_image3;
		this.prod_image4 = prod_image4;
		this.prod_imagedetail = prod_imagedetail;
	}

}
