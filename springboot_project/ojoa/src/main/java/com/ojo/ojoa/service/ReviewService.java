package com.ojo.ojoa.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.domain.ReviewDTO;
import com.ojo.ojoa.entity.Review;

@Service
@Transactional
public interface ReviewService {

	// ** selectList
	List<Review> selectList();

	// 페이지네이션
	public Page<Review> getReviewList(Pageable pageable);

	// ** selectOne
	Review selectOne(int review);

	// ** insert, update
	String save(Review entity);

	// ** delete
	int delete(int review_seq);

	List<ReviewDTO> selectAllList();

}
