package com.ojo.ojoa.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "notice")

public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private String notice_seq;
    
	private String id;
    
	private String notice_title;
    
	private String notice_content;
    
	private LocalDateTime notice_date;
	
}
