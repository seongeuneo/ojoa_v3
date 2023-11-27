package com.ojo.ojoa.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ojo.ojoa.service.CartService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor
@Controller
@Log4j2
@RequestMapping("/admin")
public class AdminMainController {
	
	@GetMapping("/adminmain")
	public String adminMain() {
		// 여기서는 관리자 페이지의 JSP 파일명을 반환합니다.
		return "admin/AdminMain"; // adminPage는 관리자 페이지의 JSP 파일명입니다.
	}

}

