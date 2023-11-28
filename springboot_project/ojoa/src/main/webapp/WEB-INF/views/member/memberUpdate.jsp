<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** MemberUpdate **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
<script src="/resources/myLib/jquery-3.2.1.min.js"></script>
</head>
<body>
<h2>** MemberUpdate **</h2>

<form action="memberUpdate" method="Post" enctype="multipart/form-data">
<table>

  <c:if test="${not empty requestScope.apple}">
	<tr height="40"><th bgcolor="Chocolate">I D</th>
		<td><input type="text" name="id" value="${requestScope.apple.id}" size="20" readonly autocomplete="username"></td></tr>
		<!-- id: 화면출력, 서버로 전송, 수정은불가(즉, input Tag 의 입력 막기) 
				 -> readonly: 서버로 전송 (권장)
				 -> disabled: 서버로 전송되지않음
		-->
		
		<!-- password 수정: 기본적으로 복호화불가능한 방식으로 암호화되어있기 때문에 별도로 처리
						-> 암호수정: 별도의 수정화면에서 재입력후 교체됨
					  	-> 암호찾기: 본인 재인증 후, 새암호를 발송 -> 새암호로 본인이 로그인후 수정  
		-->
		
	<tr height="40"><th bgcolor="Orange">Name</th>
		<td><input type="text" name="name" value="${requestScope.apple.name}" size="20" readonly>
		</td></tr>
		
	<tr height="40"><th bgcolor="Silver">Password</th>
		<td><input type="password" name="password" id="password" placeholder="영어, 숫자, 특수문자" size="20" autocomplete="new-password"><br>
			<span id="pMessage" class="eMessage"></span>
		</td></tr>	
	<tr height="40"><th bgcolor="Silver">Pw 확인</th>
      	<td><input type="password" id="password2" placeholder="재입력 확인" size="20" autocomplete="new-password"><br>
        	<span id="p2Message" class="eMessage"></span>
        </td></tr>
        
	<tr height="40">
    <th bgcolor="silver">주소</th>
    	<td colspan="2">
	        <input type="text" name="zipcode" id="zipcode" placeholder="우편번호입력" size="10">
	        <input class="inside_btn" type="submit" name="find_postcode" value="우편번호찾기"><br>
	        <input type="text" name="address" id="address" required>
	        <input type="text" name="addressdetail" id="addressdetail" placeholder="상세주소" size="10">
	        <span id="adMessage" class="eMessage"></span>
   		</td>
	</tr>
	
	<tr height="40">
	    <th bgcolor="silver">휴대폰 번호</th>
	    <td>
		    <input type="text" name="phonePrefix" id="phonePrefix" value="010" placeholder="010" size="1" readonly>&nbsp;-
		    <input type="text" name="phoneMiddle" id="phoneMiddle" size="3" maxlength="4">&nbsp;-
		    <input type="text" name="phoneSuffix" id="phoneSuffix" size="3" maxlength="4"><br>
       	<span id="phMessage" class="eMessage"></span>
		</td>
	</tr>

	<tr height="40">
   		<th bgcolor="silver">이메일</th>
   	 	<td colspan="2">
	        <input type="text" name="email" id="email" size="15" required>
	        @
	        <input type="text" id="domain" size="10" disabled>
	        <select name="email_domain" id="email_domain" onchange="handleDomainChange(this)">
	            <option value="self">선택</option>
	            <option value="naver.com">naver.com</option>
	            <option value="hanmail.net">hanmail.net</option>
	            <option value="gmail.com">gmail.com</option>
	            <option value="custom">직접입력</option>
	        </select><br>
	        <span id="emMessage" class="eMessage"></span>
    	</td>
	</tr>
	
	<tr height="40"><th bgcolor="Silver">SMS 수신 여부</th>
		<td><input type="radio" name="marketing_sms" id="marketing_sms" value="y"><label>수신함</label>
            <input type="radio" name="marketing_sms" id="marketing_smsNone" value="n" checked><label>수신안함</label>
            <span style="font-size: 12px; color: black;">&nbsp;&nbsp;&nbsp;쇼핑몰에서 제공하는 유익한 이벤트 소식을 SMS로 받으실 수 있습니다.</span>
       	</td></tr>	
	<tr height="40"><th bgcolor="Silver">이메일 수신 여부</th>
		<td><input type="radio" name="marketing_email" id="marketing_email" value="y"><label>수신함</label>
            <input type="radio" name="marketing_email" id="marketing_emailNone" value="n" checked><label>수신안함</label>
            <span style="font-size: 12px; color: black;">&nbsp;&nbsp;&nbsp;쇼핑몰에서 제공하는 유익한 이벤트 소식을 이메일로 받으실 수 있습니다.</span>
       	</td></tr>	
	
	<tr height="40"><th></th>
		<td><input type="submit" value="수정">&nbsp;&nbsp;&nbsp;
			<input type="reset" value="취소">	&nbsp;&nbsp;&nbsp;&nbsp;<a href="/home">[Password 수정]</a>&nbsp;	
		</td>
	</tr>
  </c:if>
  <c:if test="${empty requestScope.apple}">
  	<tr height="40"><td>~~ 수정할 자료가 존재하지 않습니다 ~~</td>
  	</tr>
  </c:if>				
</table>
</form>
<hr>
<c:if test="${not empty requestScope.message}">
=> ${requestScope.message}
</c:if>
<hr>
&nbsp;<a href="javascript:history.go(-1)">이전으로</a>&nbsp;
&nbsp;<a href="/home">Home</a>&nbsp;
</body>
</html>