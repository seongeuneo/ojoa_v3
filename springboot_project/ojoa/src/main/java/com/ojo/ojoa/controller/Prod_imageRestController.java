package com.ojo.ojoa.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ojo.ojoa.domain.Prod_imageDTO;
import com.ojo.ojoa.service.Prod_imageService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor
@Controller
@RestController
@Log4j2
@RequestMapping("/images")
public class Prod_imageRestController {
	Prod_imageService prod_imageService;

	// prod_image 테이블 리스트
	@GetMapping("prod_image/allProd_imageList")
    public ResponseEntity<List<Prod_imageDTO>> getAllProd_imageList() {
		List<Prod_imageDTO> prod_imageList = prod_imageService.selectAllList();
    	return ResponseEntity.ok(prod_imageList);
    }
}
