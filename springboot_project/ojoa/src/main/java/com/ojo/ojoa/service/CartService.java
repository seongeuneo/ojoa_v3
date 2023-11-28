package com.ojo.ojoa.service;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.entity.Cart;
import com.ojo.ojoa.entity.Product;
import com.ojo.ojoa.repository.CartRepository;

@Service
@Transactional
public interface CartService {

	// ** selectList
	List<Cart> selectList();

	// ** selectOne
	Cart selectOne(int cart_num);

	// ** insert, update
	String save(Cart entity);

	// ** delete
	int delete(int cart_num);

    
    
}