package com.ojo.ojoa.service;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.domain.CartProdDTO;
import com.ojo.ojoa.domain.ProdIMGDTO;
import com.ojo.ojoa.entity.Product;

@Service
@Transactional
public interface ProductService {

	// ** selectList
	List<Product> selectList();
	
	// ** 페이지네이션
	public Page<Product> getProductList(Pageable pageable);

	// ** selectOne
	Product selectOne(int prod_num);

	// ** insert, update
	int save(Product entity);
	
	// 평점을 위한 업데이트
	void update(int prod_num);

	// ** delete
	int delete(int prod_num);

	// 새로운 메서드 추가
    Product getProductById(String productId);
    
    // 평점
    public void rUpdate(Integer prod_num);
    
    // ** Join (findProdIMG)
  	List<ProdIMGDTO> findProdIMG();
  	
  	// 새로운 메서드 추가: 페이지네이션된 제품 목록과 제품 이미지 정보 반환
    public Map<String, Object> getProductListWithImages(Pageable pageable);

    
    
} //class
