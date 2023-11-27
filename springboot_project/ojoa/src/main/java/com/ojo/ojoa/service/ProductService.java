package com.ojo.ojoa.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.entity.Orders;
import com.ojo.ojoa.entity.Product;
import com.ojo.ojoa.repository.ProductRepository;

@Service
@Transactional
public interface ProductService {

	// ** selectList
	List<Product> selectList();

	// ** selectOne
	Product selectOne(int prod_num);

	// ** insert, update
	String save(Product entity);

	// ** cancel
	int delete(int prod_num);
    
    
}
