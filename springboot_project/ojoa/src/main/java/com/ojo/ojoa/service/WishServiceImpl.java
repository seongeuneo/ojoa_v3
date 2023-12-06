package com.ojo.ojoa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.DTO.CartDTO;
import com.ojo.ojoa.domain.CartProdDTO;
import com.ojo.ojoa.domain.WishDTO;
import com.ojo.ojoa.entity.Cart;
import com.ojo.ojoa.entity.Wish;
import com.ojo.ojoa.repository.CartRepository;
import com.ojo.ojoa.repository.WishRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

//@Log4j2
@Service
@RequiredArgsConstructor 
public class WishServiceImpl implements WishService {

    private final WishRepository wishRepository;

 // ** selectList
 	@Override
 	public List<Wish> selectList() {
 		return wishRepository.findAll();
 	}
 	
 	// ** selectOne
 	@Override
 	public Wish selectOne(int wish_num) {
 		Optional<Wish> result = wishRepository.findById(wish_num);
     	if ( result.isPresent() ) return result.get();
     	else return null;
 	}

 	// ** insert, update
 	@Override
 	public String save(Wish entity) {
 		wishRepository.save(entity); // 저장 또는 수정
         return entity.getId();   // 저장후 key return
 	}
 	 
 	// ** delete
 	@Override
 	public int delete(int wish_num) {
 		wishRepository.deleteById(wish_num);
 		return wish_num ; // 삭제후 key return
 	}
 	
 // ** (장바구니+상품) 테이블 Join 
 	@Override
 	public List<WishDTO> findWishProd(){
 	return wishRepository.findWishProd();
 	   } 
 	
 // ** react selectAllList
  	@Override
  	public List<WishDTO> selectAllList() {
  		return wishRepository.findAllWishList();
  	}
 	
 } //class
