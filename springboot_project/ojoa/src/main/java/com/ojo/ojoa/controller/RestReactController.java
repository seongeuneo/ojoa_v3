package com.ojo.ojoa.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ojo.ojoa.DTO.CartDTO;
import com.ojo.ojoa.DTO.QnaDTO;
import com.ojo.ojoa.service.CartService;
import com.ojo.ojoa.service.MemberService;
import com.ojo.ojoa.service.ProductService;
import com.ojo.ojoa.service.QnaService;
import com.ojo.ojoa.service.WishService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@AllArgsConstructor
@Log4j2
@RequestMapping("api")
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
	
	@GetMapping("cart/allCartList")
    public ResponseEntity<List<CartDTO>> getAllCartList(Model model) {
		List<CartDTO> test = cartService.selectAllList();
    	//model.addAttribute("qna", test);
    	return ResponseEntity.ok(test);
    }
	
}
