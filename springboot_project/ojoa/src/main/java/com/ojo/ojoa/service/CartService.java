package com.ojo.ojoa.service;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.DTO.CartDTO;
import com.ojo.ojoa.domain.CartProdDTO;
import com.ojo.ojoa.entity.Cart;
import com.ojo.ojoa.entity.CartId;

@Service
@Transactional
public interface CartService {

	// ** selectList
	List<Cart> selectList();
	
	// ** selectOne
	Cart selectOne(CartId cartid);

	// ** insert
	void save(Cart entity);

	// ** delete
	void delete(CartId cartid);
	
	
	// ** DUPLICATE KEY UPDATE 구문
	void CartUpdateUp(String id, int prod_num, int quantity);

	void CartUpdateDown(String id, int prod_num, int quantity);
//=================================================================
	
    // ** Join (장바구니 + 상품)
	List<CartProdDTO> findCartProd();
	 
	// ** react selectAllList
	List<CartDTO> selectAllList();
}
	
	