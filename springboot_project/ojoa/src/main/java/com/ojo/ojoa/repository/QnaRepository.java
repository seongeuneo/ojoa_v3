package com.ojo.ojoa.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ojo.ojoa.DTO.QnaDTO;
import com.ojo.ojoa.entity.Qna;

@Repository
public interface QnaRepository extends JpaRepository<Qna, Integer> {
	List<Qna> findAll();
	
	@Query("SELECT new com.ojo.ojoa.DTO.QnaDTO$QnaMainListDTO(q.qna_seq, p.prod_mainimage, p.prod_name, q.qna_category, q.qna_title, q.qna_content, '' AS titleIcon, q.id, q.qna_redate) FROM Qna q LEFT JOIN FETCH Product p ON q.prod_num = p.prod_num")
    List<QnaDTO.QnaMainListDTO> findAllQnaList();
	
	//Filter 조건
	@Query("SELECT new com.ojo.ojoa.DTO.QnaDTO$QnaMainListDTO(q.qna_seq, p.prod_mainimage, p.prod_name, q.qna_category, q.qna_title, q.qna_content, '' AS titleIcon, q.id, q.qna_redate) "
			+ "FROM Qna q LEFT JOIN FETCH Product p ON q.prod_num = p.prod_num "
			+ "WHERE (:board_category IS NULL OR :board_category = '' OR q.qna_category = :board_category) "
			//board_category가 null이거나 빈 문자열이면 무시, OR q.qna_category가 주어진 board_category와 일치하는지 확인
			+ "AND (:search_date IS NULL OR q.qna_redate >= :search_date) "
			//search_date가 null이거나 현재 날짜보다 이전인 경우를 무시, OR q.qna_redate가 주어진 search_date보다 크거나 같은지 확인
			+ "AND (:search_query IS NULL OR :search_query = '' OR  ( "
			//search_query가 null이거나 빈 문자열이면 무시, OR 다음 조건 중 하나를 만족하는지 확인
			+ "       (:search_key = 'subject' AND q.qna_title LIKE %:search_query%) OR "
			//search_key = 'subject'이고, q.qna_title이 주어진 search_query를 포함하는지 확인
			+ "       (:search_key = 'content' AND q.qna_content LIKE %:search_query%) OR "
			//search_key = 'content'이고, q.qna_content가 주어진 search_query를 포함하는지 확인
			+ "       (:search_key = 'writer_name' AND q.id LIKE %:search_query%) OR "
			//search_key = 'writer_name'이고, q.id가 주어진 search_query를 포함하는지 확인
			+ "       (:search_key = 'product' AND p.prod_name LIKE %:search_query%)))")
			//search_key = 'product'이고, p.prod_name이 주어진 search_query를 포함하는지 확인
			
		
	List<QnaDTO.QnaMainListDTO> findConditionQnaList(@Param("board_category") String board_category,
	    	@Param("search_date") LocalDateTime search_date,
   		    @Param("search_key") String search_key,
   		    @Param("search_query") String search_query);
	
} //class


