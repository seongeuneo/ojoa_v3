package com.ojo.ojoa.controller;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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
    public void ordersList(Model model) {
    	model.addAttribute("myorders", ordersService.selectList());
    } // ordersList



	// ** Order Cancel - 주문 취소
	@GetMapping(value="/ocancel") // ocancel => 주문취소(oredercancel)
	public String ocancel(HttpSession session, Orders entity, RedirectAttributes rttr) {
		
		String uri = "redirect:/orders/ordersList";
		
		try {
			log.info("** cancel 성공  => "+ordersService.delete(entity.getOrders_num()));
			rttr.addFlashAttribute("message", "~~ 주문취소 성공!! ~~") ;	
			if ( ((String)session.getAttribute("loginID")).equals("admin") ) {
				// => 관리자에 의한 강제 주문취소 : orderList.jsp
				uri="redirect:ordersList";
			}else {
				// => 본인삭제 : home.jsp, session 무효화 -> ??????????
				session.invalidate();
			}
		} catch (Exception e) {
			log.info("** delete Exception => "+e.toString());
			rttr.addFlashAttribute("message", "~~ 취소 실패 ~~");
		}
		
		return uri;
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
	    @GetMapping("/orders/{orderdt_num}")
	    public String ordersDetail(@PathVariable("ordersdt_num") int ordersdt_num, Model model) {
	        OrdersDetail ordersdt = ordersdtService.selectOne(ordersdt_num);
	        model.addAttribute("ordersdt", ordersdt);
	        return "orders/ordersDetail"; // ordersDetail.jsp로 반환
	    }
	
}
