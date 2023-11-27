package com.ojo.ojoa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ojo.ojoa.entity.Notice;

public interface NoticeRepository 
extends JpaRepository<Notice, String> {

}
