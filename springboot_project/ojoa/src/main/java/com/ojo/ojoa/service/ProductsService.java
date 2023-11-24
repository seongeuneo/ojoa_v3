package com.ojo.ojoa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ojo.ojoa.entity.Products;
import com.ojo.ojoa.repository.ProductsRepository;

@Service
public class ProductsService {
	
	private final ProductsRepository productsRepository;
	
	@Autowired
    public ProductsService(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
    }

    public Products getProductsById(Long id) {
        // ProductsRepository를 통해 해당 id의 Products 엔티티를 가져오는 로직
        return productsRepository.findById(id).orElse(null);
    }

    public Products createProducts(Products products) {
        // ProductsRepository를 통해 새로운 Products 엔티티를 생성하고 저장하는 로직
        return productsRepository.save(products);
    }

    // 다른 필요한 메서드들을 추가로 구현할 수 있습니다.
	
} //class
