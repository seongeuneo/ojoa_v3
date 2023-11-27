package com.ojo.ojoa.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ojo.ojoa.entity.Orders;
import com.ojo.ojoa.service.OrdersService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;


@AllArgsConstructor
@Controller
@Log4j2
@RequestMapping("/orders")
public class OrdersController {

    OrdersService ordersService;


// ** Cart List - 회원별 카트 목록 반환 
    @GetMapping("/ordersList")
    public void ordersList(Model model) {
    	model.addAttribute("myorders", ordersService.selectList());
    } // cartList



	// ** Order Cancel - 주문 취소
	@GetMapping(value="/ocancel") // ocancel => 주문취소(oredercancel)
	public String ocancel(HttpSession session, Orders entity, RedirectAttributes rttr) {
		
		String uri = "redirect:/orders/ordersList";
		
		try {
			log.info("** cancel 성공  => "+ordersService.delete(entity.getOrder_num()));
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
}



