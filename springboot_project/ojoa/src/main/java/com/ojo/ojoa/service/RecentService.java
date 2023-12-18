package com.ojo.ojoa.service;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.entity.Recent;
import com.ojo.ojoa.entity.Wish;

@Service
@Transactional
public interface RecentService {

	// ** selectList
	List<Recent> recentList(String id);

	// ** selectOne
	Recent selectOne(int recent_num);

	// ** insert, update
	String save(Recent entity);


	// ** delete
//	String delete(String id);

	
    public int Duplicated(String id, int prod_num); 
    

    
}