package com.ojo.ojoa.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ojo.ojoa.DTO.CartDTO;
import com.ojo.ojoa.DTO.QnaDTO;
import com.ojo.ojoa.entity.Cart;
import com.ojo.ojoa.entity.CartId;
import com.ojo.ojoa.entity.Qna;
import com.ojo.ojoa.service.CartService;
import com.ojo.ojoa.service.QnaService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor
@Controller
@RestController
@Log4j2
@RequestMapping("/api")
public class RestReactController {
	
	QnaService qnaService;
	CartService cartService;
//	MemberService memberService;
//	ProductService productService;
//	WishService wishService;
//	OrderService orderService;
	
	// 장바구니
	@GetMapping("cart/allCartList")
    public ResponseEntity<List<CartDTO>> getAllCartList() {
		List<CartDTO> cartList = cartService.selectAllList();
    	//model.addAttribute("qna", test);
    	return ResponseEntity.ok(cartList);
    }
	
//======================= 새로운 코드 추가 ==============================	
// 장바구니에 상품 추가

	@PostMapping("cart/saveCart")
    public ResponseEntity<?> saveCart(@RequestBody Cart entity) {
        // 로그인 아이디는 추후 Session 에서 꺼내서 사용한다. 일단 임의로 함
		entity.setId("admin");
		
		try {
        	System.out.println("saveCart111111"+entity);
        	// QnaDTO를 Qna 엔티티로 변환하여 저장하거나 필요한 로직 수행
            cartService.save(entity); // QnaService를 통해 엔티티를 저장합니다.
            System.out.println("saveCart22222222"+entity);
            return ResponseEntity.ok("데이터 저장 성공");
        } catch (Exception e) {
            log.error("데이터 저장 중 에러: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("데이터 저장 실패");
        }
    }


	
// 장바구니에 있는 상품 삭제

//	@DeleteMapping("cdelete/{prod_num}")
//	public String cdelete(@PathVariable("prod_num") int prod_num, HttpSession session, RedirectAttributes rttr) {
//
//		String uri = "redirect:/cart/cartList";
//
//		try {
//			log.info("** cancel 성공  => " + cartService.delete(prod_num));
//			rttr.addFlashAttribute("message", "~ 장바구니 상품 제거 성공!! ~~");
//			if (((String) session.getAttribute("loginID")).equals("admin")) {
//				// => 관리자에 의한 강제 주문취소 : orderList.jsp
//				uri = "redirect:cartList";
//			} else {
//				session.invalidate();
//			}
//		} catch (Exception e) {
//			log.info("** delete Exception => " + e.toString());
//			rttr.addFlashAttribute("message", "~~ 취소 실패 ~~");
//		}
//
//		return uri;
//	}
	

    
// 원래 카트    
    @GetMapping("/cdelete")
    public String cdelete(CartId cartid) {
    	try {
    		cartService.delete(cartid);
    		System.out.println("** cart delete 삭제성공 **");
    	} catch (Exception e) {
    		System.out.println("** cart delete Exception => "+e.toString());
    	}
    	return "redirect:home" ;
    }
    
//===============================================================================		
	
	// 게시판 QnA 
	@GetMapping("qna/allQnaList")
    public ResponseEntity<List<QnaDTO.QnaMainListDTO>> getAllQnaList(
    		@RequestParam(required = false) String board_category,
    		@RequestParam(required = false) String search_date,
	        @RequestParam(required = false) String search_key,
	        @RequestParam(required = false) String search_query
    	        ) {
		List<QnaDTO.QnaMainListDTO> qnaList = qnaService.selectAllList(board_category, search_date, search_key, search_query);
    	return ResponseEntity.ok(qnaList);
    }
	
	 // 게시판 QnA - 게시글 등록	: 워니
    @PostMapping("qna/saveQna")
    public ResponseEntity<String> saveQna(@RequestBody Qna entity) {
        try {
        	System.out.println("111111"+entity);
        	// QnaDTO를 Qna 엔티티로 변환하여 저장하거나 필요한 로직 수행
            qnaService.save(entity); // QnaService를 통해 엔티티를 저장합니다.
            System.out.println("22222222"+entity);
            return ResponseEntity.ok("데이터 저장 성공");
        } catch (Exception e) {
            log.error("데이터 저장 중 에러: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("데이터 저장 실패");
        }
    }

}