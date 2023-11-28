package com.ojo.ojoa.service;

import java.util.List;

import org.springframework.stereotype.Service;

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
}
