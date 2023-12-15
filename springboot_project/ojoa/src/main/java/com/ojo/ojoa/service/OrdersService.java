package com.ojo.ojoa.service;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.DTO.OrdersDTO;
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
//package com.ojo.ojoa.service;
//import java.util.List;
//
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.ojo.ojoa.DTO.OrdersReqDTO;
//import com.ojo.ojoa.DTO.OrdersResDTO;
//import com.ojo.ojoa.entity.Orders;
//
//@Service
//@Transactional
//public interface OrdersService {
//
//	// ** selectList
//	List<Orders> selectList();
//	
//	// ** 페이지네이션
//	public Page<Orders> getOrdersList(Pageable pageable);
//
//	// ** selectOne
//	Orders selectOne(int orders_num);
//	
//	// 주문상세정보,검색
//	List<OrdersResDTO.OrderNonMemberDTO> selectOneOrderNum(String ordersdt_num, String password);
//	
//	// 주문상세정보,검색
//	List<OrdersResDTO.OrderNonMemberDTO> selectOrderList(String loginID, String startDate, String endDate, String orderNumber);
//
//	// ** save : insert, update
//	String save(Orders entity);
//		
//	// ** delete
//	int delete(int orders_num);
//	
//	// ** react selectAllList
//	//List<OrdersDTO> selectAllList();
//	
//	// 주분정보 저장
//	OrdersResDTO.OrderCompleteDTO saveOrders(String loginID, OrdersReqDTO entity);
//    
//}