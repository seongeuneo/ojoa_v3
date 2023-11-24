package com.ojo.ojoa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ojo.ojoa.entity.Users;

public interface UsersRepository 
					extends JpaRepository<Users, String> {
}
