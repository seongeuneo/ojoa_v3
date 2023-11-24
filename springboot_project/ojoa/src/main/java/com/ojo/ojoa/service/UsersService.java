package com.ojo.ojoa.service;

import java.util.List;

import com.ojo.ojoa.entity.Users;

public interface UsersService {
	
	// ** selectList
	public List<Users> selectList();

	// ** selectOne
	public Users selectOne(String id);

	// ** save : insert, update
	public String save(Users entity);
		
	// ** delete
	public String delete(String id);
	
}
