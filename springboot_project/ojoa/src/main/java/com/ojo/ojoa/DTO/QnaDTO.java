package com.ojo.ojoa.DTO;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

public class QnaDTO {
	
	@Data
	public static class QnaMainListDTO {
		@JsonProperty("num")
		private int qna_seq;
		
		@JsonProperty("imgNo")
	    private String prod_image;
		
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
	    
	    public QnaMainListDTO(int qna_seq, String prod_image, String prod_name, String qna_category, String qna_title, String qna_content, String titleIcon, String id, LocalDateTime qna_redate) {
	    	super();
	        this.qna_seq = qna_seq;
	        this.prod_image = prod_image;
	        this.prod_name = prod_name;
	        this.qna_category = qna_category;
	        this.qna_title = qna_title;
	        this.qna_content = qna_content;
	        this.titleIcon = titleIcon;
	        this.id = id;
	        this.qna_redate = qna_redate;
	    }
	}
    
}

