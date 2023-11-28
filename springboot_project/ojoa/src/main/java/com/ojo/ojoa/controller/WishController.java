package com.ojo.ojoa.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ojo.ojoa.entity.Wish;
import com.ojo.ojoa.service.ProductService;
import com.ojo.ojoa.service.WishService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor
@Controller
@Log4j2
@RequestMapping("/wish")
public class WishController {
	ProductService productService;
	WishService wishService;

	// ** Product List - 회원별 카트 목록 반환 
    @GetMapping("/wishlist")
    public void wishList(Model model) {
    	model.addAttribute("wish", wishService.selectList());
    } // wishlist
    
 // ** wish delete - 주문 취소
 	@GetMapping(value="/wdelete") // ocancel => 주문취소(oredercancel)
 	public String wdelete(HttpSession session, Wish entity, RedirectAttributes rttr) {
 		
 		String uri = "redirect:/wish/wishlist";
 		
 		try {
 			log.info("** cancel 성공  => " + wishService.delete(entity.getWish_num()));
 			rttr.addFlashAttribute("message", "~ 관심상품 제거 성공!! ~~") ;	
 			if ( ((String)session.getAttribute("loginID")).equals("admin") ) {
 				// => 관리자에 의한 강제 주문취소 : orderList.jsp
 				uri="redirect:wishlist";
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
