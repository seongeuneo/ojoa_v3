package com.ojo.ojoa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ojo.ojoa.entity.Product;
import com.ojo.ojoa.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

//@Log4j2
@Service
@RequiredArgsConstructor 
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    
 // ** selectList
 	@Override
 	public List<Product> selectList() {
 		return productRepository.findAll();
 	}
 	
 	// ** selectOne
 	@Override
 	public Product selectOne(int prod_num) {
 		Optional<Product> result = productRepository.findById(prod_num);
     	if ( result.isPresent() ) return result.get();
     	else return null;
 	}

 	// ** insert, update
 	@Override
 	public int save(Product entity) {
 		productRepository.save(entity); // 저장 또는 수정
         return entity.getProd_num();   // 저장후 key return
 	}
 	 
 	// ** delete
 	@Override
 	public int delete(int prod_num) {
 		productRepository.deleteById(prod_num);
 		return prod_num ; // 삭제후 key return
 	}
 	
 	@Override
    public Product getProductById(String productId) {
        int prodNum = Integer.parseInt(productId);
        Optional<Product> result = productRepository.findById(prodNum);
        return result.orElse(null);
    }
 	
 } //class
