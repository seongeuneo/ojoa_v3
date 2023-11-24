package com.ojo.ojoa.service;

import java.util.List;

import com.ojo.ojoa.entity.Orders;

public interface OrdersService {

	Orders getOrderById(Long id);
	
	Orders createOrder(Orders order);
	
	Orders updateOrder(Long id, Orders updatedOrder);
	
	void deleteOrder(Long id);
	
	List<Orders> getOrdersListByUserId(Long userId);
	
	// 기타 주문과 관련된 비즈니스 로직을 추가할 수 있어요.
}

