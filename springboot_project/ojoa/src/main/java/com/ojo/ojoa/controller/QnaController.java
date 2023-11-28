package com.ojo.ojoa.controller;


import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ojo.ojoa.entity.Qna;
import com.ojo.ojoa.service.QnaService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor
@Controller
@Log4j2
@RequestMapping("/qna")
public class QnaController {
	QnaService qnaService;

	@CrossOrigin(origins="*")
	@GetMapping("/qnaList")
    public ResponseEntity<List<Qna>> productList(Model model) {
		List<Qna> test = qnaService.selectList();
    	//model.addAttribute("qna", test);
    	return ResponseEntity.ok(test);
    }
}
