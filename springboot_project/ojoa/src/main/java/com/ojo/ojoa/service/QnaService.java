package com.ojo.ojoa.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.DTO.QnaDTO;
import com.ojo.ojoa.entity.Qna;

@Service
@Transactional
public interface QnaService {
	
	// 답변달기!!!
	int replyUpdate(int qna_seq, String qna_reply);
	
	 
	// ** selectList : qna데이터 목록 조회
	List<Qna> selectList();

	// ** selectOne : 특정 qna데이터 식별자('qna_seq')를 기반으로 조회
	Qna selectOne(int qna_seq);

	// ** insert, update
	int save(Qna entity);

	// ** delete
	int delete(int qna_seq);
	
	// ** reply
//	int rinsert(QnaDTO dto);
//	 boolean insertQnaReply(int qna_seq, String id, String qna_content);

//	public void replyinsert(int qna_seq, String qna_reply);
	
	// ** QnA 데이터 목록 조회 (검색조건 : 카테고리, 날짜, 키워드, 쿼리)받아와서 처리, QnaMainListDTO 객체의 리스트를 반환
	List<QnaDTO.QnaMainListDTO> selectAllList(String board_category, String search_date, String search_key, String search_query);


	//int Answerupdate(Qna updatedQna);
}
