package com.ojo.ojoa.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.DTO.QnaDTO;
import com.ojo.ojoa.domain.ReviewDTO;
import com.ojo.ojoa.entity.Review;

@Service
@Transactional
public interface ReviewService {

	// ** selectList
		List<Review> selectList();

		// ** selectOne
		Review selectOne(int review);

		// ** insert, update
		String save(Review entity);

		// ** delete
		int delete(int review_seq);
		
		List<ReviewDTO> selectAllList();

}
