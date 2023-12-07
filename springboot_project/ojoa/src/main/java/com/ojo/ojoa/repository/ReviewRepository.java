package com.ojo.ojoa.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ojo.ojoa.domain.ReviewDTO;
import com.ojo.ojoa.entity.Review;

@Repository
public interface ReviewRepository 
					extends JpaRepository<Review, Integer> {
 List<Review> findAll();
	
	@Query("SELECT new com.ojo.ojoa.domain.ReviewDTO(A.review_seq, A.id, A.prod_num, A.review_title,  "
			+ "  A.review_content, A.review_image1, A.review_image2,"
			+ "  A.review_view, A.review_rate, B.prod_name, B.prod_mainimage) "
			+ "FROM Review A LEFT JOIN Product B ON A.prod_num = B.prod_num")
    List<ReviewDTO> findAllReviewList();

}
