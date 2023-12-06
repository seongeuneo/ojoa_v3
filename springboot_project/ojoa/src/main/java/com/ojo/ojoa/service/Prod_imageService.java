package com.ojo.ojoa.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.domain.Prod_imageDTO;
import com.ojo.ojoa.entity.Prod_image;


@Service
@Transactional
public interface Prod_imageService {
	
	// ** selectList
		List<Prod_image> selectList();

		// ** selectOne
		Prod_image selectOne(int prod_image);

		// ** insert, update
		int save(Prod_image entity);

		// ** delete
		int delete(int wish_num);

		//=================================
		
//		// ** Join (관심상품 + 상품)
//			 List<Prod_imageDTO> findProd_imageProd();
			 
		// ** react selectAllList
			List<Prod_imageDTO> selectAllList();

}
