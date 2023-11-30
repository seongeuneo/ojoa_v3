package com.ojo.ojoa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ojo.ojoa.entity.Qna;

@Repository
public interface QnaRepository extends JpaRepository<Qna, Integer> {
	List<Qna> findAll();
	
//	@Query("SELECT new com.ojo.ojoa.dto.QnaDto(A.qna_seq, B.prod_image, B.prod_name, A.qna_category, A.qna_title, A.qna_content, '' AS titleIcon, A.id, A.qna_redate) FROM Qna A LEFT JOIN Product B ON A.prod_num = B.prod_num")
//    List<QnaDto> findAllQnaList();
	
	//@Query(value = "SELECT A.qna_seq, B.prod_image, A.qna_category, A.qna_title, A.qna_content, A.id, A.qna_redate FROM qna A LEFT JOIN product B ON A.prod_num = B.prod_num")
	//List<Qna> findAllQnaList();
}


