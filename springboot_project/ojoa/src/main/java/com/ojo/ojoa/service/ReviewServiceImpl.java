package com.ojo.ojoa.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ojo.ojoa.domain.ReviewDTO;
import com.ojo.ojoa.entity.Review;
import com.ojo.ojoa.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;

//@Log4j2
@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

	private final ReviewRepository reviewRepository;

	// ** selectList
	@Override
	public List<Review> selectList() {
		return reviewRepository.findAll();
	}

	// 페이지네이션
	@Override
	public Page<Review> getReviewList(Pageable pageable) {
		return reviewRepository.getReviewList(pageable);
	}

	// ** selectOne
	@Override
	public Review selectOne(int review_seq) {
		Optional<Review> result = reviewRepository.findById(review_seq);
		if (result.isPresent())
			return result.get();
		else
			return null;
	}

	// ** insert, update
	@Override
	public String save(Review entity) {
		reviewRepository.save(entity); // 저장 또는 수정
		return entity.getId(); // 저장후 key return
	}

	// ** delete
	@Override
	public int delete(int review_seq) {
		reviewRepository.deleteById(review_seq);
		return review_seq; // 삭제후 key return
	}

	@Override
	public List<ReviewDTO> selectAllList() {
		return reviewRepository.findAllReviewList();
	}

}
