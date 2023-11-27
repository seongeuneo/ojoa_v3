package com.ojo.ojoa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ojo.ojoa.entity.Member;
import com.ojo.ojoa.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

//@Log4j2
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

	private final MemberRepository repository;
	
	// ** selectList
	@Override
	public List<Member> selectList() {
		return repository.findAll();
	}
	
	// ** selectOne
	@Override
	public Member selectOne(String id) {
		Optional<Member> result = repository.findById(id);
    	if ( result.isPresent() ) return result.get();
    	else return null;
	}
	
	// ** insert, update
	@Override
	public String save(Member entity) {
		repository.save(entity); // 저장 또는 수정
		return entity.getId();   // 저장후 key return
	}

	// ** delete
	@Override
	public String delete(String id) {
		repository.deleteById(id);
		return id;  // 삭제후 key return 
	}
	
} //class
