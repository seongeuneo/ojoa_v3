package com.ojo.ojoa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ojo.ojoa.entity.Orders;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Integer> {


	
    // 추가적인 주문과 관련된 쿼리 메서드들을 정의할 수 있어요.
}