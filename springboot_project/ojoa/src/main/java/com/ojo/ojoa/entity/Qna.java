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

    private String id; //Foregin key

    private String qna_category;

    private String qna_title;

    private String qna_content;

    private String qna_reply;

    private String qna_redate;

    private String qna_indate;

    //글등록시 필요한 Entity
    private int root;
    private int step;
    private int indent;
   
} //class