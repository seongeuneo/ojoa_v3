package com.ojo.ojoa.DTO;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

public class QnaDTO {
	
	@Data
	public static class QnaMainListDTO {
		//가독성 및 유지보수 향상을 위해서 QnaMainListDTO를 만듦
		//검색기능을 구현하기 위해 주요정보를 담는 DTO클래스를 만듦
		
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
		
		// 관리자 reply DTO
//		private int root;
//		private int step;
//		private int indent;
		
	    public QnaMainListDTO(int qna_seq, String prod_image, String prod_name, String qna_category, String qna_title, String qna_content, String titleIcon, String id, LocalDateTime qna_redate) {
	    // 해당클래스의 객체를 생성할때 필요한 모든 필드를 인자로 받아 초기화하는 생성자
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


