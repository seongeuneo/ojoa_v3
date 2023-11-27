package com.ojo.ojoa.service;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.entity.Orders;

@Service
@Transactional
public interface OrdersService {

	// ** selectList
	List<Orders> selectList();

	// ** selectOne
	Orders selectOne(int order_num);

	// ** insert, update
	String save(Orders entity);

	// ** cancel
	int delete(int order_num);
    
    
}