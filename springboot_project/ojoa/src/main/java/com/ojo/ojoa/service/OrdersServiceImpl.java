package com.ojo.ojoa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ojo.ojoa.entity.Orders;
import com.ojo.ojoa.repository.OrdersRepository;

import lombok.RequiredArgsConstructor;

//@Log4j2
@Service
@RequiredArgsConstructor 
public class OrdersServiceImpl implements OrdersService {

    private final OrdersRepository ordersRepository;

 // ** selectList
 	@Override
 	public List<Orders> selectList() {
 		return ordersRepository.findAll();
 	}
 	
 	// ** selectOne
 	@Override
 	public Orders selectOne(int order_num) {
 		Optional<Orders> result = ordersRepository.findById(order_num);
     	if ( result.isPresent() ) return result.get();
     	else return null;
 	}

 	// ** insert, update
 	@Override
 	public String save(Orders entity) {
 		ordersRepository.save(entity); // 저장 또는 수정
         return entity.getId();   // 저장후 key return
 	}
 	 
 	// ** cancel
 	@Override
 	public int delete(int order_num) {
 		ordersRepository.deleteById(order_num);
 		return order_num ; // 삭제후 key return
 	}
 	
 } //class
