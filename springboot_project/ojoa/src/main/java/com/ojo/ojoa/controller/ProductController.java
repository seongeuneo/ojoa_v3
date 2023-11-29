package com.ojo.ojoa.controller;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ojo.ojoa.entity.Product;
import com.ojo.ojoa.service.ProductService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor
@Controller
@Log4j2
@RequestMapping("/product")
public class ProductController {

	ProductService productService;

// ** Product List - 회원별 카트 목록 반환 
    @GetMapping("/productList")
    public void productList(Model model) {
    	model.addAttribute("product", productService.selectList());
    } // productList
    
    
    @GetMapping("/productInsert")
    public void productInsert(Model model) {
    	model.addAttribute("product", productService.selectList());
    } // productInsert

   
    
	// => Product Insert Service 처리: POST
	@PostMapping(value="/productInsert")
	public String productInsert(HttpServletRequest request,
					Product entity, Model model) throws IOException  {
		String uri="product/productInsert";
		
		
		// ** MultipartFile ***********************
		String realPath = "C:\\ojoa_v3\\springboot_project\\ojoa\\src\\main\\webapp\\resources\\uploadImages\\";
		// => 기본 이미지 지정하기
		String file1, file2="resources/uploadImages/basicman4.png";
		
		// => 저장경로 완성
				MultipartFile uploadfilef = entity.getUploadfilef();
				if ( uploadfilef!=null && !uploadfilef.isEmpty() ) {
					// => image_File 을 선택함 -> 저장 (저장경로: relaPath+화일명)
					// 1.3.1) 물리적위치 저장 (file1)
					file1 = realPath + uploadfilef.getOriginalFilename(); //저장경로 완성 
					uploadfilef.transferTo(new File(file1)); //해당경로에 저장(붙여넣기)
					
					// 1.3.2) Table 저장경로 완성 (file2)
					file2 = "resources/uploadImages/" + uploadfilef.getOriginalFilename();
				} // Image 선택한 경우
				
				// 1.4) 완성된 경로를 dto 에 set
				entity.setProd_mainimage(file2);
		
		
		// 2. Service 처리
		try {
			log.info("** insert 성공 id => "+productService.save(entity));
			model.addAttribute("message", "상품 등록 완료.");
		} catch (Exception e) {
			log.info("** insert Exception => "+e.toString());
			model.addAttribute("message", "상품등록 실패. 다시 하세요.");
			uri="product/productInsert";
		}
		
		// 3. View 
		return uri;
	} // ProductInsert
    

	// ** Product Delete - 상품 삭제
	@GetMapping(value="/pdelete")
	public String pdelete(HttpSession session, Product entity, RedirectAttributes rttr) {
		
		String uri = "redirect:/product/productList";
		
		try {
			log.info("** delete 성공  => "+productService.delete(entity.getProd_num()));
			rttr.addFlashAttribute("message", "~~ 상품삭제 성공!! ~~") ;	
			if ( ((String)session.getAttribute("loginID")).equals("admin") ) {
				// => 관리자에 의한 강제삭제 : cartList.jsp
				uri="redirect:productList";
			}else {
				// => 본인삭제 : home.jsp, session 무효화 
				session.invalidate();
			}
		} catch (Exception e) {
			log.info("** delete Exception => "+e.toString());
			rttr.addFlashAttribute("message", "~~ 삭제 실패 ~~");
		}
		
		return uri;
	} // pdelete
	
	// 상품 상세 정보 조회
    @GetMapping("/detail/{prod_num}")
    public String productDetail(@PathVariable("prod_num") int prodNum, Model model) {
        Product product = productService.selectOne(prodNum);
        model.addAttribute("product", product);
        return "productdetail/productDetail"; // productDetail.jsp로 반환
    }

	
	
}
	
