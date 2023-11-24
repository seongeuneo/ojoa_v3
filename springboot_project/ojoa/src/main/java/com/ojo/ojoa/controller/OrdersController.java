package com.ojo.ojoa.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ojo.ojoa.entity.Orders;
import com.ojo.ojoa.service.OrdersService;

@RestController
@RequestMapping("/orders")
public class OrdersController {
	private final OrdersService ordersService;

	public OrdersController(OrdersService orderService) {
		this.ordersService = orderService;
	}
	
	// 주문 조회 
	@GetMapping("/{id}") 
	public Orders getOrderById(@PathVariable Long id) {
		// OrderService를 통해 해당 id의 주문을 가져와 반환
		return ordersService.getOrderById(id);
	}
	
	// 주문 생성 
	@PostMapping("/create")
	public Orders createOrder(@RequestBody Orders order) {
		// 주문을 생성하고 반환
		return ordersService.createOrder(order);
	}
	
	// 주문 목록 조회 
	@PostMapping("/getorderlist")
	public List<Orders> getOrdersList(@RequestParam("userId") Long userId) {
	    return ordersService.getOrdersListByUserId(userId);
	}

	// 다른 엔드포인트들도 유사한 방식으로 엔티티를 사용하여 구현
}

