package com.ojo.ojoa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ojo.ojoa.DTO.CartDTO;
import com.ojo.ojoa.domain.CartProdDTO;
import com.ojo.ojoa.entity.Cart;
import com.ojo.ojoa.entity.CartId;
import com.ojo.ojoa.repository.CartRepository;

import lombok.RequiredArgsConstructor;

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
 	public Cart selectOne(CartId cartid) {
 		Optional<Cart> result = cartRepository.findById(cartid);
     	if ( result.isPresent() ) return result.get();
     	else return null;
 	}

    // => insert
    @Override
    public void save(Cart entity) {
    	cartRepository.save(entity); // 저장 또는 수정
    }
 	 
 	// ** delete
 	@Override
 	public void delete(CartId cartid) {
 		cartRepository.deleteById(cartid);
 		//return cartid ; // 삭제후 key return
 	}
 	
 	
	// ** DUPLICATE KEY UPDATE 구문
    @Override
    public void CartUpdateUp(String id, int prod_num, int quantity) {
    	cartRepository.CartUpdateUp(id, prod_num, quantity);
    }	
 	
    // ** DUPLICATE KEY UPDATE 구문
    @Override
    public void CartUpdateDown(String id, int prod_num, int quantity) {
    	cartRepository.CartUpdateDown(id, prod_num, quantity);
    }	
    
 	
 	
 	// ** (장바구니+상품) 테이블 Join 
	@Override
	public List<CartProdDTO> findCartProd(){
	return cartRepository.findCartProd();
	} 	
 	
	// ** react selectAllList
 	@Override
 	public List<CartDTO> selectAllList(String loginID) {
 		return cartRepository.findAllUserID(loginID);
 	}
	
 } //class