package com.ojo.ojoa.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ojo.ojoa.DTO.CartDTO;
import com.ojo.ojoa.DTO.QnaDTO;
import com.ojo.ojoa.entity.Qna;
import com.ojo.ojoa.service.CartService;
import com.ojo.ojoa.service.QnaService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@AllArgsConstructor
@Log4j2
@RequestMapping("api/qna")
public class RestReactController {
	QnaService qnaService;
	CartService cartService;
//	MemberService memberService;
//	ProductService productService;
//	WishService wishService;
//	OrderService orderService;
	
	@GetMapping("/allQnaList")
    public ResponseEntity<List<QnaDTO>> getAllQnaList(Model model) {
		List<QnaDTO> test = qnaService.selectAllList();
    	//model.addAttribute("qna", test);
    	return ResponseEntity.ok(test);
    }

	
<<<<<<< HEAD
//	@GetMapping("cart/allCartList")
//    public ResponseEntity<List<CartDTO>> getAllCartList(Model model) {
//		List<CartDTO> test = cartService.selectAllList();
//    	//model.addAttribute("qna", test);
//    	return ResponseEntity.ok(test);
//    }
=======
	@GetMapping("cart/allCartList")
    public ResponseEntity<List<CartDTO>> getAllCartList(Model model) {
		List<CartDTO> test = cartService.selectAllList();
    	//model.addAttribute("qna", test);
    	return ResponseEntity.ok(test);
    }
>>>>>>> main
	
// 여기서부터 새로운 코드
	 // 새로운 코드 - 데이터 저장	
    @PostMapping("/saveQna")
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
<<<<<<< HEAD

=======
>>>>>>> main
}

