package com.ojo.ojoa.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ojo.ojoa.domain.CartProdDTO;
import com.ojo.ojoa.domain.ProdIMGDTO;
import com.ojo.ojoa.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    
	// 평점
	@Modifying
	@Transactional
	@Query("UPDATE Product p SET p.prod_grade = (SELECT AVG(r.review_rate) FROM Review r WHERE r.prod_num = p.prod_num) WHERE p.prod_num = :prod_num")
	void update(@Param("prod_num") int prod_num);

	// 페이지네이션
	@Transactional
	@Query("Select p from Product p order by p.prod_name asc")
	Page<Product> getProductList(Pageable pageable);
	
	// 상품 + 상품이미지 Join
	@Query("SELECT new com.ojo.ojoa.domain.ProdIMGDTO(i.prod_image1, i.prod_image2, i.prod_image3, i.prod_image4, i.prod_imagedetail, p.prod_mainimage, p.prod_name, p.prod_content) "
			+ "FROM Prod_image i LEFT JOIN Product p ON i.prod_num=p.prod_num order by i.prod_num")
	List<ProdIMGDTO> findProdIMG();
	
	 @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Product p WHERE p.prod_name = :prod_name")
	boolean existsByProductName(String prod_name);
}
