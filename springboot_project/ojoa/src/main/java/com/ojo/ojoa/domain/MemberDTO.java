package com.ojo.ojoa.domain;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {

    @JsonProperty("id")
    private String id;

    @JsonProperty("password")
    private String password;

    @JsonProperty("name")
    private String name;

    @JsonProperty("zipcode")
    private String zipcode;

    @JsonProperty("address")
    private String address;

    @JsonProperty("addressdetail")
    private String addressDetail;

    @JsonProperty("memberyn")
    private String memberyn;

    @JsonProperty("regdate")
    private LocalDateTime regdate;
    
    @JsonProperty("marketing_sms")
    private String marketing_sms;

    @JsonProperty("marketing_email")
    private String marketing_email;

    @JsonProperty("email1")
    private String email1;

    @JsonProperty("email2")
    private String email2;

    @JsonProperty("phone1")
    private String phone1;

    @JsonProperty("phone2")
    private String phone2;

    @JsonProperty("phone3")
    private String phone3;

    @JsonProperty("mileage")
    private Integer mileage;

//    public MemberDTO(String id, String password, String name, String zipcode, String address,
//                     String addressDetail, String memberyn, LocalDateTime regdate, String marketing_sms, String marketing_email,
//                     String email1, String email2, String phone1, String phone2, String phone3,
//                     Integer mileage) {
//    	
//    	
//        this.id = id;
//        this.password = password;
//        this.name = name;
//        this.zipcode = zipcode;
//        this.address = address;
//        this.addressDetail = addressDetail;
//        this.memberyn = memberyn;
//        this.regdate = regdate;
//        this.marketing_sms = marketing_sms;
//        this.marketing_email = marketing_email;
//        this.email1 = email1;
//        this.email2 = email2;
//        this.phone1 = phone1;
//        this.phone2 = phone2;
//        this.phone3 = phone3;
//        this.mileage = mileage;
//    }

}