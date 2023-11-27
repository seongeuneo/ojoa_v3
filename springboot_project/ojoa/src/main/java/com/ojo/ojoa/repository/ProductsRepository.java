package com.ojo.ojoa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ojo.ojoa.entity.Products;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Long> {

}
