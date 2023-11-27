package com.ojo.ojoa.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ojo.ojoa.entity.Cart;
import com.ojo.ojoa.service.CartService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;


@AllArgsConstructor
@Controller
@Log4j2
@RequestMapping("/cart")
public class CartController {

    CartService cartService;


// ** Cart List - 회원별 카트 목록 반환 
    @GetMapping("/cartList")
    public void cartList(Model model) {
    	model.addAttribute("mycart", cartService.selectList());
    } // cartList



	// ** Cart Delete - 장바구니 삭제
	@GetMapping(value="/cdelete")
	public String cdelete(HttpSession session, Cart entity, RedirectAttributes rttr) {
		
		String uri = "redirect:/cart/cartList";
		
		try {
			log.info("** delete 성공  => "+cartService.delete(entity.getCart_num()));
			rttr.addFlashAttribute("message", "~~ 카트삭제 성공!! ~~") ;	
			if ( ((String)session.getAttribute("loginID")).equals("admin") ) {
				// => 관리자에 의한 강제삭제 : cartList.jsp
				uri="redirect:cartList";
			}else {
				// => 본인삭제 : home.jsp, session 무효화 
				session.invalidate();
			}
		} catch (Exception e) {
			log.info("** delete Exception => "+e.toString());
			rttr.addFlashAttribute("message", "~~ 삭제 실패 ~~");
		}
		
		return uri;
	} // cdelete
}


//==========================================





//// ** Cart Detail - 여기에 뭐하까~(클릭하면 뭐나올지 생각해보기~)

//@GetMapping(value ="/cartdetail")
//public String mdetail(HttpServletRequest request, Model model, Member entity) {
//	model.addAttribute("apple", service.selectOne(entity.getId()));
//	
//	if ( "U".equals(request.getParameter("jCode")) )
//		 return "member/memberUpdate";
//	else return "member/memberDetail";
//	
//} // cartdetail