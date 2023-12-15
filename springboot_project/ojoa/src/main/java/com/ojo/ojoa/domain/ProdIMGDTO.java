package com.ojo.ojoa.domain;

public class ProdIMGDTO {

	// private String cartid;
	private String prod_image1;
	private String prod_image2;
	private String prod_image3;
	private String prod_image4;
	private String prod_imagedetail;
	private String prod_mainimage;
	private String prod_name;
	private String prod_content;

	// => Join 구문결과 받기위해서는
	// select 구문의 순서와 동일하게 모든 컬럼을 초기화하는 생성자 필요함.

	public ProdIMGDTO(String prod_image1, String prod_image2, String prod_image3, String prod_image4,
			String prod_imagedetail, String prod_mainimage, String prod_name, String prod_content) {

		super();

		this.prod_image1 = prod_image1;
		this.prod_image2 = prod_image2;
		this.prod_image3 = prod_image3;
		this.prod_image4 = prod_image4;
		this.prod_imagedetail = prod_imagedetail;
		this.prod_mainimage = prod_mainimage;
		this.prod_name = prod_name;
		this.prod_content = prod_content;
	}
}
