package com.ojo.ojoa.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.entity.Product;

@Service
@Transactional
public interface ProductService {

	// ** selectList
	List<Product> selectList();
	
	// 페이지네이션
	// Page<Product> getProductList(Pageable pageable);
	// 레파짓토리쿼리문 서비스 서비스임플 컨트롤러

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
    
    
} //class
