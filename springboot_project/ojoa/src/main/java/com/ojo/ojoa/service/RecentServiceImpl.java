package com.ojo.ojoa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ojo.ojoa.entity.Recent;
import com.ojo.ojoa.repository.RecentRepository;

import lombok.RequiredArgsConstructor;

//@Log4j2
@Service
@RequiredArgsConstructor 
public class RecentServiceImpl implements RecentService {

    private final RecentRepository recentRepository;

 // ** selectList

	@Override
 	public List<Recent> recentList(String id){
 		return recentRepository.findAll();
 	}
 	
 	// ** selectOne
 	@Override
 	public Recent selectOne(int recent_num) {
 		Optional<Recent> result = recentRepository.findById(recent_num);
     	if ( result.isPresent() ) return result.get();
     	else return null;
 	}

 	// ** insert, update
 	@Override
 	public String save(Recent entity) {
 		recentRepository.save(entity); // 저장 또는 수정
         return entity.getId();   // 저장후 key return
 	}
 	 
 	// ** delete
// 	@Override
// 	public String delete(String id) {
// 		recentRepository.deleteById(id);
// 		return id; // 삭제후 key return
// 	}
// 	



 	@Override
    public int Duplicated(String id, int prod_num) {
       Optional<Recent> result = recentRepository.Duplicated(id, prod_num);
       if (result.isPresent())
          return 1;
       else
          return 0;
    }
 	
 } //class
