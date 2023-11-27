package com.ojo.ojoa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ojo.ojoa.entity.Products;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Long> {

	 /*
     * 메뉴 아이디로 상품 목록 조회
     * @param categoryId
     * @return
     */
	
	 List<Products> findAllByCategoryId(Long categoryId);
}
