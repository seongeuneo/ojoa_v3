package com.ojo.ojoa.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class ReviewDTO {
	
	
		private int review_seq;
		
	    private String id;
		
	    private int prod_num;
		
	    private String review_title;
		
	    private String review_content;
		
	    private String review_image1;
		
	    private String review_image2;
		
	    private String review_date;

		private int review_view;
		
		// Product 조인한 컬럼들
		private String prod_name;
		private String prod_mainimage;
		
		
	    
		public ReviewDTO(int review_seq, String id, int prod_num, String review_title, String review_content, String review_image1, String review_image2, String review_date, int review_view, String prod_name, String prod_mainimage) {
		    this.review_seq = review_seq;
		    this.id = id;
		    this.prod_num = prod_num;
		    this.review_title = review_title;
		    this.review_content = review_content;
		    this.review_image1 = review_image1;
		    this.review_image2 = review_image2;
		    this.review_date = review_date;
		    this.review_view = review_view;
		    this.prod_name = prod_name;
		    this.prod_mainimage = prod_mainimage;
		}

	
}
