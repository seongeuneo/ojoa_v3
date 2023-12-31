package com.ojo.ojoa.repository;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ojo.ojoa.domain.ReviewDTO;
import com.ojo.ojoa.entity.Review;

@Repository
public interface ReviewRepository 
					extends JpaRepository<Review, Integer> {

	
	@Query("SELECT new com.ojo.ojoa.domain.ReviewDTO(A.review_seq, A.id, A.prod_num, A.review_title,  "
			+ "  A.review_content, A.review_image1, A.review_image2,"
			+ "  A.review_view, A.review_rate, B.prod_name, B.prod_mainimage) "
			+ "FROM Review A LEFT JOIN Product B ON A.prod_num = B.prod_num")
    List<ReviewDTO> findAllReviewList();
	
	// 평점
    @Query("SELECT AVG(r.review_rate) FROM Review r WHERE r.prod_num = :prod_num")
    float calculateAverageRateByProdNum(Integer prod_num);
    
 // 페이지네이션
 	@Transactional
 	@Query("Select r from Review r order by r.prod_num asc")
 	Page<Review> getReviewList(Pageable pageable);


}
