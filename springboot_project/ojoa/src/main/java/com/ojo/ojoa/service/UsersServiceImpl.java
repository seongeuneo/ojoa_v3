package com.ojo.ojoa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ojo.ojoa.entity.Users;
import com.ojo.ojoa.repository.UsersRepository;

import lombok.RequiredArgsConstructor;

//@Log4j2
@Service
@RequiredArgsConstructor
public class UsersServiceImpl implements UsersService {

	private final UsersRepository repository;
	
	// ** selectList
	@Override
	public List<Users> selectList() {
		return repository.findAll();
	}
	
	// ** selectOne
	@Override
	public Users selectOne(String id) {
		Optional<Users> result = repository.findById(id);
    	if ( result.isPresent() ) return result.get();
    	else return null;
	}
	
	// ** insert, update
	@Override
	public String save(Users entity) {
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
