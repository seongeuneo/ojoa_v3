package com.ojo.ojoa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ojo.ojoa.domain.Prod_imageDTO;
import com.ojo.ojoa.domain.WishDTO;
import com.ojo.ojoa.entity.Prod_image;
import com.ojo.ojoa.entity.Wish;
import com.ojo.ojoa.repository.Prod_imageRepository;
import com.ojo.ojoa.repository.WishRepository;

import lombok.RequiredArgsConstructor;

//@Log4j2
@Service
@RequiredArgsConstructor 
public class Prod_imageServiceImpl implements Prod_imageService{

	private final Prod_imageRepository prod_imageRepository;

	 // ** selectList
	 	@Override
	 	public List<Prod_image> selectList() {
	 		return prod_imageRepository.findAll();
	 	}
	 	
	 	// ** selectOne
	 	@Override
	 	public Prod_image selectOne(int prod_imagenum) {
	 		Optional<Prod_image> result = prod_imageRepository.findById(prod_imagenum);
	     	if ( result.isPresent() ) return result.get();
	     	else return null;
	 	}

	 	// ** insert, update
	 	@Override
	 	public int save(Prod_image entity) {
	 		prod_imageRepository.save(entity); // 저장 또는 수정
	         return entity.getProd_num();   // 저장후 key return
	 	}
	 	 
	 	// ** delete
	 	@Override
	 	public int delete(int prod_imagenum) {
	 		prod_imageRepository.deleteById(prod_imagenum);
	 		return prod_imagenum ; // 삭제후 key return
	 	}
	 	
//	 // ** (장바구니+상품) 테이블 Join 
//	 	@Override
//	 	public List<Prod_imageDTO> findProd_imageProd(){
//	 	return prod_imageRepository.findProd_imageProd();
//	 	   } 
//	 	
//	 // ** react selectAllList
	  	@Override
	  	public List<Prod_imageDTO> selectAllList() {
	  		return prod_imageRepository.findAllProd_imageList();
	  	}
}
