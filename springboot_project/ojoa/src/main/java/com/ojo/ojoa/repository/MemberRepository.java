package com.ojo.ojoa.repository;

import javax.persistence.Transient;
import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ojo.ojoa.entity.Member;

public interface MemberRepository 
					extends JpaRepository<Member, String> {
	@Transactional
	@Query("Select m from Member m order by m.name desc")
	Page<Member> getMemberList(Pageable pageable);
}
