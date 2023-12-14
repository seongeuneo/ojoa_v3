package com.ojo.ojoa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
	
<<<<<<< HEAD
	// ** 이름과 휴대폰 번호로 아이디 찾기
	@Override
    public Member findIdByNameAndPhone(String name, String phone2, String phone3) {
        // 해당 이름과 전화번호로 회원을 찾는 로직 추가
        return repository.findIdByNameAndPhone(name, phone2, phone3);
    }
=======
	@Override
	public Page<Member> getMemberList(Pageable pageable) {
		
		return repository.getMemberList(pageable);
	}
>>>>>>> main
	
	
	 @Override
    public String findIdByNameAndPhone(String name, String phone2, String phone3) {
        // 여기서 데이터베이스에서 ID를 찾는 로직을 구현합니다.
        // 예를 들어, Member 엔티티에서 이름과 전화번호를 이용하여 ID를 조회하는 코드가 있을 것입니다.
        // 이것은 실제 데이터베이스 구조 및 ORM 사용에 따라 다를 수 있습니다.
        // 아래 코드는 예시이며, 실제로는 이를 데이터베이스에 맞게 구현해야 합니다.

        Member foundMember = repository.findByNameAndPhone(name, phone2, phone3);
        
        if (foundMember != null) {
            return foundMember.getId();
        } else {
            return null;
        }
    }
	
} //class
