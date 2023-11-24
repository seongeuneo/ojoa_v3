package com.ojo.ojoa.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "item_image")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Item_image {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int item_image_num; // PK
	
	private int prod_num; // 상품 번호 FK for product(prodnum)
	
	@Column(nullable = false)
	private String item_image1; // 썸네일 이미지 1
	@Column(nullable = true)
	private String item_image2; // 썸네일 이미지 2
	@Column(nullable = true)
	private String item_image3; // 썸네일 이미지 3
	@Column(nullable = true)
	private String item_image4; // 썸네일 이미지 4
	
	@Column(nullable = false)
	private String item_imagedetail; // 상세이미지
}
