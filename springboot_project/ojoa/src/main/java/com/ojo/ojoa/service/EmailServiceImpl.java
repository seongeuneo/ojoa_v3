package com.ojo.ojoa.service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

   private final JavaMailSender sender;

   @Value("${spring.mail.username}")
   private String fromAddress;

   @Override
   public void sendEmail(String id, String name, String email1, String randomPW) {
      MimeMessage message = sender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

      try {
         helper.setFrom(fromAddress);
         helper.setTo(id);
         helper.setSubject("[TBT Concept 임시 비밀번호 입니다.]"); //메일 제목

         String htmlContent = "<h1>임시비밀번호 발급</h1>" + "<br/>" 
               + name + "님 " 
               + "<br/>비밀번호 찾기를 통한 임시 비밀번호입니다."
               + "<br/>임시비밀번호 :   <h2>" + randomPW + "</h2>" + "<br/>로그인 후 비밀번호 변경을 해주세요."
               + "<br/><a href='http://localhost:3000/login'>로그인페이지 바로가기</a>";

         helper.setText(htmlContent, true);

         sender.send(message);
      } catch (MessagingException e) {
         // 예외 처리
         e.printStackTrace();
      }
   }
}