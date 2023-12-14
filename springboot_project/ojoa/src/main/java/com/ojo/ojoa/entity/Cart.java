package com.ojo.ojoa.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity 
@Table(name="cart")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(CartId.class)
public class Cart implements Serializable {
	private static final long serialVersionUID = 1L;
	
	// => id+prod_num 에 P.key 적용
	@Id
	private String id;
	@Id
	private int prod_num;
	private int quantity;
	
} //class
