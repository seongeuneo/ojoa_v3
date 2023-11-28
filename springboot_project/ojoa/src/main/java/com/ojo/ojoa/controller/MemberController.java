package com.ojo.ojoa.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
	
	// ** MemberList
	@GetMapping("/memberList")
	public void memberList(Model model) {
		model.addAttribute("banana", service.selectList());
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
	public String join(HttpServletRequest request,
					Member entity, Model model) throws IOException  {
	
		// 사용자로부터 이메일과 도메인 불러옴
	    String email1 = request.getParameter("email1");
	    String email2 = request.getParameter("email_domain");

	    // 이메일과 도메인을 결합
	    String domain = "@" + email2;

	    // 합쳐진 이메일(도메인 포함)을 엔터티에 설정
	    entity.setEmail2(domain);
	    
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
	public String memberUpdate(HttpSession session,
							  Member entity, Model model) throws IOException {
		
		// => 처리결과에 따른 화면 출력을 위해서 dto 의 값을 Attribute에 보관
		model.addAttribute("apple", entity);
		String uri="member/memberDetail";
		
		// ** password는 수정불가
		
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
	} //memberUpdte
	
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

