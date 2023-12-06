package com.ojo.ojoa.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ojo.ojoa.DTO.CartDTO;
import com.ojo.ojoa.domain.ReviewDTO;
import com.ojo.ojoa.entity.Review;
import com.ojo.ojoa.service.ReviewService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor
@Controller
@RestController
@Log4j2
@RequestMapping("/reviewrest")
public class ReviewRestController {
	ReviewService reviewService;

	// 상품문의 review
//	@GetMapping("review/allReviewList")
	@PostMapping("review/allReviewList")
	public ResponseEntity<List<ReviewDTO>> getAllReviewList() {
		List<ReviewDTO> reviewList = reviewService.selectAllList();
		return ResponseEntity.ok(reviewList);
	}

	// 상품문의 review - 게시글 등록
	@PostMapping("reveiw/saveReview")
	public ResponseEntity<String> saveReview(@RequestBody Review entity) {
		try {
			System.out.println("111111" + entity);
			// ReviewDTO를 Review 엔티티로 변환하여 저장하거나 필요한 로직 수행
			reviewService.save(entity); // ReviewService를 통해 엔티티를 저장합니다.
			System.out.println("22222222" + entity);
			return ResponseEntity.ok("데이터 저장 성공");
		} catch (Exception e) {
			log.error("데이터 저장 중 에러: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("데이터 저장 실패");
		}
	}

}
