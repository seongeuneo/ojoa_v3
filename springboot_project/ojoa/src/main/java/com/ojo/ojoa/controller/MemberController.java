package com.ojo.ojoa.controller;

import java.io.IOException;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	@PostMapping(value="login")
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
	
	// => 리액트 Login 처리 : Post
	@PostMapping(value="/rlogin")
	public ResponseEntity<?> rlogin(@RequestBody Member member, HttpSession session) {
		
	    Member entity = service.selectOne(member.getId());
	    
	    if (entity != null && entity.getPassword() != null &&
            passwordEncoder.matches(member.getPassword(), entity.getPassword())) {
	    	
	    	// 세션에 로그인 정보 설정
			session.setAttribute("loginID", entity.getId()); // 세션에 사용자 정보 저장
			session.setAttribute("loginName", entity.getName());
			session.setAttribute("loginAddress", entity.getAddress()); 
			session.setAttribute("loginAddressdetail", entity.getAddressdetail());
			session.setAttribute("loginMemberyn", entity.getMemberyn());
			session.setAttribute("loginRegdate", entity.getRegdate());
			session.setAttribute("loginMarketing_sms", entity.getMarketing_sms());
			session.setAttribute("loginMarketing_email", entity.getMarketing_email());
			session.setAttribute("loginEmail1", entity.getEmail1());
			session.setAttribute("loginEmail2", entity.getEmail2());
			session.setMaxInactiveInterval(1800); // 세션 유효 시간을 1800초(30분)으로 설정
			
			// 로그인 후 세션 확인을 위한 콘솔 로그
	        System.out.println("세션 loginID: " + session.getAttribute("loginID"));
	        System.out.println("세션 loginName: " + session.getAttribute("loginName"));
	        System.out.println("세션 loginAddress: " + session.getAttribute("loginAddress"));
	        System.out.println("세션 loginAddressdetail: " + session.getAttribute("loginAddressdetail"));
	        System.out.println("세션 loginMemberyn: " + session.getAttribute("loginMemberyn"));
	        System.out.println("세션 loginRegdate: " + session.getAttribute("loginRegdate"));
	        System.out.println("세션 loginMarketing_sms: " + session.getAttribute("loginMarketing_sms"));
	        System.out.println("세션 loginMarketing_email: " + session.getAttribute("loginMarketing_email"));
	        System.out.println("세션 loginEmail1: " + session.getAttribute("loginEmail1"));
	        System.out.println("세션 loginEmail2: " + session.getAttribute("loginEmail2"));
			
	        // 로그인 후 세션 시작 및 만료 시간 로그
	        long creationTime = session.getCreationTime();
	        int maxInactiveInterval = session.getMaxInactiveInterval();
	        long expirationTime = creationTime + (maxInactiveInterval * 1000); // 세션 만료 시간

	        log.info("세션 생성 시간: " + new Date(creationTime));
	        log.info("세션 만료 시간: " + new Date(expirationTime));
	        
	        return ResponseEntity.ok("성공");
        } else {
            // 아이디 또는 비밀번호가 일치하지 않을 경우 로그인 실패
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디를 찾을 수 없습니다. 다시 시도하세요");
        }
    } //rlogin
	
	//=> 리액트 LogOut 처리
	// => session 무효화, home으로 
	@PostMapping(value="/rlogout")
	public String rlogout(HttpServletRequest request) {
		//세션을 삭제
		HttpSession session = request.getSession(false); 
        // session이 null이 아니라는건 기존에 세션이 존재했었다는 뜻이므로
        // 세션이 null이 아니라면 session.invalidate()로 세션 삭제해주기.
		if(session != null) {
			session.invalidate();
		}
		return "redirect:/";
	} //rlogout

	
	
	
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

