package com.ojo.ojoa.entity;



import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "product")
@EntityListeners(AuditingEntityListener.class)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int prod_num; // primary key, auto_increment
	
	private String prod_name;
	
	//@Column(nullable = false, columnDefinition = "int default 1")
	private String  prod_kind;  
	
	private int  prod_discount;
	
	private int  prod_price1;

	private String prod_content;
	
	private String prod_mainimage;
	
	//@Column(nullable = false, columnDefinition = "CHAR(1) DEFAULT 'y' CHECK (prod_sellyn IN ('y', 'n'))")
	private char prod_sellyn; // 판매: 'y' , 중단: 'n'
	
	//@CreatedDate
	private String prod_regdate;
	
	//@Column(nullable = false, columnDefinition = "int default 100")
	private int prod_stock;  // 기본 재고값 '100'
	
	//@Column(nullable = false, columnDefinition = "float default 0.0")
	private float prod_grade;  // 기본 평점 '0.0'



	@Transient
	private MultipartFile uploadfilef;
	// => form 의 Upload_File 정보를 전달받기위한 필드
	//    MultipartFile (Interface) -> CommonsMultipartFile
	
} //class
