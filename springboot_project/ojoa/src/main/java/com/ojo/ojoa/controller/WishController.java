package com.ojo.ojoa.controller;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

	// ** Product List - 회원별 관심상품 목록 반환 
    @GetMapping("/wishlist")
    public void wishList(Model model) {
    	model.addAttribute("mywish", wishService.findWishProd());
    } // wishlist
    
    @PostMapping(value = "/addWish")
    public ResponseEntity<String> addWish(@RequestParam("prod_num") int prod_num, int wish_num, HttpSession session, RedirectAttributes rttr) {
        String loginID = (String) session.getAttribute("loginID");
        try {
            if (loginID == null) {
                throw new Exception("loginID isNull");
            }
            
            Wish wish = new Wish();
            wish.setId(loginID);
            wish.setProd_num(prod_num); // content.prod_num 값을 설정
            wish.setWish_num(wish_num);
            
            wishService.save(wish); // 상품을 관심목록에 추가하는 서비스 메서드 호출
            return ResponseEntity.ok("상품이 관심목록에 추가되었습니다.");
        } catch (Exception e) {
            System.out.println("addWish exception " + e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("상품 추가 중 오류 발생");
        }
    }


    
    @DeleteMapping(value = "/wdelete/{wish_num}")
    public String wdelete(@PathVariable("wish_num") int wish_num, HttpSession session, RedirectAttributes rttr) {

        String uri = "redirect:/wish/wishlist";

        try {
            log.info("** cancel 성공  => " + wishService.delete(wish_num));
            rttr.addFlashAttribute("message", "~ 관심상품 제거 성공!! ~~");
            if (((String) session.getAttribute("loginID")).equals("admin")) {
                // => 관리자에 의한 강제 주문취소 : orderList.jsp
                uri = "redirect:wishlist";
            } else {
                // => 본인삭제 : home.jsp, session 무효화 -> ??????????
                session.invalidate();
            }
        } catch (Exception e) {
            log.info("** delete Exception => " + e.toString());
            rttr.addFlashAttribute("message", "~~ 취소 실패 ~~");
        }

        return uri;
    }
}
