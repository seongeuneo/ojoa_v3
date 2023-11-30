package com.ojo.ojoa.service;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.domain.CartProdDTO;
import com.ojo.ojoa.entity.Cart;

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

//=================================
	
// ** Join (장바구니 + 상품)
	 List<CartProdDTO> findCartProd();
}
	
	