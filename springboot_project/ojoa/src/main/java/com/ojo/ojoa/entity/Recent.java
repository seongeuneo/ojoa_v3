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
@Table(name = "recent")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Recent {
	
	@Id
	@Column(name="recent_num")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int recent_num; //  PK, AI
	
	@Column(name="id")
	private String id;
	
	@Column(name="prod_num")
	private int prod_num;  // FK for product(prod_num)

	@Column(name="recent_image")
	private String recent_image;  // FK for product(prod_num)
	
}
