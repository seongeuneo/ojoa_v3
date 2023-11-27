package com.ojo.ojoa.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ojo.ojoa.entity.Product;
import com.ojo.ojoa.service.ProductService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;



@AllArgsConstructor
@Controller
@Log4j2
@RequestMapping("/product")
public class ProductController {

	ProductService productService;


// ** Product List - 회원별 카트 목록 반환 
//    @GetMapping("/productList")
//    public void productsList(Model model) {
//    	model.addAttribute("myprod", productService.selectList());
//    } // productList



	// ** Product Delete - 장바구니 삭제
	@GetMapping(value="/pdelete")
	public String cdelete(HttpSession session, Product entity, RedirectAttributes rttr) {
		
		String uri = "redirect:/product/productList";
		
		try {
			log.info("** delete 성공  => "+productService.delete(entity.getProd_num()));
			rttr.addFlashAttribute("message", "제품삭제 성공!!") ;	
			if ( ((String)session.getAttribute("loginID")).equals("admin") ) {
				// => 관리자에 의한 강제삭제 : productsList.jsp
				uri="redirect:productList";
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