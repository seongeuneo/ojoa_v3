package com.ojo.ojoa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ojo.ojoa.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	 /*
     * 메뉴 아이디로 상품 목록 조회
     * @param categoryId
     * @return
     */
	
	 List<Product> findAllByCategoryId(Long categoryId);
}


