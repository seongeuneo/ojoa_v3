package com.ojo.ojoa.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ojo.ojoa.entity.Member;

public interface MemberService {
	
	

	// ** selectList
	public List<Member> selectList();

	// ** 페이지네이션
	public Page<Member> getMemberList(Pageable pageable);

	// ** selectOne
	public Member selectOne(String id);

	// ** save : insert, update
	public String save(Member entity);

	// ** delete
	public String delete(String id);

	// ** 패스워드 업데이트
	public boolean updatePassword(Member entity);

	// ** 아이디 찾기( 폰넘버와 이름으로 아이디 찾기...)
	String findIdByNameAndPhone(String name, String phone2, String phone3);
	
	Member checkUser(String id, String name, String email1, String email2);
	
}
