package com.ojo.ojoa.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ojo.ojoa.entity.Orders;
import com.ojo.ojoa.repository.OrdersRepository;

@Service
public class OrdersServiceImpl implements OrdersService {
	
	private final OrdersRepository ordersRepository;

	public OrdersServiceImpl(OrdersRepository ordersRepository) {
		this.ordersRepository = ordersRepository;
	}
	
	@Override
	public Orders getOrderById(Long id) {
		// 주문 ID를 이용하여 주문을 조회하는 로직
		return ordersRepository.findById(id).orElse(null);
	}
	
	@Override
	public Orders createOrder(Orders orders) {
		// 새로운 주문을 생성하고 저장하는 로직
		return ordersRepository.save(orders);
	}
	
	@Override
	public Orders updateOrder(Long id, Orders updatedOrder) {
		// 주문을 업데이트하는 로직
		Orders existingOrder = ordersRepository.findById(id).orElse(null);
		if (existingOrder != null) {
			// 업데이트된 정보로 기존 주문을 업데이트하고 저장
			// existingOrder.setSomeField(updatedOrder.getSomeField());
			// 필요한 업데이트 로직들을 수행
			// ...
			
			return ordersRepository.save(existingOrder);
		}
		return null;
	}
	
	@Override
	public void deleteOrder(Long id) {
		// 주문을 삭제하는 로직
		ordersRepository.deleteById(id);
	}
	
	@Override
    public List<Orders> getOrdersListByUserId(Long id) {
        // userId를 기준으로 해당 사용자의 주문 목록을 가져오는 로직을 구현해야 합니다.
		// userId를 기반으로 주문 목록을 가져오는 예시 쿼리
        // return ordersRepository.findByUserId(id);
		return ordersRepository.findAll();
    }
	
	// 기타 주문과 관련된 비즈니스 로직을 구현할 수 있어요.
}

