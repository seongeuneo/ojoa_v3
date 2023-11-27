package com.ojo.ojoa.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ojo.ojoa.service.CartService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

//@AllArgsConstructor
@Controller
@Log4j2
@RequestMapping("/adminshipping")
public class AdminShippingController {
	
	@GetMapping("/adminshippinglist")
	public String adminShippingList() {
		return "admin/Admin_ShippingList"; 
	}
	
}
