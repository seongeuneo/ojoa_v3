package com.ojo.ojoa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ojo.ojoa.entity.OrdersDetail;
import com.ojo.ojoa.entity.Product;
import com.ojo.ojoa.repository.OrdersDetailRepository;

import lombok.RequiredArgsConstructor;

//@Log4j2
@Service
@RequiredArgsConstructor 
public class OrdersDetailServiceImpl implements OrdersDetailService {


    private final OrdersDetailRepository ordersdetailRepository;


 // ** selectList
 	@Override
 	public List<OrdersDetail> selectList(int orders_num) {
 		return ordersdetailRepository.findDetailList(orders_num);
 	}
 	
 	// ** selectOne
 	@Override
 	public OrdersDetail selectOne(int ordersdt_num) {
 		Optional<OrdersDetail> result = ordersdetailRepository.findById(ordersdt_num);
     	if ( result.isPresent() ) return result.get();
     	else return null;
 	}

 	// ** insert, update
 	@Override
 	public int save(OrdersDetail entity) {
 		ordersdetailRepository.save(entity); // 저장 또는 수정
         return entity.getOrdersdt_num();   // 저장후 key return
 	}
 	  	
 	
 	// ** cancel
 	@Override
 	public int delete(int ordersdt_num) {
 		ordersdetailRepository.deleteById(ordersdt_num);
 		return ordersdt_num ; // 삭제후 key return
 	}

 } //class

