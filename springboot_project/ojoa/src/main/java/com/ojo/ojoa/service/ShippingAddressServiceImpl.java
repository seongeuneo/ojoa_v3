package com.ojo.ojoa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ojo.ojoa.entity.ShippingAddress;
import com.ojo.ojoa.repository.ShippingAddressRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ShippingAddressServiceImpl implements ShippingAddressService{

	   private final ShippingAddressRepository shippingAddressRepository;

	   // ** selectList
	   	@Override
	   	public List<ShippingAddress> selectList() {
	   		return shippingAddressRepository.findAll();
	   	}
	   	
	   	// ** selectOne
	   	@Override
	   	public ShippingAddress selectOne(int shippingAddress) {
	   		Optional<ShippingAddress> result = shippingAddressRepository.findById(shippingAddress);
	       	if ( result.isPresent() ) return result.get();
	       	else return null;
	   	}

	   	// ** insert, update
	   	@Override
	   	public String save(ShippingAddress entity) {
	   		shippingAddressRepository.save(entity); // 저장 또는 수정
	           return entity.getId();   // 저장후 key return
	   	}
	   	 
	   	// ** delete
	   	@Override
	   	public int delete(int shipping_num) {
	   		shippingAddressRepository.deleteById(shipping_num);
	   		return shipping_num ; // 삭제후 key return
	   	}
	   	
}
