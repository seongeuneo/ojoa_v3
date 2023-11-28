package com.ojo.ojoa.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.ojo.ojoa.entity.Wish;

public interface WishRepository 
extends JpaRepository<Wish, Integer> {


}
