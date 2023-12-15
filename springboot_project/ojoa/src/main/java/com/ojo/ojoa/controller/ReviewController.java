package com.ojo.ojoa.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ojo.ojoa.domain.ReviewDTO;
import com.ojo.ojoa.entity.Member;
import com.ojo.ojoa.entity.Qna;
import com.ojo.ojoa.entity.Review;
import com.ojo.ojoa.entity.Wish;
import com.ojo.ojoa.service.ReviewService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor
@Controller
@Log4j2
@RequestMapping("/review")
public class ReviewController {
	ReviewService reviewService;
	
	// ** Review List - 회원별 리뷰 목록 반환 
    @GetMapping("/reviewList")
    public void reviewList(@RequestParam(name = "category", defaultValue = "") String category,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "5") int size,
            Model model) {
    	Pageable pageable = PageRequest.of(page, size);
	       Page<Review> reviewList = reviewService.getReviewList(pageable);

	       model.addAttribute("myreview", reviewList.getContent());
	       model.addAttribute("itemPage", reviewList);
	       model.addAttribute("currentPage", reviewList.getNumber());
	       model.addAttribute("totalPages", reviewList.getTotalPages());
	       model.addAttribute("totalItems", reviewList.getTotalElements());
	       
	      log.info("reviewService.getReviewList(category, pageable) : " + reviewService.getReviewList(pageable));
	      log.info("reviewList.getContent() : " + reviewList.getContent());
	      log.info("reviewList : " + reviewList);
	      log.info("reviewList.getNumber() : " + reviewList.getNumber());
	      log.info("reviewList.getTotalElements() : " + reviewList.getTotalElements());
    	
    } // reviewList
    
    // ** 새글등록: Insert 
    @GetMapping("/reviewInsert")
    public void reviewInsert(Model model) { 
       model.addAttribute("myreview", reviewService.selectList());
    } // reviewInsert
	
	
//	
//	@GetMapping("/allReviewList")
//    public ResponseEntity<List<ReviewDTO>> getAllReviewList(Model model) {
//		List<ReviewDTO> test = reviewService.selectAllList();
//    	model.addAttribute("Review", test);
//    	return ResponseEntity.ok(test);
//    }
    
   // => Review Insert Service 처리: POST
   @PostMapping(value="/reviewInsert")
   public String reviewInsert(HttpServletRequest request,
		  Review entity, Model model) throws IOException  {
      String uri = "redirect:/review/reviewList";
   
      // 2. Service 처리
      try {
         log.info("** insert 성공 id => "+reviewService.save(entity));
         model.addAttribute("message", "게시글 등록 완료.");
      } catch (Exception e) {
         log.info("** insert Exception => "+e.toString());
         model.addAttribute("message", "게시글등록 실패. 다시 하세요.");
         uri="review/reviewInsert";
      }
      
      // 3. View 
      return uri;
   } // reviewInsert
   
   // ** Review Delete - 게시글 삭제
//   @GetMapping(value="/rdelete")
//   public String qdelete(HttpSession session, Review entity, RedirectAttributes rttr) {
//      
//      String uri = "redirect:/review/reviewList";
//      
//      try {
//         log.info("** delete 성공  => "+reviewService.delete(entity.getReview_seq()));
//         rttr.addFlashAttribute("message", "게시글삭제 성공!!") ;   
//         if ( ((String)session.getAttribute("loginID")).equals("admin") ) {
//            // => 관리자에 의한 강제삭제 : qnaList.jsp
//            uri="redirect:reviewList";
//         }else {
//            // => 본인삭제 : home.jsp, session 무효화 
//            session.invalidate();
//         }
//      } catch (Exception e) {
//         log.info("** delete Exception => "+e.toString());
//         rttr.addFlashAttribute("message", " 삭제 실패.. ");
//      }
//      
//      return uri;
//   } // qdelete
   
   @DeleteMapping("/rdelete/{review_seq}")
   // 경로로 오는거니깐.. @pathvariable 사용
   public ResponseEntity<?> rDelete(@PathVariable("review_seq") int review_seq, Review entity){
      entity.setReview_seq(review_seq);
      if(reviewService.delete(review_seq) > 0) {
         log.info("axidelete HttpStatus.OK = " + HttpStatus.OK);
         return new ResponseEntity<String>("삭제 성공", HttpStatus.OK);      
      } else {
         log.info("axidelete HttpStatus.BAD_GATEWAY = " + HttpStatus.BAD_GATEWAY);
         return new ResponseEntity<String>("삭제 실패, Data_Notfound", HttpStatus.BAD_GATEWAY);
      }
   }

}
