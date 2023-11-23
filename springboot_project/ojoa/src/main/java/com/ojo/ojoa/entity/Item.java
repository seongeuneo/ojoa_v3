package com.ojo.ojoa.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Item {

	@Id //pk 아이디 어노테이션 
	//ai 는 @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int item_no;
}
