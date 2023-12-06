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
@Table(name = "Prod_image")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Prod_image {

	@Id
	@Column(name="prod_imagenum")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int prod_imagenum; //  PK, AI
	
	@Column(name="prod_num")
	private int prod_num; // FK for product(prodnum)
	
	@Column(name="prod_image1")
	private String prod_image1;
	
	@Column(name="prod_image2")
	private String prod_image2;
	
	@Column(name="prod_image3")
	private String prod_image3;

	@Column(name="prod_image4")
	private String prod_image4;
	
	@Column(name="prod_imagedetail")
	private String prod_imagedetail;
	
}
