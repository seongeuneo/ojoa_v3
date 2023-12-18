package com.ojo.ojoa.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.entity.ShippingAddress;

@Service
@Transactional
public interface ShippingAddressService {
	
	// ** selectList
	List<ShippingAddress> selectList();

	// ** selectOne
	ShippingAddress selectOne(int shippingAddress);

	// ** insert, update
	String save(ShippingAddress entity);

	// ** delete
	int delete(int shipping_num);

}
