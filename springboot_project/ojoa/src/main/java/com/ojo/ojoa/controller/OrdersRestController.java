package com.ojo.ojoa.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ojo.ojoa.DTO.OrdersDTO;
import com.ojo.ojoa.service.OrdersService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor
@Controller
@Log4j2
@RequestMapping("/api") 
public class OrdersRestController {

	OrdersService ordersService;
	
//	@GetMapping("orders/allOrdersList")
//    public ResponseEntity<List<OrdersDTO>> getAllOrdrersList() {
//		List<OrdersDTO> ordersList = ordersService.selectAllList();
//    	//model.addAttribute("qna", test);
//    	return ResponseEntity.ok(ordersList);
//    }
}
