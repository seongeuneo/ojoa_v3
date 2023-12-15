package com.ojo.ojoa.repository;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ojo.ojoa.DTO.OrdersResDTO;
import com.ojo.ojoa.entity.Orders;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Integer> {
	
	// Orders 엔티티의 필드를 OrdersDTO로 변환하여 조회하는 쿼리 메서드 추가
//    @Query("SELECT new com.ojo.ojoa.DTO.OrdersDTO(o.orders_num, o.id, o.orders_indate, o.orders_totalprice, "
//    		+ "o.orders_price, o.orders_method, o.orders_addresscheck, o.shipping_name, o.shipping_zipcode, "
//    		+ "o.shipping_address, o.shipping_addressdetail, o.shipping_phone) FROM Orders o")
//    List<Orders> findAllOrdersList();
	
	
    // findNonMemberOrder : 비회원 주문 상세정보 검색하는 메서드
    // 조건 : ordersdt_num , password
	// Orders, OrdersDetail, Product 내용을 조합하여 주문정보 표현
	@Query("SELECT new com.ojo.ojoa.DTO.OrdersResDTO$OrderNonMemberDTO(o.orders_num_confirm, o.orders_indate, o.orders_totalprice, o.orders_price, o.orders_method, o.buyer, o.post_number, o.address1, o.address2, o.phone1, o.phone2, o.phone3, o.email1, o.email2, o.message, "
			+ "od.ordersdt_num, od.orders_num, od.prod_num, od.quantity, od.ordersdt_shippingfee, od.ordersdt_totalprice, od.ordersdt_result, "
			+ "p.prod_content, p.prod_name, p.prod_mainimage) "
			+ "FROM OrdersDetail od LEFT JOIN FETCH Orders o ON od.orders_num = o.orders_num LEFT JOIN FETCH Product p ON od.prod_num = p.prod_num "
			+ "WHERE o.orders_num_confirm = :ordersdt_num AND o.orders_password = :password "
			+ "ORDER BY o.orders_indate DESC")
	List<OrdersResDTO.OrderNonMemberDTO> findNonMemberOrder(
			@Param("ordersdt_num") String ordersdt_num,
	    	@Param("password") String password);
	
	// findOrderList : 여러 조건에 따라 주문 목록을 검색하는데 사용
	// 조건 : loginID, startDate, endDate, orderNumber
	@Query("SELECT new com.ojo.ojoa.DTO.OrdersResDTO$OrderNonMemberDTO(o.orders_num_confirm, o.orders_indate, o.orders_totalprice, o.orders_price, o.orders_method, o.buyer, o.post_number, o.address1, o.address2, o.phone1, o.phone2, o.phone3, o.email1, o.email2, o.message, "
			+ "od.ordersdt_num, od.orders_num, od.prod_num, od.quantity, od.ordersdt_shippingfee, od.ordersdt_totalprice, od.ordersdt_result, "
			+ "p.prod_content, p.prod_name, p.prod_mainimage) "
			+ "FROM OrdersDetail od LEFT JOIN FETCH Orders o ON od.orders_num = o.orders_num LEFT JOIN FETCH Product p ON od.prod_num = p.prod_num "
			+ "WHERE (:loginID IS NULL OR :loginID = '' OR o.id = :loginID) "
			+ "AND (:startDate IS NULL OR o.orders_indate >= :startDate) "
			+ "AND (:endDate IS NULL OR o.orders_indate <= :endDate) "
			+ "AND (:orderNumber IS NULL OR :orderNumber = '' OR o.orders_num_confirm = :orderNumber) "
			+ "ORDER BY o.orders_indate DESC")
	List<OrdersResDTO.OrderNonMemberDTO> findOrderList(
			@Param("loginID") String loginID,
			@Param("startDate") LocalDateTime startDate,
	    	@Param("endDate") LocalDateTime endDate,
	    	@Param("orderNumber") String orderNumber);
	
	// 페이지네이션
		@Transactional
		@Query("Select o from Orders o order by o.orders_indate desc")
		Page<Orders> getOrdersList(Pageable pageable);
    
}

	