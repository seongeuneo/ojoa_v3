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
					file2 =  uploadfilef.getOriginalFilename();
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
			String realPath = "C:\\ojoa_v3\\springboot_project\\ojoa\\src\\main\\webapp\\\\resources\\\\uploadImages\\\\";
			
			// => 물리적위치에 저장 (file1)
			String file1 = realPath + uploadfilef.getOriginalFilename(); //저장경로 완성
			uploadfilef.transferTo(new File(file1)); // IO 발생: Checked Exception 처리  
			
			// => Table 저장경로 완성 (file2)
			String file2="resources/uploadImages/" + uploadfilef.getOriginalFilename();
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
	@DeleteMapping(value="/pdelete")
	public String pdelete(@PathVariable("prod_num") int prod_num, HttpSession session, Product entity, RedirectAttributes rttr) {
		
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
	
