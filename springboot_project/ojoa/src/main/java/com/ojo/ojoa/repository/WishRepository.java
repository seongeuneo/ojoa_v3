package com.ojo.ojoa.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ojo.ojoa.DTO.CartDTO;
import com.ojo.ojoa.domain.WishDTO;
import com.ojo.ojoa.entity.Wish;

public interface WishRepository 
extends JpaRepository<Wish, Integer> {

	// 관심상품 + 상품 Join
	@Query("SELECT new com.ojo.ojoa.domain.WishDTO(w.wish_num, w.id, w.prod_num, p.prod_mainimage, p.prod_name) "
			+ "FROM Wish w LEFT JOIN Product p ON w.prod_num=p.prod_num order by w.prod_num")
	List<WishDTO> findWishProd();
	
	//React Join
		@Query("SELECT new com.ojo.ojoa.domain.WishDTO(w.wish_num, w.id, w.prod_num, p.prod_mainimage, p.prod_name) "
				+ "FROM Wish w LEFT JOIN Product p ON w.prod_num=p.prod_num order by w.prod_num")
	List<WishDTO> findAllWishList();
		
		
	// 사용자 ID와 상품 번호로 Wish를 찾는 쿼리 메서드 추가
    @Query("SELECT w FROM Wish w WHERE w.id = :userId AND w.prod_num = :prodNum")
    Wish findByUserIdAndProdNum(@Param("userId") String userId, @Param("prodNum") int prodNum);
    
	void save(int prod_num);

}
