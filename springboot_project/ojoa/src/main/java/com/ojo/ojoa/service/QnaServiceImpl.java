package com.ojo.ojoa.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ojo.ojoa.DTO.QnaDTO;
import com.ojo.ojoa.entity.Qna;
import com.ojo.ojoa.repository.QnaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor 
public class QnaServiceImpl implements QnaService {

	 private final QnaRepository qnaRepository;

	 // ** selectList
	 	@Override
	 	public List<Qna> selectList() {
	 		return qnaRepository.findAll();
	 	}
	 	
	 // ** selectOne
	 	@Override
	 	public Qna selectOne(int qna_seq) {
	 		Optional<Qna> result = qnaRepository.findById(qna_seq);
	     	if ( result.isPresent() ) return result.get();
	     	else return null;
	 	}

	 	// ** insert, update
	 	@Override
	 	public int save(Qna entity) {
	 		qnaRepository.save(entity); // 저장 또는 수정
	         return entity.getQna_seq();   // 저장후 key return
	 	}
	 	 
	 	// ** delete
	 	@Override
	 	public int delete(int qna_seq) {
	 		qnaRepository.deleteById(qna_seq);
	 		return qna_seq ; // 삭제후 key return
	 	}
	 	
	 	@Override
	 	public List<QnaDTO.QnaMainListDTO> selectAllList(String board_category, String search_date, String search_key, String search_query) {
	 		
	 		board_category = board_category != null ? board_category.trim() : "";
	 		search_date = search_date != null ? search_date.trim() : "";
	 		search_query = search_query != null ? search_query.trim() : "";
	 		if (board_category.isEmpty() && search_date.isEmpty() && search_query.isEmpty()) {
	 			return qnaRepository.findAllQnaList();
	 		} else {
	 			
	 			LocalDateTime currentDate = LocalDateTime.now();
	 			
	 	        if ("week".equals(search_date)) {
	 	        	search_date = currentDate.minus(1, ChronoUnit.WEEKS).toString();
	 	        } else if ("month".equals(search_date)) {
	 	        	search_date = currentDate.minus(1, ChronoUnit.MONTHS).toString();
	 	        } else if ("month3".equals(search_date)) {
	 	        	search_date = currentDate.minus(3, ChronoUnit.MONTHS).toString();
	 	        } else {
	 	        	search_date = "";
	 	        }
	 	        
	 	        LocalDateTime searchDate = (search_date != null && !search_date.isEmpty()) ? LocalDateTime.parse(search_date) : null;

	 	       
	 			return qnaRepository.findConditionQnaList(board_category, searchDate, search_key, search_query);
	 		}
	 	}
}
