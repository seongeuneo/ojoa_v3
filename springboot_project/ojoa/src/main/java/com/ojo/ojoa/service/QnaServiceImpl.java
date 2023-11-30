package com.ojo.ojoa.service;

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
	 	
	 	// ** react selectAllList
	 	@Override
	 	public List<QnaDTO> selectAllList() {
	 		return qnaRepository.findAllQnaList();
	 	}
}
