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
@Table(name = "admin")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Admin {
	
	@Id
	@Column(name="id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id; // PK, AI
	
	@Column(name="password")
	private String password; // 관리자 비밀번호
	
	@Column(name="name")
	private String name; // 관리자 이름
	
	@Column(name="email")
	private String email; // 관리자 이메일 
	
	@Column(name="phone")
	private String phone; // 관리자 전화번호
	
	
	

}
