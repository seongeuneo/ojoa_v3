package com.ojo.ojoa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ojo.ojoa.entity.Cart;
import com.ojo.ojoa.repository.CartRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

//@Log4j2
@Service
@RequiredArgsConstructor 
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

 // ** selectList
 	@Override
 	public List<Cart> selectList() {
 		return cartRepository.findAll();
 	}
 	
 	// ** selectOne
 	@Override
 	public Cart selectOne(int cart_num) {
 		Optional<Cart> result = cartRepository.findById(cart_num);
     	if ( result.isPresent() ) return result.get();
     	else return null;
 	}

 	// ** insert, update
 	@Override
 	public String save(Cart entity) {
 		cartRepository.save(entity); // 저장 또는 수정
         return entity.getId();   // 저장후 key return
 	}
 	 
 	// ** delete
 	@Override
 	public int delete(int cart_num) {
 		cartRepository.deleteById(cart_num);
 		return cart_num ; // 삭제후 key return
 	}
 	
 } //class
