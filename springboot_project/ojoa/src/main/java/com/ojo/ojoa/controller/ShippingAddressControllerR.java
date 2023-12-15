package com.ojo.ojoa.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ojo.ojoa.entity.ShippingAddress;
import com.ojo.ojoa.service.ShippingAddressService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor
@RestController
@Log4j2
@RequestMapping("/shippingAddress")
public class ShippingAddressControllerR {
	ShippingAddressService shippingAddressService;
	
	@GetMapping("/shippingAddressR/allShippingAddressList")
	public List<ShippingAddress> allShippingAddressList() {
		return shippingAddressService.selectList();
	}
}
