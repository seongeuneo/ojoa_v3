package com.ojo.ojoa.service;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.domain.WishDTO;
import com.ojo.ojoa.entity.Wish;

@Service
@Transactional
public interface WishService {

	// ** selectList
	List<Wish> selectList();

	// ** selectOne
	Wish selectOne(int wish);

	// ** insert, update
	String save(Wish entity);

	// ** delete
	int delete(int wish_num);

	//=================================
	
	// ** Join (관심상품 + 상품)
		 List<WishDTO> findWishProd();
		 
	
    
}