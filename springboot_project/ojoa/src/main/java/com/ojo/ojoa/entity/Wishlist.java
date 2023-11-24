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
@Table(name = "wishlist")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Wishlist {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int wish_num;
	
	@Column(name="id", nullable=false)
	private String id;
	
	@Column(name="prod_num", nullable=false)
	private int prod_num;

} //class
