package com.ojo.ojoa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ojo.ojoa.domain.Prod_imageDTO;
import com.ojo.ojoa.entity.Prod_image;

@Repository
public interface Prod_imageRepository extends JpaRepository<Prod_image, Integer> { 
	

//	//  + 상품 Join
//		@Query("SELECT new com.ojo.ojoa.domain.Prod_imageDTO(i.wish_num, i.prod_num, p.prod_mainimage, p.prod_name) "
//				+ "FROM Prod_image i LEFT JOIN Product p ON i.prod_num=p.prod_num order by i.prod_num")
//		List<Prod_imageDTO> findProd_imageProd();
//		
		//React Join
	@Query("SELECT new com.ojo.ojoa.domain.Prod_imageDTO(i.prod_imagenum, i.prod_num, i.prod_image1, i.prod_image2, i.prod_image3, i.prod_image4, i.prod_imagedetail) FROM Prod_image i LEFT JOIN Product p ON i.prod_num=p.prod_num order by i.prod_num")
	List<Prod_imageDTO> findAllProd_imageList();

			
		
		void save(int prod_num);
}
