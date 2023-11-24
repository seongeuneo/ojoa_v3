package com.ojo.ojoa.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "noti")

public class Noti {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "noti_seq")
	private String noti_seq;
    
    @Column(name="id", nullable =false, length = 20)
	private String id;
    
    @Column(name="noti_title", nullable =false, length = 30)
	private String noti_title;
    
    @Column(name="noti_content", nullable =false, length = 1000)
	private String noti_content;
    
    @Column(name="noti_date", nullable =false)
	private LocalDateTime noti_date;
	
}
