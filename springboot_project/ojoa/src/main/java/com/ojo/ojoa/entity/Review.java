package com.ojo.ojoa.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "review")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Review extends ReviewBaseEntity{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="review_seq")
	private int review_seq; //Primary key Auto increment
	
	@Column(name="id")
	private String id; //Foregin key
	
	@Column(name="prod_num")
	private int prod_num;
	
	@Column(name="review_title")
	private String review_title;
	
	@Column(name="review_content")
	private String review_content;
	
	@Column(name="review_image1")
	private String review_image1;
	
	@Column(name="review_image2")
	private String review_image2;
	
	@Transient // SQL에서 제외시켜야함 
	private MultipartFile review_image1f;

	@Transient // SQL에서 제외시켜야함 
	private MultipartFile review_image2f;
	// => form 의 Upload_File 정보를 전달받기위한 필드
	//    MultipartFile (Interface) -> CommonsMultipartFile
//			
//	@Column(name="review_date")
//	private String review_date;
//	
	@Column(name="review_view") //columnDefinition = "int default 0")
	private int review_view;
	
	@Column(name="review_rate") 
	private int review_rate;
	
} //class
