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
    @Column(name = "notice_seq")
	private String notice_seq;
    
    @Column(name="id", nullable =false, length = 20)
	private String id;
    
    @Column(name="notice_title", nullable =false, length = 30)
	private String notice_title;
    
    @Column(name="notice_content", nullable =false, length = 1000)
	private String notice_content;
    
    @Column(name="notice_date", nullable =false)
	private LocalDateTime notice_date;
	
}
