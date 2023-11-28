package com.ojo.ojoa.controller;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ojo.ojoa.entity.Product;
import com.ojo.ojoa.service.ProductService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;


@RestController
@RequestMapping("/api")
@Log4j2
@AllArgsConstructor
public class ProductRestController {
	
	ProductService productService;

	@GetMapping("/ip")
	public String ip (Model model) {
		// 요청을 보낸 클라이언트의 IP주소를 반환합니다.
		return "";
	}
	
	@GetMapping("/productList")
	public List<Product> productList() {
		return productService.selectList();
	}

	
	
	
}
	
