package com.ojo.ojoa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ojo.ojoa.entity.OrdersDetail;

@Repository
public interface OrdersDetailRepository 
extends JpaRepository<OrdersDetail, Integer> {

	 @Query( nativeQuery=true,
			 value= " select * from orders_detail where orders_num = :orders_num")
	 List<OrdersDetail>  findDetailList(@Param("orders_num") int orders_num);
	
    // 추가적인 주문과 관련된 쿼리 메서드들을 정의할 수 있어요.
}