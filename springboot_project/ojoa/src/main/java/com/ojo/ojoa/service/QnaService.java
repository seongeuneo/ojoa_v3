package com.ojo.ojoa.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.DTO.QnaDTO;
import com.ojo.ojoa.entity.Qna;

@Service
@Transactional
public interface QnaService {
	
	// ** selectList
	List<Qna> selectList();

	// ** selectOne
	Qna selectOne(int qna_seq);

	// ** insert, update
	int save(Qna entity);

	// ** delete
	int delete(int qna_seq);
	
	List<QnaDTO.QnaMainListDTO> selectAllList(String board_category, String search_date, String search_key, String search_query);
}
