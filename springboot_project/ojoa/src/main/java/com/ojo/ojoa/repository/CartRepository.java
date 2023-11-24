package com.ojo.ojoa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository 
extends JpaRepository<Cart, String> {
    // 현재 로그인 된 User의 id를 이용하여 유저 카트 찾기
    Cart findById(String id);
}
