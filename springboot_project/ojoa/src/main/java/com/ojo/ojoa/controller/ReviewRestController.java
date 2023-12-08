package com.ojo.ojoa.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
//import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ojo.ojoa.domain.ReviewDTO;
import com.ojo.ojoa.entity.Qna;
//import com.ojo.ojoa.domain.ReviewDTO;
import com.ojo.ojoa.entity.Review;
import com.ojo.ojoa.service.ReviewService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor
//@Controller
@RestController
@Log4j2
@RequestMapping("/reviewrest")
public class ReviewRestController {
	ReviewService reviewService;

	// 상품문의 review
//	public ResponseEntity<List<ReviewDTO>> allReviewList() {
//		List<ReviewDTO> reviewList = reviewService.selectAllList();
//		return ResponseEntity.ok(reviewList);
	
//	}
	@GetMapping("/reviewR/allReviewList")
	public List<Review> allReviewList() {
		return reviewService.selectList();
	}
	
	// 상품후기 review - 게시글 등록
    @PostMapping("reviewR/saveReview")
	/*
	 * public ResponseEntity<String> saveReview(Review entity, HttpServletRequest
	 * request, ReviewDTO dto, Model model) throws IOException {
	 */
    	public ResponseEntity<?> saveReview(Review entity, Model model) throws IOException  {
		
		// ** MultipartFile ***********************
		String realPath = "C:\\ojoa_v3\\springboot_project\\ojoa\\src\\main\\webapp\\resources\\uploadImages\\";
		// => 기본 이미지 지정하기
		String file1 = "", file2 = "", file3 = "", file4 = "";
		
		// => 저장경로 완성
		// Review_image1
		MultipartFile uploadfilef = entity.getReview_image1f();
        if (uploadfilef != null && !uploadfilef.isEmpty()) {
            file1 = realPath + uploadfilef.getOriginalFilename();
            uploadfilef.transferTo(new File(file1));
            file2 = uploadfilef.getOriginalFilename();
            log.info("file1 : " + file1);
            log.info("file2 : " + file2);
        }
        
        System.out.println("uploadfilef => " + uploadfilef);

        MultipartFile uploadfilef2 = entity.getReview_image2f();
        if (uploadfilef2 != null && !uploadfilef2.isEmpty()) {
            file3 = realPath + uploadfilef2.getOriginalFilename();
            uploadfilef2.transferTo(new File(file3));
            file4 = uploadfilef2.getOriginalFilename();
            log.info("file3 : " + file3);
            log.info("file4 : " + file4);
        }
        System.out.println("uploadfilef2 => " + uploadfilef2);
		
		// 1.4) 완성된 경로를 dto 에 set
		entity.setReview_image1(file2);
		// 1.4) 완성된 경로를 dto 에 set
		entity.setReview_image2(file4);
		
        try {

        	System.out.println("111111"+entity);
        	// ReviewDTO를 Review 엔티티로 변환하여 저장하거나 필요한 로직 수행
        	reviewService.save(entity); // ReviewService를 통해 엔티티를 저장합니다.
            System.out.println("22222222"+entity);
            return ResponseEntity.ok("데이터 저장 성공");
        } catch (Exception e) {
            log.error("데이터 저장 중 에러: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("데이터 저장 실패");
        }
    }


}