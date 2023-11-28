package com.ojo.ojoa.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ojo.ojoa.service.ProductService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor
@Controller
@Log4j2
@RequestMapping("/wish")
public class WishController {
	ProductService productService;

	// ** Product List - 회원별 카트 목록 반환 
    @GetMapping("/wishlist")
    public void wishList(Model model) {
    	model.addAttribute("product", productService.selectList());
    } // productList
}
