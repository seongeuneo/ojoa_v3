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
	private String id; // Primary key
	
	@Column(nullable = false)
	private String password;
	
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
	
	@Column(columnDefinition = "CHAR(1) DEFAULT 'y' CHECK (memberyn IN ('y', 'n'))")
	private String memberyn;
	
	@CreatedDate
	@Column(nullable = false)
	private LocalDateTime regdate;  // LocalDateTime을 사용해서 생성일을 관리.
	
	@Column(columnDefinition = "CHAR(1) DEFAULT 'y' CHECK (marketing_sms IN ('y', 'n'))")
	private String marketing_sms;

	@Column(columnDefinition = "CHAR(1) DEFAULT 'y' CHECK (marketing_email IN ('y', 'n'))")
	private String marketing_email;
	
} //class
