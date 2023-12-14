package com.ojo.ojoa.repository;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ojo.ojoa.entity.Member;

public interface MemberRepository 
					extends JpaRepository<Member, String> {


	@Query("SELECT m FROM Member m WHERE m.name = :name AND m.phone2 = :phone2 AND m.phone3 = :phone3")
    Member findByNameAndPhone(@Param("name") String name, @Param("phone2") String phone2, @Param("phone3") String phone3);

	@Transactional
	@Query("Select m from Member m order by m.name desc")
	Page<Member> getMemberList(Pageable pageable);

}
