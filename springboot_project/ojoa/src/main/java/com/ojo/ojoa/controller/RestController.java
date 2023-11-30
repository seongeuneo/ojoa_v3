package com.ojo.ojoa.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ojo.ojoa.DTO.QnaDTO;
import com.ojo.ojoa.service.QnaService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;


@AllArgsConstructor
@Log4j2
@RequestMapping("api/qna")
public class RestController {
	QnaService qnaService;
	
	@GetMapping("/allQnaList")
    public ResponseEntity<List<QnaDTO>> getAllQnaList(Model model) {
		List<QnaDTO> test = qnaService.selectAllList();
    	//model.addAttribute("qna", test);
    	return ResponseEntity.ok(test);
    }
}
