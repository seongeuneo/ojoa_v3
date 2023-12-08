package com.ojo.ojoa.service;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.entity.OrdersDetail;

@Service
@Transactional
public interface OrdersDetailService {

	// ** selectList
	List<OrdersDetail> selectList(int orders_num);

	// ** selectOne
	OrdersDetail selectOne(int ordersdt_num);

	// ** save : insert, update
	int save(OrdersDetail entity);
		
	// ** delete
	int delete(int ordersdt_num);
	
}


