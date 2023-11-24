package com.ojo.ojoa.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "products")
@EntityListeners(AuditingEntityListener.class)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Products {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int prod_num; // primary key, auto_increment
	
	@Column(nullable = false)
	private String prod_name;
	
	@Column(nullable = false, columnDefinition = "int default 1")
	private int  prod_kind;  // 침대: '1', 소파: '2', 책장: '3', 옷장: '4', 조명: '5', 의자: '6'
	
	@Column(nullable = false)
	private int  prod_discount;
	
	@Column(nullable = false)
	private int  prod_price1;

	@Column(nullable = false)
	private String prod_content;
	
	@Column(nullable = false)
	private String prod_image;
	
	@Column(nullable = false, columnDefinition = "CHAR(1) DEFAULT 'y' CHECK (prod_useyn IN ('y', 'n'))")
	private String prod_useyn; // 판매: 'y' , 중단: 'n'
	
	@CreatedDate
	@Column(nullable = false)
	private LocalDateTime prod_regdate;
	
	@Column(nullable = false, columnDefinition = "int default 100")
	private int prod_stock;  // 기본 재고값 '100'
	
	@Column(nullable = false, columnDefinition = "float default 0.0")
	private float prod_grade;  // 기본 평점 '0.0'
	
} //class
