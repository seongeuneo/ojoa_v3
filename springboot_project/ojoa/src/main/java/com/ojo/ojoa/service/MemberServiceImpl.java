package com.ojo.ojoa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ojo.ojoa.entity.Member;
import com.ojo.ojoa.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

//@Log4j2
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

	private final MemberRepository repository;
	
	// ** password update
	@Override
    public boolean updatePassword(Member entity) {
        try {
            Member existingMember = repository.findById(entity.getId()).orElse(null);

            if (existingMember != null) {
                existingMember.setPassword(entity.getPassword());
                repository.save(existingMember);
                return true;
            }
        } catch (Exception e) {
            // 예외 처리
            e.printStackTrace();
        }
        return false;
    }
	
	// ** selectList
	@Override
	public List<Member> selectList() {
		return repository.findAll();
	}
	
	// ** selectOne
	@Override
	public Member selectOne(String id) {
		Optional<Member> result = repository.findById(id);
    	if ( result.isPresent() ) return result.get();
    	else return null;
	}
	
	// ** insert, update
	@Override
	public String save(Member entity) {
		repository.save(entity); // 저장 또는 수정
		return entity.getId();   // 저장후 key return
	}

	// ** delete
	@Override
	public String delete(String id) {
		repository.deleteById(id);
		return id;  // 삭제후 key return 
	}
	
	// ** 이름과 휴대폰 번호로 아이디 찾기
	@Override
    public Member findIdByNameAndPhone(String name, String phone2, String phone3) {
        // 해당 이름과 전화번호로 회원을 찾는 로직 추가
        return repository.findIdByNameAndPhone(name, phone2, phone3);
    }
	
	
} //class
