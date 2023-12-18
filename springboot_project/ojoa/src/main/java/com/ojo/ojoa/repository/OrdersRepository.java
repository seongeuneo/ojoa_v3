package com.ojo.ojoa.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ojo.ojoa.DTO.OrdersDTO;
import com.ojo.ojoa.DTO.OrdersResDTO;
import com.ojo.ojoa.entity.Orders;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Integer> {

	// Orders 엔티티의 필드를 OrdersDTO로 변환하여 조회하는 쿼리 메서드 추가
	@Query("SELECT new com.ojo.ojoa.DTO.OrdersDTO(o.orders_num, o.id, o.orders_indate, o.orders_totalprice, "
			+ "o.orders_price, o.orders_method, o.orders_addresscheck, o.shipping_name, o.shipping_zipcode, "
			+ "o.shipping_address, o.shipping_addressdetail, o.shipping_phone, o.shipping_message) FROM Orders o")
	List<OrdersDTO> findAllOrdersList();

	// 주문정보 조회
	@Query("SELECT new com.ojo.ojoa.DTO.OrdersResDTO("
			+ "o.orders_num, o.id, o.orders_indate, o.orders_totalprice, o.orders_price, "
			+ "o.orders_method, o.orders_addresscheck, o.shipping_name, o.shipping_zipcode, "
			+ "o.shipping_address, o.shipping_addressdetail, o.shipping_phone, o.shipping_message, "
			+ "od.ordersdt_num, od.prod_num, od.quantity, od.ordersdt_shippingfee, od.ordersdt_totalprice, od.ordersdt_result, "
			+ "p.prod_name, p.prod_kind, p.prod_discount, p.prod_price1, p.prod_content, "
			+ "p.prod_mainimage, p.prod_sellyn, p.prod_regdate, p.prod_stock, p.prod_grade) " + "FROM Orders o "
			+ "LEFT JOIN OrdersDetail od ON o.orders_num = od.orders_num "
			+ "LEFT JOIN Product p ON od.prod_num = p.prod_num " + "WHERE (:loginID IS NULL OR o.id = :loginID) "
			+ "AND (:startDate IS NULL OR o.orders_indate >= :startDate) "
			+ "AND (:endDate IS NULL OR o.orders_indate <= :endDate)")
	List<OrdersResDTO> findOrderList(@Param("loginID") String loginID, @Param("startDate") LocalDateTime startDate,
			@Param("endDate") LocalDateTime endDate);

}
