package com.ojo.ojoa.entity;

import java.time.LocalDateTime;

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
	
	private String password;
	private String name;
	private String email;
	private String zipcode;
	private String address;
	private String addressdetail;
	private String phone;
	
	//@Column(columnDefinition = "CHAR(1) DEFAULT 'y' CHECK (memberyn IN ('y', 'n'))")
	private String memberyn;
	
	@CreatedDate
	private LocalDateTime regdate;
	
	//@Column(columnDefinition = "CHAR(1) DEFAULT 'y' CHECK (marketing_sms IN ('y', 'n'))")
	private String marketing_sms;

	//@Column(columnDefinition = "CHAR(1) DEFAULT 'y' CHECK (marketing_email IN ('y', 'n'))")
	private String marketing_email;
	
} //class
