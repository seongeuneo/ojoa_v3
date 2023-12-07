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
		 
	// ** react selectAllList
		List<WishDTO> selectAllList();
		
	 // 사용자 ID와 상품 번호로 Wish를 찾는 메서드 추가
    Wish selectOneByUserIdAndProdNum(String userId, int prodNum);
		

    
}