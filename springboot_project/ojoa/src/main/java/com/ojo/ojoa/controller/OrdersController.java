package com.ojo.ojoa.controller;

import javax.servlet.http.HttpSession;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ojo.ojoa.entity.Member;
import com.ojo.ojoa.entity.Orders;
import com.ojo.ojoa.entity.OrdersDetail;
import com.ojo.ojoa.service.OrdersDetailService;
import com.ojo.ojoa.service.OrdersService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;


@AllArgsConstructor
@Controller
@Log4j2
@RequestMapping("/orders")
public class OrdersController {

    OrdersService ordersService;
    OrdersDetailService ordersdtService;

// ** Orders List - 회원별 주문목록
    @GetMapping("/ordersList")
    public void ordersList(@RequestParam(name = "category", defaultValue = "") String category,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "5") int size,
            Model model) {
    	Pageable pageable = PageRequest.of(page, size);
	       Page<Orders> ordersList = ordersService.getOrdersList(pageable);

	       model.addAttribute("myorders", ordersList.getContent());
	       model.addAttribute("itemPage", ordersList);
	       model.addAttribute("currentPage", ordersList.getNumber());
	       model.addAttribute("totalPages", ordersList.getTotalPages());
	       model.addAttribute("totalItems", ordersList.getTotalElements());
	       
	      log.info("ordersService.getFaqList(category, pageable) : " + ordersService.getOrdersList(pageable));
	      log.info("ordersList.getContent() : " + ordersList.getContent());
	      log.info("ordersList : " + ordersList);
	      log.info("ordersList.getNumber() : " + ordersList.getNumber());
	      log.info("ordersList.getTotalElements() : " + ordersList.getTotalElements());
    	
    } // ordersList



	// ** Order Cancel - 주문 취소
	@DeleteMapping(value="/odelete/{orders_num}") // odelete => 주문취소
	public  ResponseEntity<?> odelete(@PathVariable("orders_num") int orders_num, HttpSession session, Orders entity) {
		entity.setOrders_num(orders_num);
		
		try {
			log.info("** 주문삭제 성공  => "+ordersService.delete(orders_num));
			if ( ((String)session.getAttribute("loginID")).equals("admin") ) {
				// => 관리자에 의한 강제 주문취소 : orderList.jsp
			}else {
				// => 본인삭제 : home.jsp, session 무효화 -> ??????????
				session.invalidate();
			}
			return new ResponseEntity<String>("삭제 성공", HttpStatus.OK);   
		} catch (Exception e) {
			log.info("** delete Exception => "+e.toString());
			return new ResponseEntity<String>("주문삭제 실패, Data_Notfound", HttpStatus.BAD_GATEWAY);
		}
	} 

//=====================================================


// ** pay - 장바구니에 있는 상품 결제하기
		
		@GetMapping("/payNow")
	    public ResponseEntity<String> payNow(HttpSession session, Orders entity, RedirectAttributes rttr) {
	    	
	    	String loginID = (String)session.getAttribute("loginID");
	    	try {
	    		if (loginID == null) {
	    			throw new Exception("loginID isNull");
	    		}
	 		
	            entity.setId(loginID);
	    		ordersService.save(entity); // 상품을 장바구니에 추가하는 서비스 메서드 호출
	            return ResponseEntity.ok("상품이 결제되었습니다.");
	        } catch (Exception e) {
	        	System.out.println("payNow exeption " + e.toString());
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("상품 결제 중 오류 발생");
	        }
		}
	
	

//=====================  Orders Detail  =======================

// 주문 상세 정보 - 주문 상세 정보 검색 및 표시

// ** OrdersDetail		
// 주문 상세 정보 조회
	    @GetMapping(value="/ordersdt")
	    public String ordersDetail(OrdersDetail ordersdt, Model model) {
	        model.addAttribute("ordersdt", ordersdtService.selectList(ordersdt.getOrders_num()));
	        return "orders/ordersDetail"; // ordersDetail.jsp로 반환
	    }

// 성으니꺼 참고하기	--------------------------------------
		// 상품 상세 정보 조회
//	    @GetMapping("/ordersDetail")
//	    public String ordersDetail(@RequestParam("orders_num") String ordersNum, Model model) {
//	        
//	    	OrdersDetail ordersdt = ordersdtService.selectOne(ordersNum);
//	        // 상품 세부 정보를 모델에 추가
//	    	 model.addAttribute("ordersdt", ordersdt);
//		        return "orders/ordersDetail"; // ordersDetail.jsp로 반환
//		    }
	    
}
