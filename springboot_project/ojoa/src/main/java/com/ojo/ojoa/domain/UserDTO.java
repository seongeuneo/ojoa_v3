package com.ojo.ojoa.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

	private String token;
	
    @JsonProperty("id")
    private String id;

    @JsonProperty("name")
    private String name;

}