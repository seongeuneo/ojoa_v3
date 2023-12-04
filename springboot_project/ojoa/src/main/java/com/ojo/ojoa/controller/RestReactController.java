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
import com.ojo.ojoa.DTO.QnaDTO;
import com.ojo.ojoa.entity.Cart;
import com.ojo.ojoa.entity.Qna;
import com.ojo.ojoa.service.CartService;
import com.ojo.ojoa.service.QnaService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor
@Controller
@RestController
@Log4j2
@RequestMapping("/api")
public class RestReactController {
	
	QnaService qnaService;
	CartService cartService;
//	MemberService memberService;
//	ProductService productService;
//	WishService wishService;
//	OrderService orderService;
	
	// 장바구니
	@GetMapping("cart/allCartList")
    public ResponseEntity<List<CartDTO>> getAllCartList() {
		List<CartDTO> cartList = cartService.selectAllList();
    	//model.addAttribute("qna", test);
    	return ResponseEntity.ok(cartList);
    }
	
//======================= 새로운 코드 추가 ==============================	
	// 장바구니에 상품 추가
    @PostMapping("cart/saveCart")
    public ResponseEntity<String> saveCart(@RequestBody Cart entity) {
        try {
        	System.out.println("saveCart111111"+entity);
        	// QnaDTO를 Qna 엔티티로 변환하여 저장하거나 필요한 로직 수행
            cartService.save(entity); // QnaService를 통해 엔티티를 저장합니다.
            System.out.println("saveCart22222222"+entity);
            return ResponseEntity.ok("데이터 저장 성공");
        } catch (Exception e) {
            log.error("데이터 저장 중 에러: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("데이터 저장 실패");
        }
    }


//===============================================================================		
	
	// 게시판 QnA 
	@GetMapping("qna/allQnaList")
    public ResponseEntity<List<QnaDTO.QnaMainListDTO>> getAllQnaList(
    		@RequestParam(required = false) String board_category,
    		@RequestParam(required = false) String search_date,
	        @RequestParam(required = false) String search_key,
	        @RequestParam(required = false) String search_query
    	        ) {
		List<QnaDTO.QnaMainListDTO> qnaList = qnaService.selectAllList(board_category, search_date, search_key, search_query);
    	return ResponseEntity.ok(qnaList);
    }
	
	 // 게시판 QnA - 게시글 등록	: 워니
    @PostMapping("qna/saveQna")
    public ResponseEntity<String> saveQna(@RequestBody Qna entity) {
        try {
        	System.out.println("111111"+entity);
        	// QnaDTO를 Qna 엔티티로 변환하여 저장하거나 필요한 로직 수행
            qnaService.save(entity); // QnaService를 통해 엔티티를 저장합니다.
            System.out.println("22222222"+entity);
            return ResponseEntity.ok("데이터 저장 성공");
        } catch (Exception e) {
            log.error("데이터 저장 중 에러: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("데이터 저장 실패");
        }
    }

}