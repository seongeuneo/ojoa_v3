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
@Table(name = "member")
@EntityListeners(AuditingEntityListener.class)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member {
	
	@Id
	@Column(name="id")
	private String id; // Primary key
	
	@Column(name="password")
	private String password;
	@Column(name="name")
	private String name;
	@Column(name="email")
	private String email;
	
	@Column(name="zipcode")
	private String zipcode;
	
	@Column(name="address")
	private String address;
	
	@Column(name="addressdetail")
	private String addressdetail;
	
	@Column(name="phone")
	private String phone;
	
	@Column(name="memberyn")
	//@Column(columnDefinition = "CHAR(1) DEFAULT 'y' CHECK (memberyn IN ('y', 'n'))")
	private String memberyn;
	
	@Column(name="regdate")
	@CreatedDate
	private LocalDateTime regdate;
	
	@Column(name="marketing_sms")
	//@Column(columnDefinition = "CHAR(1) DEFAULT 'y' CHECK (marketing_sms IN ('y', 'n'))")
	private String marketing_sms;

	@Column(name="marketing_email")
	//@Column(columnDefinition = "CHAR(1) DEFAULT 'y' CHECK (marketing_email IN ('y', 'n'))")
	private String marketing_email;
	
} //class
