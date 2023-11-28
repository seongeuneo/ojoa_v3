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

	// ** selectOne
	Product selectOne(int prod_num);

	// ** insert, update
	int save(Product entity);

	// ** delete
	int delete(int prod_num);

    
} //class
