package com.ojo.ojoa.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ojo.ojoa.entity.Member;
import com.ojo.ojoa.service.MemberService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@RequestMapping("/member")
@Log4j2
@AllArgsConstructor
public class MemberController {
	
	MemberService service;
	PasswordEncoder passwordEncoder;
	
	// ** ID 중복확인
	@GetMapping("/idDupCheck")
	public String idDupCheck(Member entity, Model model) {
		// 1) newID 확인
		if ( service.selectOne(entity.getId()) !=null ) {
			// => 존재 : 사용불가
			model.addAttribute("idUse", "F");
		}else {
			// => 없으면: 사용가능
			model.addAttribute("idUse", "T");
		}
		return "member/idDupCheck";
	} //idDupCheck
	
	// ** PasswordUpdate
	// => passwordUpdate_Form 출력
	@GetMapping(value="/pUpdateForm")
	public String pUpdateForm() {
	    return "member/pUpdateForm"; // 비밀번호 변경 폼을 보여줄 JSP 페이지의 경로
	} //pUpdateForm
	        
	// => password 만 수정
	@PostMapping(value="/passwordUpdate")
	public String passwordUpdate(HttpServletRequest request, Model model, Member entity) {
	    String id = (String) request.getSession().getAttribute("loginID");

	    entity.setId(id);
	    entity.setPassword(passwordEncoder.encode(entity.getPassword()));

	    String uri = "member/loginForm";
	    try {
	        boolean passwordUpdated = service.updatePassword(entity);

	        if (passwordUpdated) {
	            request.getSession().invalidate(); 
	            model.addAttribute("message", "비밀번호가 수정되었습니다. 다시 로그인하세요.");
	        } else {
	            model.addAttribute("message", "비밀번호 수정에 실패했습니다. 다시 시도하세요.");
	            uri = "member/pUpdateForm";
	        }
	    } catch (Exception e) {
	        model.addAttribute("message", "오류가 발생했습니다. 다시 시도하세요.");
	        uri = "member/pUpdateForm";
	    }
	    return uri;
	}
	
	// ** MemberList
//	@GetMapping("/memberList")
//	public void memberList(Model model) {
//		model.addAttribute("banana", service.selectList());
//	} //memberList
	@GetMapping("/memberList")
	public void memberList(@RequestParam(name = "category", defaultValue = "") String category,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "5") int size,
            Model model) {
		Pageable pageable = PageRequest.of(page, size);
	       Page<Member> faqPageList = service.getMemberList(pageable);

	       model.addAttribute("faqList", faqPageList.getContent());
	       model.addAttribute("itemPage", faqPageList);
	       model.addAttribute("currentPage", faqPageList.getNumber());
	       model.addAttribute("totalPages", faqPageList.getTotalPages());
	       model.addAttribute("totalItems", faqPageList.getTotalElements());
	       
	      log.info("faq_service.getFaqList(category, pageable) : " + service.getMemberList(pageable));
	      log.info("faqPageList.getContent() : " + faqPageList.getContent());
	      log.info("faqPageList : " + faqPageList);
	      log.info("faqPageList.getNumber() : " + faqPageList.getNumber());
	      log.info("faqPageList.getTotalElements() : " + faqPageList.getTotalElements());
		
	} //memberList
	
	// ** MemberDetail
	@GetMapping(value ="/memberDetail")
	public String memberDetail(HttpServletRequest request, Model model, Member entity) {
		model.addAttribute("apple", service.selectOne(entity.getId()));
		
		if ( "U".equals(request.getParameter("jCode")) )
			 return "member/memberUpdate";
		else return "member/memberDetail";
	} //memberDetail

	// ** Member Login & Logout
	// => LoginForm : Get
	// => 계층적 url 적용 
	@GetMapping(value="/loginForm")
	public void loginForm() {
		// viewName 생략 
	}
	
	// => Login 처리 : Post
	@PostMapping(value="/login")
	public String login(HttpSession session, Model model, Member entity) {
		// ** 로그인 Service 처리
		// 1. 요청분석
		String password = entity.getPassword();
		String uri="redirect:/home"; 
		// "home" -> home.jsp (성공)
		// "redirect:home" -> home 을 재요청, 그러므로 HomeController 의 home 메서드로
		
		// 2. 서비스 처리
		entity=service.selectOne(entity.getId());
		
		if ( entity!=null && 
			passwordEncoder.matches(password, entity.getPassword()) ) {	
			session.setAttribute("loginID", entity.getId());
			session.setAttribute("loginName", entity.getName());
		}else {
			uri="member/loginForm";
			model.addAttribute("message", "로그인 실패. 다시 하세요");
		}
		return uri;
	} //login_Post

	// => Logout
	// => session 무효화, home으로 
	@GetMapping(value="/logout")
	public String logout(HttpSession session, Model model, RedirectAttributes rttr) {
		session.invalidate();
		rttr.addFlashAttribute("message", "로그아웃 성공");
		return "redirect:/home";
	} //logout

	// ** Join 기능
	// => JoinForm: GET
	@GetMapping(value="/memberJoin")
	public void memberJoin() {
		// viewName 생략 -> 요청명이 viewName 이 됨
	}
	
	// => Join Service 처리: POST
	@PostMapping(value="/join")
	public String join(Member entity, Model model) throws IOException  {
	
	    // 1. 요청분석 & Service
		// => 성공: 로그인유도 (loginForm 으로, member/loginForm.jsp)
		// => 실패: 재가입유도 (joinForm 으로, member/memberJoin.jsp)
		String uri="member/loginForm";
		
		// ** PasswordEncoder (암호화 적용)
		entity.setPassword(passwordEncoder.encode(entity.getPassword()));
		
		// 2. Service 처리
		try {
			log.info("** insert 성공 id => "+service.save(entity));
			model.addAttribute("message", "회원가입 완료. 로그인후 이용하세요.");
		} catch (Exception e) {
			log.info("** insert Exception => "+e.toString());
			model.addAttribute("message", "회원가입 실패. 다시 하세요.");
			uri="member/memberJoin";
		}
		
		// 3. View 
		return uri;
	} // Join_Post
	
	// ** Member Update
	// => 요청: home 에서 내정보수정 -> 내정보수정Form (memberUpdate.jsp) 출력
	// => 수정후 submit -> 수정 Service 
	//		-> 성공: detail
	//		-> 실패: 재시도 유도 (memberUpdate.jsp)
	@PostMapping(value="/memberUpdate")
	public String memberUpdate(HttpSession session, HttpServletRequest request,
							  Member entity, Model model) throws IOException {
		// => 처리결과에 따른 화면 출력을 위해서 dto 의 값을 Attribute에 보관
		model.addAttribute("apple", entity);
		String uri="member/memberDetail";
		// ** password는 단독 링크의 폼에서 수정
		// => Service 처리
		try {
			log.info("** update 성공 id => "+service.save(entity));
			session.setAttribute("loginName", entity.getName());
			// => 이름을 수정한 경우 session 값 변경 
			model.addAttribute("message", "회원정보 수정 완료.");
		} catch (Exception e) {
			log.info("** update Exception => "+e.toString());
			model.addAttribute("message", "회원정보 수정 실패. 다시 하세요.");
			uri="member/memberUpdate";
		}
		return uri;
	} //memberUpdate
	
	// ** Member Delete: 회원탈퇴
	@GetMapping(value="/memberdelete")
	public String memberdelete(HttpSession session, Member entity, RedirectAttributes rttr) {
		
		String uri = "redirect:/home";
		
		try {
			log.info("** delete 성공 id => "+service.delete(entity.getId()));
			rttr.addFlashAttribute("message", "탈퇴 성공. 1개월 후 재가입 가능 합니다.") ;	
			 if ( ((String)session.getAttribute("loginID")).equals("admin") ) {
				 // => 관리자에 의한 강제탈퇴 : memberList.jsp
				 uri="redirect:memberList";
			 }else {
				 // => 본인탈퇴 : home.jsp, session 무효화 
				 session.invalidate();
			 }
		} catch (Exception e) {
			log.info("** delete Exception => "+e.toString());
			rttr.addFlashAttribute("message", "탈퇴 실패.");
		}
		return uri;
	} //memberdelete
	
} //class

