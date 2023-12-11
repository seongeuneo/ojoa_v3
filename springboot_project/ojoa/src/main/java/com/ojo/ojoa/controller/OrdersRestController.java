package com.ojo.ojoa.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ojo.ojoa.DTO.OrdersDTO;
import com.ojo.ojoa.entity.Orders;
import com.ojo.ojoa.service.OrdersService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor
@RestController
@Log4j2
@RequestMapping("/api") 
public class OrdersRestController {

	OrdersService ordersService;
	
	@GetMapping("orders/allOrdersList")
    public ResponseEntity<List<OrdersDTO>> getAllOrdersList() {
		List<OrdersDTO> ordersList = ordersService.selectAllList();
    	return ResponseEntity.ok(ordersList);
    }


    // 결제하기 작업을 위한 메서드 추가
    @PostMapping("/orders/saveOrders")
    public ResponseEntity<String> saveOrders(@RequestBody Orders entity) {
        try {
            // OrdersDTO 데이터를 이용하여 Orders 테이블에 저장하는 로직을 추가
            // ordersService.save(ordersDTO) 등의 코드 작성
        	ordersService.save(entity);
        	
        	//Ordersdetail 도 저장해야함!!!
        	//주문품목은 Cart 목록에서 삭제 코드 넣기!!
        	
            return ResponseEntity.ok("상품이 결제되었습니다.");
        } catch (Exception e) {
            log.error("Error while processing Pay API: " + e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("상품 결제 중 오류 발생");
        }
    }
	
	
}
