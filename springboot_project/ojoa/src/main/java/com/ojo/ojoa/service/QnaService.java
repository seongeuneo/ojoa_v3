package com.ojo.ojoa.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.entity.Qna;

@Service
@Transactional
public interface QnaService {
	List<Qna> selectList();

}
