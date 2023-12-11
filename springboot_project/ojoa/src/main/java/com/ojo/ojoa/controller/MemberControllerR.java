package com.ojo.ojoa.controller;

import java.io.IOException;
import java.util.Date;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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
	
	//**** => 리액트 ridDupCheck
	@GetMapping("/ridDupCheck")
	public String ridDupCheck(@RequestParam("id") String id, Model model) {
	    // 1) newID 확인
	    if (service.selectOne(id) != null) {
	        // => 존재 : 사용불가
	        model.addAttribute("idUse", "F");
	        log.info("** 존재: 사용불가 - ID: " + id);
	    } else {
	        // => 없으면: 사용가능
	        model.addAttribute("idUse", "T");
	        log.info("** 존재: 사용가능 - ID: " + id);
	    }
	    return "member/idDupCheck";
	} //ridDupCheck
	
	
	//**** => 리액트 rLogin / Request: JSON, Response: JSON
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
	
	//**** => 리액트 rLogout
	// => session 무효화, home으로 
	@PostMapping(value="/rlogout")
	public String rlogout(HttpSession session, Model model, RedirectAttributes rttr) {
	    session.invalidate();
	    rttr.addFlashAttribute("message", "로그아웃 성공");
	    return "";
	} //rlogout
	
	//**** => 리액트 rJoin
	@PostMapping(value = "/rjoin")
	public ResponseEntity<?> rjoin(@RequestBody Member entity) throws IOException {
	
		ResponseEntity<?> result = null;
		
		//** Service
		// => PasswordEncoder (암호화 적용)
		entity.setPassword(passwordEncoder.encode(entity.getPassword()));
		
		// => Service 처리
		if ( service.save(entity) != null ) {
			result = ResponseEntity.status(HttpStatus.OK).body("~~ 회원가입 성공!! 로그인후 이용하세요 ~~");
			log.info("** rjoin HttpStatus.OK => "+HttpStatus.OK);
		}else {
			result = ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("~~ 회원가입 실패!! 다시 하세요 ~~");
			log.info("** rjoin HttpStatus.BAD_GATEWAY => "+HttpStatus.BAD_GATEWAY);
		}
		return result;
	} //rjoin

} //class

