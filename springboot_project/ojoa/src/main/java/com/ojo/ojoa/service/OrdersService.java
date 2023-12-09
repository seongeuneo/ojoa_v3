package com.ojo.ojoa.service;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.DTO.OrdersDTO;
import com.ojo.ojoa.entity.Member;
import com.ojo.ojoa.entity.Orders;

@Service
@Transactional
public interface OrdersService {

	// ** selectList
	List<Orders> selectList();

	// ** selectOne
	Orders selectOne(int orders_num);

	// ** save : insert, update
	String save(Orders entity);
		
	// ** delete
	int delete(int orders_num);
	
	// ** react selectAllList
	List<OrdersDTO> selectAllList();
    
    
}