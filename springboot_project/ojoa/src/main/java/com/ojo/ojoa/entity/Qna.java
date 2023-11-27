package com.ojo.ojoa.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
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
public class Qna {
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int qna_seq;

    @Column(name="prod_num", nullable=false)
    private int prod_num; //Foregin key

    @Column(name="id", nullable=false)
    private String id; //Foregin key

    @Column(name="qna_category", nullable=false)
    private String qna_category;

    @Column(name="qna_title", nullable=false)
    private String qna_title;

    @Column(name="qna_content", nullable=false)
    private String qna_content;

    @Column(name="qna_reply", nullable=false)
    private String qna_reply;

    @Column(nullable = false, columnDefinition = "int default 1")
    private String qna_rep;

    @Column(name="qna_indate", nullable=false)
    private String qna_indate;

   
} //class