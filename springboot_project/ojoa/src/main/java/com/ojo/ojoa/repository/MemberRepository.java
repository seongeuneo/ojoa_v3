package com.ojo.ojoa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ojo.ojoa.entity.Member;

public interface MemberRepository 
					extends JpaRepository<Member, String> {
}
