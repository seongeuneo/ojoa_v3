package com.ojo.ojoa.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ojo.ojoa.DTO.OrdersDTO;
import com.ojo.ojoa.DTO.OrdersResDTO;
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
	public Orders selectOne(int orders_num) {
		Optional<Orders> result = ordersRepository.findById(orders_num);
		if (result.isPresent())
			return result.get();
		else
			return null;
	}

	// ** insert, update
	@Override
	public int save(Orders entity) {
		ordersRepository.save(entity); // 저장 또는 수정

//        return entity.getId();   // 저장후 key return
		return entity.getOrders_num(); // 저장후 key return
	}

	// ** cancel
	@Override
	public int delete(int orders_num) {
		ordersRepository.deleteById(orders_num);
		return orders_num; // 삭제후 key return
	}

	// ** react selectAllList
	@Override
	public List<OrdersDTO> selectAllList() {
		return ordersRepository.findAllOrdersList();
	}

	// 회원 : 주문정보 조회
	// loginID : 사용자ID
	// startDate : 조회시작날짜 (null일경우 제한 없음)
	// endDate : 조회종료날짜 (null일경우 제한없음)
	// orderNumber : 조회할 특정 주문번호 (null일경우 제한없음)
	@Override
	public List<OrdersResDTO> selectOrderList(String loginID, String startDate, String endDate, String orderNumber) {
		LocalDateTime tmp_startDate = null;
		LocalDateTime tmp_endDate = null;
		if (startDate != null) {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			tmp_startDate = LocalDateTime.parse(startDate + "T00:00:00");
		}

		if (endDate != null) {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			tmp_endDate = LocalDateTime.parse(endDate + "T00:00:00");
		}

		List<OrdersResDTO> result = ordersRepository.findOrderList(loginID, tmp_startDate, tmp_endDate);
		return result;
	}

} // class
