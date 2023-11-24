package com.ojo.ojoa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ojo.ojoa.entity.Products;

public interface ProductsRepository 
					extends JpaRepository<Products, Long> {
}
