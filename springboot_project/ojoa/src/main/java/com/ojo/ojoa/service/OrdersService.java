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
	public List<Orders> selectList();

	// ** selectOne
	public Orders selectOne(int orders_num);

	// ** save : insert, update
	public String save(Orders entity);
		
	// ** delete
	public int delete(int orders_num);
	
	// ** react selectAllList
//		List<OrdersDTO> selectAllList();
    
    
}