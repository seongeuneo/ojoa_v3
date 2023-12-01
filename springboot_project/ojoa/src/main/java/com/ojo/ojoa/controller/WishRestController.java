package com.ojo.ojoa.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ojo.ojoa.entity.Wish;
import com.ojo.ojoa.service.WishService;

import lombok.AllArgsConstructor;
//import lombok.extern.log4j.Log4j2;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/bbb")
@Log4j2
@AllArgsConstructor
public class WishRestController {
	WishService wishService;
	
	@GetMapping(value="/aaa")
    public ResponseEntity<?> wishlist(Wish wish) {
		 System.out.println("** Wish wish => " + wish);
	      ResponseEntity<?> result = null;
	      
//	      wish = wishService.selectOne(wish);
	      
	      if ( wish !=null ) {
		         result = ResponseEntity.status(HttpStatus.OK).body(wish);
		         log.info("** idblist HttpStatus.OK => "+HttpStatus.OK);
		      }else {
		         result = ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("~~ 출력할 조의 자료가 없습니다. ~~");
		         log.info("** idblist HttpStatus.BAD_GATEWAY => "+HttpStatus.BAD_GATEWAY); //502
		      }
		      return result;
	}
	
}


	
	
	
