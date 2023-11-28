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
    @Column(name="notice_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private String notice_seq;
    
    @Column(name="id")
	private String id;
    
    @Column(name="notice_title")
	private String notice_title;
    
    @Column(name="notice_content")
	private String notice_content;
    
    @Column(name="notice_date")
	private LocalDateTime notice_date;
	
}
