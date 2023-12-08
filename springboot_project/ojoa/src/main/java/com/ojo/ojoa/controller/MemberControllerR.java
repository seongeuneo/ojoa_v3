package com.ojo.ojoa.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ojo.ojoa.domain.UserDTO;
import com.ojo.ojoa.entity.Member;
import com.ojo.ojoa.service.MemberService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/member")
@Log4j2
@AllArgsConstructor
public class MemberControllerR {
	
	MemberService service;
	PasswordEncoder passwordEncoder;
	
	// => 리액트 Login / Request: JSON, Response: JSON
	@PostMapping(value="/rlogin")
	public ResponseEntity<?> rlogin(HttpSession session, @RequestBody Member entity) {
	
		ResponseEntity<UserDTO> result = null;
		// 1) password 보관
		String password = entity.getPassword(); 
		// 2) service 처리
		entity = service.selectOne(entity.getId());
		if ( entity !=null && passwordEncoder.matches(password, entity.getPassword()) ) {	
			session.setAttribute("loginID", entity.getId()); // 세션에 사용자 정보 저장
			session.setAttribute("loginName", entity.getName());
			session.setMaxInactiveInterval(1800); // 세션 유효 시간을 1800초(30분)으로 설정
			// 로그인 후 세션 확인을 위한 콘솔 로그
	        System.out.println("세션 loginID: " + session.getAttribute("loginID"));
	        System.out.println("세션 loginName: " + session.getAttribute("loginName"));
			// 로그인 후 세션 시작 및 만료 시간 로그
			long creationTime = session.getCreationTime();
			int maxInactiveInterval = session.getMaxInactiveInterval();
	        long expirationTime = creationTime + (maxInactiveInterval * 1000); // 세션 만료 시간
	        log.info("세션 생성 시간: " + new Date(creationTime));
	        log.info("세션 만료 시간: " + new Date(expirationTime));
			// => response 로 전송할 객체생성
			final UserDTO userDTO = UserDTO.builder()
								.id(entity.getId())
								.name(entity.getName())
								.build();
			
			result = ResponseEntity.status(HttpStatus.OK).body(userDTO);
			log.info("** rlogin HttpStatus.OK => "+HttpStatus.OK);
		}else {
			result = ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(null);
			log.info("** rlogin HttpStatus.BAD_GATEWAY => "+HttpStatus.BAD_GATEWAY);
		}
		return result;
	} //rlogin
	
//	// => 리액트 Login 처리 : Post
//	@PostMapping(value="/rlogin")
//	public ResponseEntity<?> rlogin(@RequestBody Member member, HttpSession session) {
//		
//		// 1. 요청분석
//		
//		// 2. 서비스 처리
//	    Member entity = service.selectOne(member.getId());
//	    
//	    if (entity != null && entity.getPassword() != null &&
//            passwordEncoder.matches(member.getPassword(), entity.getPassword())) {	    	
//	    	// 세션에 로그인 정보 설정
//			session.setAttribute("loginID", entity.getId()); // 세션에 사용자 정보 저장
//			session.setAttribute("loginName", entity.getName());
//			session.setAttribute("loginAddress", entity.getAddress()); 
//			session.setAttribute("loginAddressdetail", entity.getAddressdetail());
//			session.setAttribute("loginMemberyn", entity.getMemberyn());
//			session.setAttribute("loginRegdate", entity.getRegdate());
//			session.setAttribute("loginMarketing_sms", entity.getMarketing_sms());
//			session.setAttribute("loginMarketing_email", entity.getMarketing_email());
//			session.setAttribute("loginEmail1", entity.getEmail1());
//			session.setAttribute("loginEmail2", entity.getEmail2());
//			session.setMaxInactiveInterval(1800); // 세션 유효 시간을 1800초(30분)으로 설정		
//			// 로그인 후 세션 확인을 위한 콘솔 로그
//	        System.out.println("세션 loginID: " + session.getAttribute("loginID"));
//	        System.out.println("세션 loginName: " + session.getAttribute("loginName"));
//	        System.out.println("세션 loginAddress: " + session.getAttribute("loginAddress"));
//	        System.out.println("세션 loginAddressdetail: " + session.getAttribute("loginAddressdetail"));
//	        System.out.println("세션 loginMemberyn: " + session.getAttribute("loginMemberyn"));
//	        System.out.println("세션 loginRegdate: " + session.getAttribute("loginRegdate"));
//	        System.out.println("세션 loginMarketing_sms: " + session.getAttribute("loginMarketing_sms"));
//	        System.out.println("세션 loginMarketing_email: " + session.getAttribute("loginMarketing_email"));
//	        System.out.println("세션 loginEmail1: " + session.getAttribute("loginEmail1"));
//	        System.out.println("세션 loginEmail2: " + session.getAttribute("loginEmail2"));
//	        // 로그인 후 세션 시작 및 만료 시간 로그
//	        long creationTime = session.getCreationTime();
//	        int maxInactiveInterval = session.getMaxInactiveInterval();
//	        long expirationTime = creationTime + (maxInactiveInterval * 1000); // 세션 만료 시간
//	        log.info("세션 생성 시간: " + new Date(creationTime));
//	        log.info("세션 만료 시간: " + new Date(expirationTime));
//	        return ResponseEntity.ok("성공");
//        } else {
//            // 아이디 또는 비밀번호가 일치하지 않을 경우 로그인 실패
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디를 찾을 수 없습니다. 다시 시도하세요");
//        }
//    } //rlogin
	
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
	
} //class

