package com.ojo.ojoa.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ojo.ojoa.domain.WishDTO;
import com.ojo.ojoa.entity.Wish;
import com.ojo.ojoa.service.WishService;

import lombok.AllArgsConstructor;
//import lombok.extern.log4j.Log4j2;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/wishR")
@Log4j2
@AllArgsConstructor
public class WishRestController {
    private final WishService wishService;
    
    @GetMapping(value = "/wishListR")
    public ResponseEntity<List<WishDTO>> wishlist() {
        List<WishDTO> result = wishService.findWishProd();
        
        if (!result.isEmpty()) {
            log.info("** Joined wish list retrieved successfully. HttpStatus.OK => " + HttpStatus.OK);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            log.info("** Failed to retrieve joined wish list. HttpStatus.BAD_REQUEST => " + HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}


	
	
	
