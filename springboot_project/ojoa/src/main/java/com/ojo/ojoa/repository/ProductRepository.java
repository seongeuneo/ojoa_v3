package com.ojo.ojoa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ojo.ojoa.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

}
