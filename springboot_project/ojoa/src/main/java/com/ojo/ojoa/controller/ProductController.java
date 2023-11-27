package com.ojo.ojoa.controller;


import org.springframework.stereotype.Controller;

//import com.ojo.ojoa.service.ProductService;

import lombok.AllArgsConstructor;

@Controller
//@AllArgsConstructor
public class ProductController {

	//private final ProductService itemService;
	
	 // 상품 등록 get 페이지
//    @GetMapping("/new")
//    public String itemForm(Model model) {
//        model.addAttribute("products", new Products());
//        model.addAttribute("item_image", new Item_image());
//        return "item/itemForm";
//    }
	
    // 상품 등록 post
//    @PostMapping(value = "/admin/item/new")
//    public String itemNew(@Valid Products products, BindingResult bindingResult,
//                          Model model, @RequestParam("itemImgFile") List<MultipartFile> itemImgFileList) {
//
//        // 상품 등록 시 필수 값이 없을 때 에러 발생
//        if (bindingResult.hasErrors()) {
//            return "item/itemForm"; // 에러가 발생하면 상품 등록 get 페이지로 이동
//        }
//
//        // 상품 등록 시 첫번째 이미지가 없으면 에러 발생 (첫 번째 이미지는 대표 상품 이미지여서 꼭 있어야함!)
//        if (itemImgFileList.get(0).isEmpty() && products.getId() == null) {
//            model.addAttribute("errorMessage", "첫번째 상품 이미지는 필수 입력 값 입니다.");
//            return "item/itemForm";// 에러가 발생하면 상품 등록 get 페이지로 이동
//        }
//
//        try { // 상품 저장 로직 호출
//            itemService.saveItem(products, itemImgFileList); // products: 상품 정보, itemImgFileList: 상품 이미지 정보들 리스트
//        } catch (Exception e) {
//            model.addAttribute("errorMessage", "상품 등록 중 에러가 발생하였습니다.");
//            return "item/itemForm";
//        }
//
//        return "redirect:/"; // 메인 페이지로 리다이렉트
//    } // 상품 등록 post
    
    
    // 상품 수정 get 페이지
//    @GetMapping(value = "/admin/item/{itemId}")
//    public String itemDtl(@PathVariable("itemId") Long itemId, Model model) {
//        try {
//            Products products = itemService.getItemDtl(itemId);
//            model.addAttribute("products", products); // 조회한 상품 데이터를 model에 담아서 뷰로 전달함
//        } catch (EntityNotFoundException e) {
//            model.addAttribute("errorMessage", "존재하지 않는 상품 입니다.");
//            model.addAttribute("products", new Products());
//            return "item/itemForm";
//        }
//
//        return "item/itemForm";
//    }

    // 상품 수정 post
//    @PostMapping(value = "/admin/item/{itemId}")
//    public String itemUpdate(@Valid Products products, BindingResult bindingResult,
//                             @RequestParam("itemImgFile") List<MultipartFile> itemImgFileList, Model model) {
//
//        // 상품 수정 시 필수 값이 없을 때 에러 발생
//        if (bindingResult.hasErrors()) {
//            return "item/itemForm"; // 에러가 발생하면 상품 수정 get 페이지로 이동
//        }
//
//        // 상품 수정 시 첫번째 이미지가 없으면 에러 발생 (첫 번째 이미지는 대표 상품 이미지여서 꼭 있어야함!)
//        if (itemImgFileList.get(0).isEmpty() && products.getId() == null) {
//            model.addAttribute("errorMessage", "첫번째 상품 이미지는 필수 입력 값 입니다.");
//            return "item/itemForm";// 에러가 발생하면 상품 수정 get 페이지로 이동
//        }
//
//        try {// 상품 수정 로직 호출
//            ProductService.updateItem(products, itemImgFileList); // products: 상품 정보, itemImgFileList: 상품 이미지 정보들 리스트
//        } catch (Exception e) {
//            model.addAttribute("errorMessage", "상품 수정 중 에러가 발생하였습니다.");
//            return "item/itemForm";
//        }
//
//        return "redirect:/"; // 메인 페이지로 리다이렉트
//    } // 상품 수정 post
    
    // 상품 관리 화면 get 페이지
//    @GetMapping(value = {"/admin/items", "/admin/items/{page}"})    	
//    public String itemManage(@ModelAttribute("products") Products products,
//                  @PathVariable("page") Optional<Integer> page, Model model) {
//        	
//    	// 한 페이지 당 8개만 보여줄거임
//        Pageable pageable = PageRequest.of(page.orElse(0), 8);
//        // 0: 조회할 페이지 번호, 8: 한 번에 가지고 올 데이터 수
//        // url 에 페이지 번호가 있으면은 그 페이지를 보여주고, url 에 번호가 없으면 0 페이지 보여줌
//
//        Page<Products> items = itemService.getAdminItemPage(products, pageable); // products: 조회 조건, pageable: 페이징 정보
//
//        model.addAttribute("items", items); // items: 조회한 상품 데이터
//        model.addAttribute("itemSearchDto", products); // 페이지 전환 시 기존 검색 조건을 유지한 채 이동할 수 있게 뷰에 전달
//        model.addAttribute("maxPage", 10); // 최대 10개의 이동할 페이지 번호를 보여줌
//
//        return "item/itemMng"; // 조회한 상품 데이터를 전달받는 페이지
//    }
//    
 // 상품 상세 get 페이지
//    @GetMapping(value = "/item/{prod_num}")
//    public String itemDtl(Model model, @PathVariable("itemId") Long itemId) {
//
//        // getItemDtl: service에 있는 메소드. 상품과 상품이미지의 entity를 바로 가져오는 service
//        Product product = itemService.getProductById(itemId);
//        ItemImage itemImage = itemService.getItemImageByProductId(itemId);
//
//        model.addAttribute("product", product);
//        model.addAttribute("prod_num", prod_num);
//
//        return "item/itemDtl";
//    }
    	
   
} //class
