package com.ojo.ojoa.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Users {
	
	@Id
	private String id; // Primary key
	
	@Column(nullable = false)
	private String pwd;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String email;
	
	@Column(nullable = false)
	private String zipcode;
	
	@Column(nullable = false)
	private String address;
	
	@Column(nullable = false)
	private String addressdetail;
	
	@Column(nullable = false)
	private String phone;
	
	@Column(nullable = false, columnDefinition = "int default 1")
	private int useyn;
	
	@CreatedDate
	@Column(nullable = false)
	private LocalDateTime regdate;  // LocalDateTime을 사용해서 생성일을 관리.
	
	@Column(nullable = false, columnDefinition = "int default 1")
	private int marketing;
	
} //class
