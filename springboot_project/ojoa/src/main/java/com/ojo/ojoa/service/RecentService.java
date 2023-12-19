package com.ojo.ojoa.service;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.entity.Recent;

@Service
@Transactional
public interface RecentService {

	// ** selectList
	List<Recent> recentList(String loginID);

	// ** selectOne
//	List<Recent> selectOne(int prod_num);

	// ** insert, update
	String save(Recent entity);


	// ** delete
	public void delete(String loginID);

	
    public int Duplicated(String loginID, int prod_num);

	  
    

    
}