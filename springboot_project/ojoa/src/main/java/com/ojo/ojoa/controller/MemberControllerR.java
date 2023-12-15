package com.ojo.ojoa.controller;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ojo.ojoa.domain.UserDTO;
import com.ojo.ojoa.entity.Member;
import com.ojo.ojoa.service.EmailService;
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
	EmailService emailService;
	
	
	//**** => 리액트 ridDupCheck
	@GetMapping("/ridDupCheck")
	public ResponseEntity<?> ridDupCheck(@RequestParam("id") String id) {
	    // 1) newID 확인
	    if (service.selectOne(id) != null) {
	        // => 존재 : 사용불가
	        log.info("** 중복 : 사용불가 - ID: " + id);
	        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("duplicate");
	    } else {
	        // => 없으면: 사용가능
	    	log.info("** 사용가능 - ID: " + id);
	        return ResponseEntity.status(HttpStatus.OK).body("사용 가능한 아이디 입니다.");
	    }
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

	
	
	// **** => 리액트 비밀번호 업데이트 rmemberUpdate
	// => 요청: home 에서 내정보수정 -> 내정보수정Form (memberUpdate.jsp) 출력
	// => 수정후 submit -> 수정 Service 
	//		-> 성공: detail
	//		-> 실패: 재시도 유도 (rmemberUpdate.jsp)
	@PostMapping(value="/rpasswordUpdate")
	public ResponseEntity<?> rpasswordUpdate(@RequestBody Member entity, HttpServletRequest request) throws IOException {
	    String id = (String) request.getSession().getAttribute("loginID");
	    
	    if (id == null || id.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션이 만료되었거나 로그인되어 있지 않습니다.");
	    }
	    
	    try {
	        // 비밀번호 변경
	        entity.setId(id);
	        entity.setPassword(passwordEncoder.encode(entity.getPassword()));
	        boolean passwordUpdated = service.updatePassword(entity);

	        if (passwordUpdated) {
	            return ResponseEntity.status(HttpStatus.OK).body("비밀번호가 변경되었습니다.");
	        } else {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호 변경에 실패했습니다.");
	        }
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("서버 오류가 발생했습니다.");
	    }
	} //rpasswordUpdate
	
	
	
	@PostMapping(value="/rUpdate")
	public ResponseEntity<?> rUpdate(@RequestBody Member entity) throws IOException {
	    // 클라이언트로부터 받은 엔티티로 회원 정보 업데이트
	    try {
	    	System.out.println("rUpdate "+entity);
	       
	            service.save(entity);
	            return ResponseEntity.status(HttpStatus.OK).body("회원 정보가 업데이트되었습니다.");
	    } catch (Exception e) {
	        // 업데이트 중 문제 발생 시
	        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("회원 정보 업데이트 중 오류가 발생했습니다.");
	    }
	} //rUpdate
	
	
	
	// ** Member Delete: 회원탈퇴
	@DeleteMapping(value="/rmemberdelete")
	public ResponseEntity<?> rmemberdelete(@RequestParam("id") String id, HttpSession session) {
		log.info("아이디 탈퇴 ID : " + id);
		try {
	        service.delete(id);
            return ResponseEntity.status(HttpStatus.OK).body("회원 탈퇴 성공.");
        } catch (Exception e) {
	        // 업데이트 중 문제 발생 시
        	log.info("아이디 탈퇴 중 오류 발생: " + e.toString());
	        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("탈퇴 중 오류 발생 => "+e.toString());
	    }
	} //rmemberdelete
	
	
	
	// ***** 리액트 회원 아이디 찾기
	@GetMapping("/rfindId")
    public ResponseEntity<?> findLoginId(
            @RequestParam("name") String name,
            @RequestParam("phone2") String phone2,
            @RequestParam("phone3") String phone3
    ) {
        try {
            // 데이터베이스에서 해당 name, phone2, phone3 값을 가진 ID를 조회합니다.
            String foundId = service.findIdByNameAndPhone(name, phone2, phone3);

            if (foundId != null) {
                // ID를 찾은 경우
                return ResponseEntity.ok(foundId);
            } else {
                // ID를 찾지 못한 경우
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 정보로 등록된 ID가 없습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ID를 찾는 중에 오류가 발생했습니다.");
        }
    } //findLoginId
	
	
	//***** 비밀번호 찾기 API
	
	
	
	//***** 결제페이지 회원정보 가져오기 : 희상추가
	@GetMapping(value="/rinfo")
	public  ResponseEntity<?> rinfo(HttpSession session) {
	   try {
		   String loginID = (String) session.getAttribute("loginID");
	       if (loginID != null) {
	           Member result = service.selectOne(loginID);
	           return ResponseEntity.ok(result);   
	       } else throw new Exception("로그인 아이디 not found");
	   } catch (Exception e) {
	       log.error("데이터 가져오기 중 에러: {}", e.toString());
	       return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("데이터 가져오기 실패"+ e.toString());
	       }
	   } //rinfo
	   
	// *****
	// find PW ======================================================================================
   @PostMapping(value = "/uFindPW")
   public String postMemberFindPW(Model model, @RequestBody Member entity) {
      Member checkUser = service.checkUser(entity.getId(), entity.getName(), entity.getEmail1());
      System.out.println(checkUser);
      System.out.println(entity.getId() + entity.getName() + entity.getEmail1());
      
      try {
         if (checkUser != null) {
            String randomPW = generateTempKey(8);
            log.info(randomPW);
            
            Member member = service.selectOne(entity.getId());
            member.setPassword(passwordEncoder.encode(randomPW));
            service.save(member);

            emailService.sendEmail(entity.getId(), entity.getName(), entity.getEmail1(), randomPW);
            return "[" + entity.getId() + "로 이메일 발송완료]. 임시 비밀번호로 로그인 후, 바로 비밀번호를 변경해주세요.";
         } else {
            return "가입한 회원정보를 정확하게 입력해주세요.";
         }
      } catch (Exception e) {
         System.out.println("postMemberFindPW" + e.toString());
         return "Error processing data";
      }

   } //postMemberFindPW

	   public static String generateTempKey(int length) {
	      String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	      StringBuilder tempKey = new StringBuilder();

	      SecureRandom random = new SecureRandom();
	      for (int i = 0; i < length; i++) {
	         int index = random.nextInt(characters.length());
	         tempKey.append(characters.charAt(index));
	      }

	      return tempKey.toString();
	   } //generateTempKey
	
	

} //class

