package com.ojo.ojoa.controller;


import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ojo.ojoa.entity.Qna;
import com.ojo.ojoa.service.QnaService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor
@Controller
@Log4j2
@RequestMapping("/qna")
public class QnaController {
   

//   @CrossOrigin(origins="*")
//   @GetMapping("/qnaList")
//    public ResponseEntity<List<Qna>> productList(Model model) {
//      
//      List<Qna> test = qnaService.selectList();
//       //model.addAttribute("qna", test);
//       return ResponseEntity.ok(test);
//    }

   QnaService qnaService;
   
   // ** Qna List - 회원별 카트 목록 반환 
    @GetMapping("/qnaList")
    public void qnaList(Model model) {
       model.addAttribute("qna", qnaService.selectList());
    } // qnaList
    
    // ** 새글등록: Insert 
    @GetMapping("/qnaInsert")
    public void productInsert(Model model) {
       model.addAttribute("qna", qnaService.selectList());
    } // qnaInsert
  
   // => Qna Insert Service 처리: POST
   @PostMapping(value="/qnaInsert")
   public String qnaInsert(HttpServletRequest request,
         Qna entity, Model model) throws IOException  {
      String uri = "redirect:/qna/qnaList";
   
      // 2. Service 처리
      try {
         log.info("** insert 성공 id => "+qnaService.save(entity));
         model.addAttribute("message", "게시 등록 완료.");
      } catch (Exception e) {
         log.info("** insert Exception => "+e.toString());
         model.addAttribute("message", "게시글등록 실패. 다시 하세요.");
         uri="qna/qnaInsert";
      }
      
      // 3. View 
      return uri;
   } // QnaInsert
   
   // ** Qna Delete - 게시글 삭제
   @GetMapping(value="/qdelete")
   public String qdelete(HttpSession session, Qna entity, RedirectAttributes rttr) {
      
      String uri = "redirect:/qna/qnaList";
      
      try {
         log.info("** delete 성공  => "+qnaService.delete(entity.getQna_seq()));
         rttr.addFlashAttribute("message", "게시글삭제 성공!!") ;   
         if ( ((String)session.getAttribute("loginID")).equals("admin") ) {
            // => 관리자에 의한 강제삭제 : qnaList.jsp
            uri="redirect:qnaList";
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