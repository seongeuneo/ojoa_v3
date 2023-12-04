package com.ojo.ojoa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ojo.ojoa.DTO.CartDTO;
import com.ojo.ojoa.domain.CartProdDTO;
import com.ojo.ojoa.entity.Cart;

public interface CartRepository 
extends JpaRepository<Cart, Integer> {

	// 장바구니 + 상품 Join
	@Query("SELECT new com.ojo.ojoa.domain.CartProdDTO(c.cart_num, c.id, c.prod_num, c.quantity, p.prod_mainimage, p.prod_name) "
		+ "FROM Cart c LEFT JOIN Product p ON c.prod_num=p.prod_num order by c.prod_num")
	List<CartProdDTO> findCartProd();

	//React Join
	@Query("SELECT new com.ojo.ojoa.DTO.CartDTO(c.cart_num, c.id, c.prod_num, c.quantity, p.prod_mainimage, p.prod_name, p.prod_discount, p.prod_price1) "
			+ "FROM Cart c LEFT JOIN Product p ON c.prod_num=p.prod_num order by c.prod_num")
	List<CartDTO> findAllCartList();

	void save(int prod_num);
}
