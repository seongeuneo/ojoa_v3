package com.ojo.ojoa.controller;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
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
    
    
// 상풍 등록하기 : Insert
    
    @GetMapping("/productInsert")
    public void productInsert(Model model) {
    	model.addAttribute("product", productService.selectList());
    } // productInsert

   
    
	
	
	// 상품 수정
	@PostMapping(value="/updateProduct")
	public String updateProduct(HttpSession session, @ModelAttribute Product updatedProduct, Model model) throws IOException{
		model.addAttribute("productDetails", updatedProduct);
		System.out.println("업데이트프덕트"+ updatedProduct);
		String uri="product/productDetail";
		
		// *** ImageUpload 처리 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		
		MultipartFile uploadfilef = updatedProduct.getUploadfilef(); 
		// => new Image 를 선택한 경우에만 처리하면 됨 
		if ( uploadfilef!=null && !uploadfilef.isEmpty() ) {
			// => Image 재선택 MultipartFile 처리
			String realPath = "C:\\ojoa_v3\\springboot_project\\ojoa\\src\\main\\ojoa_project\\public\\thumbs\\";
			
			// => 물리적위치에 저장 (file1)
			String file1 = realPath + uploadfilef.getOriginalFilename(); //저장경로 완성
			uploadfilef.transferTo(new File(file1)); // IO 발생: Checked Exception 처리  
			
			// => Table 저장경로 완성 (file2)
			String file2=uploadfilef.getOriginalFilename();
			updatedProduct.setProd_mainimage(file2);
		} // Image 선택 
		
	    try {
	            log.info("상품 업데이트 성공: ");
	            productService.save(updatedProduct); // 변경사항 저장
	       
	        return "redirect:/product/productDetail?prod_num=" + updatedProduct.getProd_num();
	    } catch (Exception e) {
	        log.error("상품 업데이트 실패: " + e.getMessage());
	        model.addAttribute("error", "상품 업데이트에 실패했습니다.");
	        return uri; // 실패 시 에러 페이지로 이동하도록 설정
	    }
	}



    

	// ** Product Delete - 상품 삭제
	@DeleteMapping(value="/pdelete/{prod_num}")
	public ResponseEntity<?> pdelete(@PathVariable("prod_num") int prod_num, Product entity) {
		
		 entity.setProd_num(prod_num);
		 if(productService.delete(prod_num) > 0) {
	          log.info("axidelete HttpStatus.OK = " + HttpStatus.OK);
	          return new ResponseEntity<String>("삭제 성공", HttpStatus.OK);      
	       } else {
	          log.info("axidelete HttpStatus.BAD_GATEWAY = " + HttpStatus.BAD_GATEWAY);
	          return new ResponseEntity<String>("삭제 실패, Data_Notfound", HttpStatus.BAD_GATEWAY);
	       }
	} // pdelete
	
	// 상품 상세 정보 조회
    @GetMapping("/productDetail")
    public String showProductDetail(@RequestParam("prod_num") String productId, Model model) {
        // productId를 기반으로 상품 세부 정보 가져오기
        Product productDetails = productService.getProductById(productId);
        // 상품 세부 정보를 모델에 추가
        model.addAttribute("productDetails", productDetails);
        return "productdetail/productDetail"; // 상품 세부 정보를 표시할 JSP 페이지 이름 반환
    }
//    @GetMapping("/detail/{prod_num}")
//    public String productDetail(@PathVariable("prod_num") int prod_num, Model model) {
//        Product product = productService.selectOne(prod_num);
//        model.addAttribute("product", product);
//        return "productdetail/productDetail"; // productDetail.jsp로 반환
//    }

	
	
}

	
