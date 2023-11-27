package com.ojo.ojoa.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

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
public class Review {
	
	@Id
	private int rv_seq; //Primary key Auto increment
	
	@Column(name="id", nullable=false)
	private String id; //Foregin key
	
	@Column(name="rv_title", nullable=false)
	private String rv_title;
	
	@Column(name="rv_content", nullable=false)
	private String rv_content;
	
	@Column(name="rv_date", nullable=false)
	private String rv_date;
	
	@Column(nullable = false, columnDefinition = "int default 0")
	private int rv_view;
	
} //class
