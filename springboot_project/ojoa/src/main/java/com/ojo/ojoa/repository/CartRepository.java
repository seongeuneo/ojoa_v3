package com.ojo.ojoa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ojo.ojoa.entity.Cart;

public interface CartRepository 
extends JpaRepository<Cart, Integer> {


}
