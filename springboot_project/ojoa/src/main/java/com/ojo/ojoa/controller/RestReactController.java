package com.ojo.ojoa.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ojo.ojoa.DTO.CartDTO;
import com.ojo.ojoa.DTO.OrdersResDTO;
import com.ojo.ojoa.DTO.QnaDTO;
import com.ojo.ojoa.domain.Prod_imageDTO;
import com.ojo.ojoa.domain.WishDTO;
import com.ojo.ojoa.entity.Cart;
import com.ojo.ojoa.entity.CartId;
import com.ojo.ojoa.entity.Qna;
import com.ojo.ojoa.entity.Wish;
import com.ojo.ojoa.repository.WishRepository;
import com.ojo.ojoa.service.CartService;
import com.ojo.ojoa.service.OrdersService;
import com.ojo.ojoa.service.Prod_imageService;
import com.ojo.ojoa.service.QnaService;
import com.ojo.ojoa.service.WishService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor
@RestController
@Log4j2
@RequestMapping("/api")
public class RestReactController {

	QnaService qnaService;
	CartService cartService;
	WishService wishService;
	Prod_imageService prod_imageService;
	private final WishRepository wishRepository;
	OrdersService ordersService;

//======================= 관심상품 새로운 코드 추가(성은) ==============================	
	// 관심상품
	@PostMapping("wish/allWishList")
	public ResponseEntity<List<WishDTO>> getAllWishList() {

		List<WishDTO> wishList = wishService.selectAllList();
		return ResponseEntity.ok(wishList);
	}

	// 괌심상품에 상품 추가
	@PostMapping("wish/saveWish")
	public ResponseEntity<?> saveWish(HttpSession session, @RequestBody Wish entity) {
		try {
			String id = (String) session.getAttribute("loginID");
			if (id != null && !id.isEmpty()) {
				// 세션에서 가져온 로그인된 사용자의 ID를 이용하여 entity의 ID를 설정합니다
				entity.setId(id);
			} else {
				// 로그인되지 않은 경우 처리
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
			}
			// 이미 존재하는지 확인
			boolean exists = wishRepository.existsByProdNum(entity.getProd_num());

			// 이미 존재한다면 에러 처리
			if (exists) {
				return ResponseEntity.badRequest().body("이미 존재하는 상품입니다.");
			}

			// 존재하지 않으면 저장
			wishService.save(entity);
			System.out.println("saveCart111111" + entity);
			System.out.println("saveCart22222222" + entity);
			return ResponseEntity.ok("데이터 저장 성공");
		} catch (Exception e) {
			log.error("데이터 저장 중 에러: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("데이터 저장 실패");
		}
	}

	// 관심상품 삭제
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

//======================= prod_image 테이블 새로운 코드 추가(성은) ==============================	
// prod_image 테이블 리스트
	@GetMapping("prod_image/allProd_imageList")
	public ResponseEntity<List<Prod_imageDTO>> getAllProd_imageList() {
		List<Prod_imageDTO> prod_imageList = prod_imageService.selectAllList();
		return ResponseEntity.ok(prod_imageList);
	}

//============================================================================================================	
	// 장바구니
	@GetMapping("cart/allCartList")
	public ResponseEntity<List<CartDTO>> getAllCartList(@RequestParam String loginID) {
		List<CartDTO> cartList = cartService.selectAllList(loginID);
		return ResponseEntity.ok(cartList);
	}

	@PostMapping("cart/saveCart")
	public ResponseEntity<?> saveCart(@RequestBody Cart entity, HttpSession session) {
		try {
			String id = (String) session.getAttribute("loginID");
			if (id != null && !id.isEmpty()) {
				// 세션에서 가져온 로그인된 사용자의 ID를 이용하여 entity의 ID를 설정합니다
				entity.setId(id);
				cartService.CartUpdateUp(id, entity.getProd_num(), entity.getQuantity());
				return ResponseEntity.ok("데이터 저장 성공");
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("사용자 인증되지 않음");
			}
		} catch (Exception e) {
			log.error("데이터 저장 중 에러: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("데이터 저장 실패");
		}
	}

//============================================================================================
// 장바구니 상품 수량 변경

	// => DUPLICATE KEY UPDATE
	// 없으면 Save 있으면 Update
	@PostMapping("/cartUp")
	public void cartUp(@RequestBody Cart entity, HttpSession session) {
		try {
			String id = (String) session.getAttribute("loginID");
			if (id != null && !id.isEmpty()) {
				// 세션에서 가져온 로그인된 사용자의 ID를 이용하여 entity의 ID를 설정합니다
				entity.setId(id);
				cartService.CartUpdateUp(id, entity.getProd_num(), entity.getQuantity());
			}
		} catch (Exception e) {
			log.error("Exception: {}", e.getMessage());
		}
	}

	@PostMapping("/cartDown")
	public void cartDown(@RequestBody Cart entity, HttpSession session) {
		try {
			// HttpSession에서 현재 로그인된 사용자의 ID를 가져옵니다.
			String id = (String) session.getAttribute("loginID");
			// cartService.CartUpdateDown 메서드를 호출할 때 실제 로그인된 사용자의 ID를 사용합니다.
			cartService.CartUpdateDown(id, entity.getProd_num(), entity.getQuantity());
		} catch (Exception e) {
			log.info("Exception");
		}
	}

// 장바구니에 있는 상품 삭제

//===============================================================================
	@DeleteMapping("/cdelete")
	public void cdelete(@RequestParam String user_id, @RequestParam String prod_num, CartId cartid) {
		log.info("****************" + user_id + prod_num);
		int prod_num_ = Integer.parseInt(prod_num);
		cartid.setId(user_id);
		cartid.setProd_num(prod_num_);
		log.info("++++++++++++++++++++++++++++++" + user_id + prod_num_);
		try {
			cartService.delete(cartid);
			System.out.println("** cart delete 삭제성공 **");
		} catch (Exception e) {
			System.out.println("** cart delete Exception => " + e.toString());
		}
	}

//===============================================================================		
	// 게시판 QnA
	// "/qna/allQnaList"의 엔드포인트로의 GET요청에 대해 react에서로부터 넘겨받은 파라미터들을 이용해
	// qna데이터를 조회하고, 그 결과를 응답으로 반환하는 역할
	@GetMapping("qna/allQnaList")
	// "/qna/allQnaList"경로에 대한 HTTP GET요청을 처리함
	public ResponseEntity<?> getAllQnaList(
			// ResponseEntity를 반환
			// ResponseEntity는 <List<QnaDTO.QnaMainListDTO>타입의 데이터를 담고있다.
			// 그래서 QnaMainListDTO 객체들의 리스트를 반환함
			@RequestParam(required = false) String board_category,
			// (required = false) -> 값이없어도 호출
			@RequestParam(required = false) String search_date, @RequestParam(required = false) String search_key,
			@RequestParam(required = false) String search_query, HttpSession session) {
		String id = (String) session.getAttribute("loginID");
		try {
			List<QnaDTO.QnaMainListDTO> qnaList = qnaService.selectAllList(board_category, search_date, search_key,
					search_query);
			// qnaService의 'selectAllList' 메서드를 호출해서 조회하고 'qnaList'에 저장

			// QNA 에서 작성자만, 관리자만 클릭 시 조회되게
			qnaList = qnaList.stream().map(item -> {
				// 작성자 본인
				if (item.getId().equals(id)) {
					item.setReadable(true);
				}
				// 관리자
				if (id.equals("admin")) {
					item.setReadable(true);
				}
				// 공지사항
				if (item.getQna_category().equals("공지사항")) {
					item.setReadable(true);
				}
				return item;
			}).collect(Collectors.toList());
			return ResponseEntity.ok(qnaList);
			// 조회된 데이터를 ResponseEntity.ok 메서드를 사용해서 200 ok 상태코드와 함께 응답으로 반환
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("데이터 저장 실패");
		}
	}

//		 // 게시판 QnA - 게시글 등록
	@PostMapping("qna/saveQna")
	public ResponseEntity<String> saveQna(@RequestBody Qna entity) {
		try {
			System.out.println("111111" + entity);
			// QnaDTO를 Qna 엔티티로 변환하여 저장하거나 필요한 로직 수행
			qnaService.save(entity); // QnaService를 통해 엔티티를 저장합니다.
			System.out.println("22222222" + entity);
			return ResponseEntity.ok("데이터 저장 성공");
		} catch (Exception e) {
			log.error("데이터 저장 중 에러: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("데이터 저장 실패");
		}
	}

//	@GetMapping("qna/selectQnaList")
//	public ResponseEntity<?> selectQnaList(HttpSession session, int qna_seq) {
//		try {
//			String loginID = (String) session.getAttribute("loginID");
//
//			if (loginID == null) {
//				loginID = "admin";
//			}
//			QnaDTO.QnaItemResDTO qnaItem = qnaService.selectOneById(loginID, qna_seq);
//			return ResponseEntity.ok(qnaItem);
//		} catch (Exception e) {
//			log.error("데이터 조회 중 에러: {}", e.getMessage());
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("데이터 조회 실패");
//		}
//	}

//	@PostMapping("qna/updateQna")
//	public ResponseEntity<String> updateQna(HttpSession session, @RequestBody Qna entity) {
//		try {
//			System.out.println("111111" + entity);
//			qnaService.update(entity); // QnaService를 통해 엔티티를 저장합니다.
//			System.out.println("22222222" + entity);
//			return ResponseEntity.ok("데이터 갱신 성공");
//		} catch (Exception e) {
//			log.error("데이터 갱신 중 에러: {}", e.getMessage());
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("데이터 갱신 실패");
//		}
//	}

//===========================================================================    

	// 주문목록
	@GetMapping("order/orderList")
	public ResponseEntity<?> getOrderList(HttpSession session, @RequestParam(required = false) String startDate,
			@RequestParam(required = false) String endDate, @RequestParam(required = false) String orderNumber) {

		log.info("startDate : " + startDate);
		try {
			String loginID = (String) session.getAttribute("loginID");
			List<OrdersResDTO> result = ordersService.selectOrderList(loginID, startDate, endDate, orderNumber);

			log.info("result : " + result);
			return ResponseEntity.ok(result);
		} catch (Exception e) {
			log.error("데이터 저장 중 에러: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("데이터 저장 실패");
		}
	}

}