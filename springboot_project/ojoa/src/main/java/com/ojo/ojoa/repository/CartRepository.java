package com.ojo.ojoa.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ojo.ojoa.DTO.CartDTO;
import com.ojo.ojoa.domain.CartProdDTO;
import com.ojo.ojoa.entity.Cart;
import com.ojo.ojoa.entity.CartId;

public interface CartRepository extends JpaRepository<Cart, CartId> {

	// 장바구니 + 상품 Join
	@Query("SELECT new com.ojo.ojoa.domain.CartProdDTO(c.id, c.prod_num, c.quantity, p.prod_mainimage, p.prod_name, p.prod_content) "
			+ "FROM Cart c LEFT JOIN Product p ON c.prod_num=p.prod_num order by c.prod_num")
	List<CartProdDTO> findCartProd();

	// React Join
	@Query("SELECT new com.ojo.ojoa.DTO.CartDTO(c.id, c.prod_num, c.quantity, p.prod_mainimage, p.prod_name, p.prod_discount, p.prod_price1, p.prod_content) "
			+ "FROM Cart c LEFT JOIN Product p ON c.prod_num=p.prod_num order by c.prod_num")
	List<CartDTO> findAllCartList();

	@Query("SELECT new com.ojo.ojoa.DTO.CartDTO(c.id, c.prod_num, c.quantity, p.prod_mainimage, p.prod_name, p.prod_discount, p.prod_price1, p.prod_content) "
			+ "FROM Cart c LEFT JOIN Product p ON c.prod_num=p.prod_num where c.id=:id order by c.prod_num")
	List<CartDTO> findAllUserID(@Param("id") String id);

	void save(int prod_num);

// =================== 복합키 설정한 부분 =================	
//	// ** Update 구문
//	@Modifying 
//	@Transactional
//	// => Native_SQL : OK (Table명 사용)	
//	@Query( nativeQuery=true, 
//			  value="update cart SET quantity=quantity+:quantity where id=:id and prod_num=:prod_num" )
//	void updateCount(@Param("id") String id, @Param("prod_num") int prod_num, @Param("quantity") int quantity);

	// ** DUPLICATE KEY UPDATE 구문
	@Modifying
	@Transactional
	@Query(nativeQuery = true, value = "insert into cart VALUES (:id, :prod_num, :quantity)"
			+ " ON DUPLICATE KEY UPDATE quantity = quantity+:quantity")
	void CartUpdateUp(@Param("id") String id, @Param("prod_num") int prod_num, @Param("quantity") int quantity);

	// ** DUPLICATE KEY UPDATE 구문
	@Modifying
	@Transactional
	@Query(nativeQuery = true, value = "insert into cart VALUES (:id, :prod_num, :quantity)"
			+ " ON DUPLICATE KEY UPDATE quantity = quantity-:quantity")
	void CartUpdateDown(@Param("id") String id, @Param("prod_num") int prod_num, @Param("quantity") int quantity);

	// ** id, prod_num 으로 카트 삭제
	@Modifying
	@Query("DELETE FROM Cart c WHERE c.id = :id AND c.prod_num = :prod_num")
	void deleteCartByUserIdAndProdNum(@Param("id") String id, @Param("prod_num") int prod_num);

}
