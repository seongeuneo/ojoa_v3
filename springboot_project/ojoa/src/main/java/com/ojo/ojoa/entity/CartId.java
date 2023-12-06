package com.ojo.ojoa.entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // 필수
@NoArgsConstructor // 필수
@AllArgsConstructor
public class CartId implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String id;
	private int prod_num;

} //class
