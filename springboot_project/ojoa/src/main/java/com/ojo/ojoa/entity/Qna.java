package com.ojo.ojoa.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "qna")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Qna {
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="qna_seq")
    private int qna_seq;

    @Column(name="prod_num", nullable=false)
    private int prod_num; //Foregin key

    @Column(name="id")
    private String id; //Foregin key

    @Column(name="qna_category")
    private String qna_category;

    @Column(name="qna_title")
    private String qna_title;

    @Column(name="qna_content")
    private String qna_content;

    @Column(name="qna_reply")
    private String qna_reply;

    @Column(name="qna_redate")
    private String qna_redate;

    @Column(name="qna_indate")
    private String qna_indate;

   
} //class