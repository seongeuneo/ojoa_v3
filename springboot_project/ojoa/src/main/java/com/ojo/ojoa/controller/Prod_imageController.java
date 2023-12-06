package com.ojo.ojoa.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ojo.ojoa.service.Prod_imageService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor
@Controller
@Log4j2
@RequestMapping("/prod_image")
public class Prod_imageController {

	Prod_imageService prod_imageService;
	
	// ** prod_image List
    @GetMapping("/prod_imageList")
    public void prod_imageList(Model model) {
    	model.addAttribute("myprod_image", prod_imageService.selectList());
    } // prod_imageList
}
