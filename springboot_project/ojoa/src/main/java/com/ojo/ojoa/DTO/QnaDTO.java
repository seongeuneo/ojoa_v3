package com.ojo.ojoa.DTO;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class QnaDTO {
	@JsonProperty("num")
	private int qna_seq;
	
	@JsonProperty("imgNo")
    private String prod_mainimage;
	
	@JsonProperty("itemInfo")
    private String prod_name;
	
	@JsonProperty("category")
    private String qna_category;
	
	@JsonProperty("title")
    private String qna_title;
	
	@JsonProperty("notification")
    private String qna_content;
	
	@JsonProperty("titleIcon")
    private String titleIcon;
	
	@JsonProperty("writer")
    private String id;
	
	@JsonProperty("date")
    private LocalDateTime qna_redate;
    
	
	
    public QnaDTO() {
    }

    public QnaDTO(int qna_seq, String prod_mainimage, String prod_name, String qna_category, String qna_title, String qna_content, String titleIcon, String id, LocalDateTime qna_redate) {
        this.qna_seq = qna_seq;
        this.prod_mainimage = prod_mainimage;
        this.prod_name = prod_name;
        this.qna_category = qna_category;
        this.qna_title = qna_title;
        this.qna_content = qna_content;
        this.titleIcon = titleIcon;
        this.id = id;
        this.qna_redate = qna_redate;
    }
}
