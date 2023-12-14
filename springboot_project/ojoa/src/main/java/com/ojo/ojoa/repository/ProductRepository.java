package com.ojo.ojoa.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ojo.ojoa.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    
	@Modifying
	@Transactional
	@Query("UPDATE Product p SET p.prod_grade = (SELECT AVG(r.review_rate) FROM Review r WHERE r.prod_num = p.prod_num) WHERE p.prod_num = :prod_num")
	void update(@Param("prod_num") int prod_num);


}
