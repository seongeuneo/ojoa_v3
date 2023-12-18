package com.ojo.ojoa.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ojo.ojoa.DTO.OrdersDTO;
import com.ojo.ojoa.DTO.OrdersReqDTO;
import com.ojo.ojoa.entity.Orders;
import com.ojo.ojoa.entity.OrdersDetail;
import com.ojo.ojoa.service.CartService;
import com.ojo.ojoa.service.OrdersDetailService;
import com.ojo.ojoa.service.OrdersService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor
@RestController
@Log4j2
@RequestMapping("/api")
public class OrdersRestController {

	CartService cartService;
	OrdersService ordersService;
	OrdersDetailService ordersDetailService;

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
			Integer orders_num = ordersService.save(entity);
			return ResponseEntity.ok(orders_num.toString());
		} catch (Exception e) {
			log.error("Error while processing Pay API: " + e.toString());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("상품 결제 중 오류 발생");
		}
	}

	// 주문 완료 후, 주문 상세 등록
	@PostMapping("/orders/saveOrdersDetail")
	public ResponseEntity<String> saveOrdersDetail(@RequestBody OrdersReqDTO ordersReqDTO) {
		log.info("saveOrdersDetail :::");
		List<OrdersDetail> displayedCartList = ordersReqDTO.getDisplayedCartList();

		try {
			if (displayedCartList != null)
				for (OrdersDetail orderDetail : displayedCartList) {
					log.info("orderDetail : " + orderDetail.toString());
					int result = ordersDetailService.save(orderDetail);
				}
			log.info("상품 상세 정보가 등록되었습니다.");
			return ResponseEntity.ok("상품 상세 내역이 등록되었습니다.");
		} catch (Exception e) {
			log.error("Error while processing Pay API: " + e.toString());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("상품 결제 중 오류 발생");
		}
	}

	// 주문 완료 후, 주문한 장바구니 내역 삭제
	@PostMapping("/orders/deleteCarts")
	public ResponseEntity<String> deleteCarts(@RequestBody OrdersReqDTO ordersReqDTO, HttpSession session) {
		log.info("deleteCarts :::");
		List<OrdersDetail> displayedCartList = ordersReqDTO.getDisplayedCartList();

		try {
			String loginID = (String) session.getAttribute("loginID");
			log.info("loginID : " + loginID);
			if (displayedCartList != null)
				for (OrdersDetail orderDetail : displayedCartList) {
					log.info("orderDetail : " + orderDetail.toString());
					log.info("prod_num : " + orderDetail.getProd_num());
					int prod_num = orderDetail.getProd_num();
					cartService.deleteCartByUserIdAndProdNum(loginID, prod_num);
				}
			log.info("주문한 장바구니 내역을 삭제하였습니다.");
			return ResponseEntity.ok("주문한 장바구니 내역을 삭제하였습니다.");
		} catch (Exception e) {
			log.error("Error while processing Pay API: " + e.toString());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문한 장바구니 내역을 삭제 중 오류 발생");
		}
	}

	// 주문 취소
//	@DeleteMapping("/orders/deleteOrdersDetail/{ordersdt_num}")
//	public ResponseEntity<String> deleteCarts(@PathVariable int ordersdt_num) {
//		log.info("deleteCarts :::");
//		log.info("ordersdt_num : " + ordersdt_num);
//		try {
//			ordersDetailService.delete(ordersdt_num);
//			log.info("주문 내역을 삭제하였습니다.");
//			return ResponseEntity.ok("주문 내역을 삭제하였습니다.");
//		} catch (Exception e) {
//			log.error("Error while processing Pay API: " + e.toString());
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 내역을 삭제 중 오류 발생");
//		}
//	}

}
