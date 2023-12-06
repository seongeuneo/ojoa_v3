package com.ojo.ojoa.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ojo.ojoa.domain.ReviewDTO;
import com.ojo.ojoa.entity.Qna;
import com.ojo.ojoa.entity.Review;
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
    public void reviewList(Model model) {
       model.addAttribute("myreview", reviewService.selectList());
    } // qnaList
    
    // ** 새글등록: Insert 
    @GetMapping("/reviewInsert")
    public void reviewInsert(Model model) { 
       model.addAttribute("myreview", reviewService.selectList());
    } // qnaInsert
	
	
	
	@GetMapping("/allReviewList")
    public ResponseEntity<List<ReviewDTO>> getAllReviewList(Model model) {
		List<ReviewDTO> test = reviewService.selectAllList();
    	model.addAttribute("Review", test);
    	return ResponseEntity.ok(test);
    }
    
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
   @GetMapping(value="/rdelete")
   public String qdelete(HttpSession session, Review entity, RedirectAttributes rttr) {
      
      String uri = "redirect:/review/reviewList";
      
      try {
         log.info("** delete 성공  => "+reviewService.delete(entity.getReview_seq()));
         rttr.addFlashAttribute("message", "게시글삭제 성공!!") ;   
         if ( ((String)session.getAttribute("loginID")).equals("admin") ) {
            // => 관리자에 의한 강제삭제 : qnaList.jsp
            uri="redirect:reviewList";
         }else {
            // => 본인삭제 : home.jsp, session 무효화 
            session.invalidate();
         }
      } catch (Exception e) {
         log.info("** delete Exception => "+e.toString());
         rttr.addFlashAttribute("message", " 삭제 실패.. ");
      }
      
      return uri;
   } // qdelete

}
