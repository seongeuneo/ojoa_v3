package com.ojo.ojoa.controller;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ojo.ojoa.entity.Cart;
import com.ojo.ojoa.entity.Product;
import com.ojo.ojoa.service.CartService;
import com.ojo.ojoa.service.ProductService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;


@AllArgsConstructor
@Controller
@Log4j2
@RequestMapping("/cart")
public class CartController {
	
	//ProductService productService;
    CartService cartService;


// ** Cart List - 회원별 카트 목록 반환 
    
// ** Cart+Product Join List
    @GetMapping("/cartList")
    public void cartList(Model model) {
    	model.addAttribute("mycart", cartService.findCartProd());
    }



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



//==========================================


// 상품 목록에서 장바구니 담기 버튼 눌렀을 때 상품을 장바구니에 추가하는 메서드
// ** Add Cart - 장바구니에 상품 추가
	
	@GetMapping("/addCart")
    public ResponseEntity<String> addCart(HttpSession session, Cart entity, RedirectAttributes rttr) {
    	
    	String loginID = (String)session.getAttribute("loginID");
    	try {
    		if (loginID == null) {
    			throw new Exception("loginID isNull");
    		}
 		
            entity.setId(loginID);
    		cartService.save(entity); // 상품을 장바구니에 추가하는 서비스 메서드 호출
            return ResponseEntity.ok("상품이 장바구니에 추가되었습니다.");
        } catch (Exception e) {
        	System.out.println("addCart exeption " + e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("상품 추가 중 오류 발생");
        }
	}
	

} //class

