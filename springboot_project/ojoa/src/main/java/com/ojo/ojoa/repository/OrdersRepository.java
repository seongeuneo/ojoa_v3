package com.ojo.ojoa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ojo.ojoa.DTO.OrdersDTO;
import com.ojo.ojoa.entity.Orders;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Integer> {
	
	// Orders 엔티티의 필드를 OrdersDTO로 변환하여 조회하는 쿼리 메서드 추가
    @Query("SELECT new com.ojo.ojoa.DTO.OrdersDTO(o.orders_num, o.id, o.orders_indate, o.orders_totalprice, o.orders_price, o.orders_method, o.orders_addresscheck) FROM Orders o")
    List<OrdersDTO> findAllOrdersList();
	
}
//	@Query("SELECT new com.ojo.ojoa.DTO.CheckoutDTO(A.id, A.prod_num, A.quantity, B.prod_mainimage, B.prod_name, B.prod_discount, B.prod_price1, B.prod_content) "
//			+ "FROM Checkout A LEFT JOIN Cart B ON A.prod_num=B.prod_num order by A.prod_num")
//	
//	List<OrdersDTO> findAllOrdersList();
//	