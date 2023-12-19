package com.ojo.ojoa.repository;


import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ojo.ojoa.entity.Recent;

public interface RecentRepository 
extends JpaRepository<Recent, Integer> {

//	void Duplicated(String id, int prod_num);
	
	   @Query("SELECT r FROM Recent r WHERE r.id = :id AND r.prod_num = :prod_num")
	   Optional<Recent> Duplicated(@Param("id") String loginID, @Param("prod_num") int prod_num);
	   
	   
	   @Query("SELECT r FROM Recent r WHERE r.id = :id")
	   public List<Recent> recentList(@Param("id") String loginID);


//	   @Modifying
//	   @Query(nativeQuery = true, value = "DELETE FROM Recent r WHERE r.id = :id ORDER BY ASC LIMIT 2")
//	   void delete(@Param("id") String loginID);

	   @Transactional
	   @Modifying
	   @Query(nativeQuery = true, value = "DELETE FROM Recent r WHERE r.id = :id LIMIT 1")
	   void delete(@Param("id") String loginID);
}
