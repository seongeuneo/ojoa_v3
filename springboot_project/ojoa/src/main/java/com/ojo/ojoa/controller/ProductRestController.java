package com.ojo.ojoa.controller;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ojo.ojoa.entity.Product;
import com.ojo.ojoa.service.ProductService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;


@RestController
@RequestMapping("/api")
@Log4j2
@AllArgsConstructor
public class ProductRestController {
	
	ProductService productService;

	@GetMapping("/ip")
	public String ip (Model model) {
		// 요청을 보낸 클라이언트의 IP주소를 반환합니다.
		return "";
	}
	
	@GetMapping("/productList")
	public List<Product> productList() {
		return productService.selectList();
	}

	// => Product Insert Service 처리: POST
		@PostMapping(value="/productInsert")
		public String productInsert( HttpServletRequest request,
						Product entity, Model model) throws IOException  {
//			String uri="/product/productInsert";
			System.out.println("productInsert****" + entity);
			// ** MultipartFile ***********************
			String realPath = "C:\\ojoa_v3\\springboot_project\\ojoa\\src\\main\\ojoa_project\\public\\thumbs\\";
			// => 기본 이미지 지정하기
			String file1, file2="";
			
			// => 저장경로 완성
					MultipartFile uploadfilef = entity.getUploadfilef();
					if ( uploadfilef!=null && !uploadfilef.isEmpty() ) {
						// => image_File 을 선택함 -> 저장 (저장경로: relaPath+화일명)
						// 1.3.1) 물리적위치 저장 (file1)
						file1 = realPath + uploadfilef.getOriginalFilename(); //저장경로 완성 
						uploadfilef.transferTo(new File(file1)); //해당경로에 저장(붙여넣기)
						
						// 1.3.2) Table 저장경로 완성 (file2)
						file2 =  uploadfilef.getOriginalFilename();
					} // Image 선택한 경우
					
					// 1.4) 완성된 경로를 dto 에 set
					entity.setProd_mainimage(file2);
			
			
			// 2. Service 처리
			try {
				log.info("** insert 성공 id => "+productService.save(entity));
				return "상품 등록 완료.";
			} catch (Exception e) {
				log.info("** insert Exception => "+e.toString());
//				model.addAttribute("message", "상품등록 실패. 다시 하세요.");
//				uri="/product/productInsert";
				return "상품 등록 실패." + e.toString();
			}
			
			// 3. View 
//			return uri;
		} // ProductInsert
	
	
}
	
