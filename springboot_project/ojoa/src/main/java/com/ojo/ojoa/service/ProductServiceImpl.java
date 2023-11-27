package com.ojo.ojoa.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.entity.Product;
import com.ojo.ojoa.repository.ProductRepository;
import com.ojo.ojoa.service.ProductService;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> selectList() {
        return productRepository.findAll();
    }

    @Override
    public Product selectOne(int prod_num) {
        return productRepository.findById((long) prod_num).orElse(null);
    }

    @Override
    public String save(Product entity) {
        try {
            productRepository.save(entity);
            return "Product saved successfully";
        } catch (Exception e) {
            // Handle the exception, log it, or return an appropriate message
            return "Error saving product: " + e.getMessage();
        }
    }

    @Override
    public int delete(int prod_num) {
        try {
            productRepository.deleteById((long) prod_num);
            return 1; // 1 indicates success
        } catch (Exception e) {
            // Handle the exception, log it, or return an appropriate message
            return 0; // 0 indicates failure
        }
    }
}
