package com.ojo.ojoa.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ojo.ojoa.entity.ShippingAddress;

public interface ShippingAddressRepository extends JpaRepository<ShippingAddress, Integer> {

	

}
