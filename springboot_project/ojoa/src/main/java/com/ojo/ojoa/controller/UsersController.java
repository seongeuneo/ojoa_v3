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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ojo.ojoa.entity.Users;
import com.ojo.ojoa.service.UsersService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@RequestMapping("/users")
@Log4j2
@AllArgsConstructor
public class UsersController {
	
	UsersService service;
	PasswordEncoder passwordEncoder;
	
	// ** ID 중복확인
	@GetMapping("/idDupCheck")
	public String idDupCheck(Users entity, Model model) {
		// 1) newID 확인
		if ( service.selectOne(entity.getId()) !=null ) {
			// => 존재 : 사용불가
			model.addAttribute("idUse", "F");
		}else {
			// => 없으면: 사용가능
			model.addAttribute("idUse", "T");
		}
		return "users/idDupCheck";
	} //idDupCheck
	
	// ** UsersList
	@GetMapping("/usersList")
	public void usersList(Model model) {
		model.addAttribute("banana", service.selectList());
	} //usersList
	
	// ** UsersDetail
	@GetMapping(value ="/usersDetail")
	public String usersDetail(HttpServletRequest request, Model model, Users entity) {
		model.addAttribute("apple", service.selectOne(entity.getId()));
		
		if ( "U".equals(request.getParameter("jCode")) )
			 return "users/usersUpdate";
		else return "users/usersDetail";
	} //usersDetail

	// ** Users Login & Logout
	// => LoginForm : Get
	// => 계층적 url 적용 
	@GetMapping(value="/loginForm")
	public void loginForm() {
		// viewName 생략 
	}
	
	// => Login 처리 : Post
	@PostMapping(value="/login")
	public String login(HttpSession session, Model model, Users entity) {
		// ** 로그인 Service 처리
		// 1. 요청분석
		String password = entity.getPwd();
		String uri="redirect:/home"; 
		// "home" -> home.jsp (성공)
		// "redirect:home" -> home 을 재요청, 그러므로 HomeController 의 home 메서드로
		
		// 2. 서비스 처리
		entity=service.selectOne(entity.getId());
		
		if ( entity!=null && 
			passwordEncoder.matches(password, entity.getPwd()) ) {	
			session.setAttribute("loginID", entity.getId());
			session.setAttribute("loginName", entity.getName());
		}else {
			uri="users/loginForm";
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
	@GetMapping(value="/usersJoin")
	public void usersJoin() {
		// viewName 생략 -> 요청명이 viewName 이 됨
	}
	
	// => Join Service 처리: POST
	@PostMapping(value="/join")
	public String join(HttpServletRequest request, 
					Users entity, Model model) throws IOException  {
		// 1. 요청분석 & Service
		// => 성공: 로그인유도 (loginForm 으로, users/loginForm.jsp)
		// => 실패: 재가입유도 (joinForm 으로, users/memberJoin.jsp)
		String uri="users/loginForm";
		
		// ** PasswordEncoder (암호화 적용)
		entity.setPwd(passwordEncoder.encode(entity.getPwd()));
		
		// 2. Service 처리
		try {
			log.info("** insert 성공 id => "+service.save(entity));
			model.addAttribute("message", "회원가입 완료. 로그인후 이용하세요.");
		} catch (Exception e) {
			log.info("** insert Exception => "+e.toString());
			model.addAttribute("message", "회원가입 실패. 다시 하세요.");
			uri="users/usersJoin";
		}
		
		// 3. View 
		return uri;
	} // Join_Post
	
	// ** Users Update
	// => 요청: home 에서 내정보수정 -> 내정보수정Form (usersUpdate.jsp) 출력
	// => 수정후 submit -> 수정 Service 
	//		-> 성공: detail
	//		-> 실패: 재시도 유도 (usersUpdate.jsp)
	@PostMapping(value="/usersUpdate")
	public String usersUpdate(HttpSession session,
							  Users entity, Model model) throws IOException {
		
		// => 처리결과에 따른 화면 출력을 위해서 dto 의 값을 Attribute에 보관
		model.addAttribute("apple", entity);
		String uri="users/usersDetail";
		
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
			uri="users/usersUpdate";
		}
		
		return uri;
	} //usersUpdte
	
	// ** Users Delete: 회원탈퇴
	@GetMapping(value="/usersdelete")
	public String usersdelete(HttpSession session, Users entity, RedirectAttributes rttr) {
		
		String uri = "redirect:/home";
		
		try {
			log.info("** delete 성공 id => "+service.delete(entity.getId()));
			rttr.addFlashAttribute("message", "탈퇴 성공. 1개월 후 재가입 가능 합니다.") ;	
			 if ( ((String)session.getAttribute("loginID")).equals("admin") ) {
				 // => 관리자에 의한 강제탈퇴 : usersList.jsp
				 uri="redirect:usersList";
			 }else {
				 // => 본인탈퇴 : home.jsp, session 무효화 
				 session.invalidate();
			 }
		} catch (Exception e) {
			log.info("** delete Exception => "+e.toString());
			rttr.addFlashAttribute("message", "탈퇴 실패.");
		}
		
		return uri;
	} // usersdelete
	
	
} //class

