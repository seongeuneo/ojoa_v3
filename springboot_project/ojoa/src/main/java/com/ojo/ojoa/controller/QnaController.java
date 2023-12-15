package com.ojo.ojoa.controller;

import java.io.IOException;

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

import com.ojo.ojoa.entity.Member;
import com.ojo.ojoa.entity.Qna;
import com.ojo.ojoa.service.QnaService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor
@Controller
@Log4j2
@RequestMapping("qna") 
public class QnaController {

   QnaService qnaService;
   
   
   // ** Qna List - 회원별 Qna 목록 반환 
    @GetMapping("/qnaList")
    public void qnaList(@RequestParam(name = "category", defaultValue = "") String category,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "5") int size,
            Model model) {
    	Pageable pageable = PageRequest.of(page, size);
	       Page<Qna> qnaList = qnaService.getQnaList(pageable);

	       model.addAttribute("qna", qnaList.getContent());
	       model.addAttribute("itemPage", qnaList);
	       model.addAttribute("currentPage", qnaList.getNumber());
	       model.addAttribute("totalPages", qnaList.getTotalPages());
	       model.addAttribute("totalItems", qnaList.getTotalElements());
	       
	      log.info("qnaService.getQnaList(category, pageable) : " + qnaService.getQnaList(pageable));
	      log.info("qnaList.getContent() : " + qnaList.getContent());
	      log.info("qnaList : " + qnaList);
	      log.info("qnaList.getNumber() : " + qnaList.getNumber());
	      log.info("qnaList.getTotalElements() : " + qnaList.getTotalElements());
    	
    } // qnaList
    
    
    
    // ** 새글등록: Insert 
    @GetMapping("/qnaInsert")
    public void qnaInsert(Model model) { 
       model.addAttribute("qna", qnaService.selectList());
    } // qnaInsert
  
    
    
   // => Qna Insert Service 처리: POST
   @PostMapping(value="/qnaInsert")
   public String qnaInsert(HttpServletRequest request, Qna entity, Model model) throws IOException  {
      String uri = "redirect:/qna/qnaList";
     // String a = "N";
      // 2. Service 처리
      try {
    	 // entity.setQna_answer(a);
    	 System.out.println(entity);
         log.info("** insert 성공 id => "+qnaService.save(entity));
         model.addAttribute("message", "게시글 등록 완료.");
      } catch (Exception e) {
         log.info("** insert Exception => "+e.toString());
         model.addAttribute("message", "게시글등록 실패. 다시 하세요.");
         uri="qna/qnaInsert";
      }
      // 3. View 
      return uri;
   } // QnaInsert
   
   
   
   // ** Qna Delete - 게시글 삭제 (성은코드참조)
   @DeleteMapping("/qdelete/{qna_seq}")
   public ResponseEntity<?> qdelete(@PathVariable("qna_seq") int qna_seq, Qna entity){
      entity.setQna_seq(qna_seq);
      if(qnaService.delete(qna_seq) > 0) {
         log.info("axidelete HttpStatus.OK = " + HttpStatus.OK);
         return new ResponseEntity<String>("삭제 성공", HttpStatus.OK);      
      } else {
         log.info("axidelete HttpStatus.BAD_GATEWAY = " + HttpStatus.BAD_GATEWAY);
         return new ResponseEntity<String>("삭제 실패, Data_Notfound", HttpStatus.BAD_GATEWAY);
      }
   }

   
   
   // ** replyInsert
   // => replyInsert Form 출력 메서드
   @GetMapping("/replyAnswer/{qna_seq}")
   public String replyAnswer(@PathVariable("qna_seq") int qna_seq, Qna entity, Model model) {
      model.addAttribute("qna", qnaService.selectOne(qna_seq));
   return "qna/replyAnswerForm";
   
   } // qnaList
   
   
   
// 답변 등록
   @PostMapping(value="/replyAnswerForm")
   public String replyAnswerForm(HttpSession session, Qna entity, Model model) throws IOException  {
	   System.out.println("*******"+entity);
	   qnaService.replyUpdate(entity.getQna_seq(), entity.getQna_reply());
	
	   model.addAttribute("qna", qnaService.selectList());
	   return "/qna/qnaList";
   }
    

   
   
// 밑에 코드는 계속 주석   
//   @PostMapping(value="/replyinsert")
//   public String replyinsert(Qna entity) {
//      
//	   qnaService.replyinsert(entity.getQna_seq(), entity.getQna_reply());
//      String uri="redirect:qnaList";
//      return uri;
//   }
 
   
}