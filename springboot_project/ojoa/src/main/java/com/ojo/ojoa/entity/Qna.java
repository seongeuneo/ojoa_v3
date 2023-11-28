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
@Table(name = "qna")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Qna extends QnaBaseEntity {
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int qna_seq;

    private int prod_num; //Foregin key

    private String id; //Foregin key

    private String qna_category;

    private String qna_title;

    private String qna_content;

    private String qna_reply;


   
} //class