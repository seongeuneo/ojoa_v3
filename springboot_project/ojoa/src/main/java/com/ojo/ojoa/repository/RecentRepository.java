package com.ojo.ojoa.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ojo.ojoa.entity.Recent;

public interface RecentRepository 
extends JpaRepository<Recent, Integer> {

//	void Duplicated(String id, int prod_num);
	
	   @Query("SELECT r FROM Recent r WHERE r.id = :id AND r.prod_num = :prod_num")
	   Optional<Recent> Duplicated(@Param("id") String id, @Param("prod_num") int prod_num);
}
