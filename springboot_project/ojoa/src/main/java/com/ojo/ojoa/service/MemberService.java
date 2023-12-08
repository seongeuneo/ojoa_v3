package com.ojo.ojoa.service;

import java.util.List;

import com.ojo.ojoa.entity.Member;


public interface MemberService {
	
	// ** selectList
	public List<Member> selectList();

	// ** selectOne
	public Member selectOne(String id);

	// ** save : insert, update
	public String save(Member entity);
		
	// ** delete
	public String delete(String id);
	
	// ** 패스워드 업데이트
    public boolean updatePassword(Member entity);
   

}
