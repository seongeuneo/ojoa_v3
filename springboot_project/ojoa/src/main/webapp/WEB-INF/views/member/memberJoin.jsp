<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Users Join **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
<script src="/resources/myLib/jquery-3.2.1.min.js"></script>
<script src="/resources/myLib/inCheck.js"></script>
<script> "use strict"

function idDupCheck() {
	// 1) 입력값의 무결성 확인
	if ( iCheck==false ) iCheck=idCheck();
	else {
	// 2) 서버로 id 확인요청 -> 결과는 새창으로 
		let url = "idDupCheck?id="+document.getElementById('id').value;
		window.open(url,'_blank','width=400,height=300,resizable=yes,scrollbars=yes,toolbar=no,menubar=yes'); 
	}
} //idDupCheck

// ** 입력값의 무결성 점검 ***************************
// 1) 전역변수 정의
//=> 입력값의 무결성 점검여부를 확인하는 switch 변수
  let nCheck=false; // 이름
  let iCheck=false; // 아이디 중복확인
  let pCheck=false; // 비밀번호
  let p2Check=false; // 비밀번호 확인
  let zCheck=false; // 우편번호
  let aCheck=false; // 주소
  let adCheck=false; // 상세주소
  let ph1Check=false; // 전화번호1
  let ph2Check=false; // 전화번호2
  let ph3Check=false; // 전화번호3
  let e1Check=false; // 이메일1
  let e2Check=false; // 이메일2(domain)
  let sCheck=false; // sms 수신 동의
  let mCheck=false; // 이메일 수신 동의

onload=function() {
	  
	// => Name
	//document.getElementById('name').focus();
	document.getElementById('name').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('id').focus();
				} //if 		
			});
	// -> 무결성 확인
	document.getElementById('id').addEventListener('focusout',
			()=>{ nCheck=nmCheck(); }); 
	
	// => ID
	// -> keydown_EnterKey 에 포커스이동 적용
	// -> 제어문자의 ascii 코드 값(참고)
	//	  esc=27, EnterKey=13, Space_Bar=32
	document.getElementById('id').addEventListener('keydown', 
		(e) => { 
			if ( e.which==13 ) {
				e.preventDefault();
				// => form 에 submit 이 있는경우
				// => enter 누르면 자동 submit 발생되므로 이를 제거함
				document.getElementById('password').focus();
			} //if
		});
	// -> 무결성 확인
	document.getElementById('id').addEventListener('focusout',
			()=>{ iCheck=idCheck(); }); 	  
	  
	// => Password
	document.getElementById('password').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('password2').focus();
				} //if 		
			});
	// -> 무결성 확인
	document.getElementById('password').addEventListener("focusout",
			()=> { pCheck=pwCheck(); });
	
	// => Password2
	document.getElementById('password2').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('phone').focus();
				} //if 		
			});
	// -> 무결성 확인
	document.getElementById('password2').addEventListener("focusout",
			()=> { p2Check=pw2Check(); });
	
	// => Phone1 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	document.getElementById('phone1').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('phone2').focus();
				} //if 		
			});
	// -> 무결성 확인
	document.getElementById('phone1').addEventListener("focusout",
			()=> { ph1Check=pho1Check(); });
	
	// => Phone2 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	document.getElementById('phone2').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('phone3').focus();
				} //if 		
			});
	// -> 무결성 확인
	document.getElementById('phone2').addEventListener("focusout",
			()=> { ph2Check=pho2Check(); });
	
	// => Phone3 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	document.getElementById('phone3').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('email').focus();
				} //if 		
			});
	// -> 무결성 확인
	document.getElementById('phone3').addEventListener("focusout",
			()=> { ph3Check=pho3Check(); });
	
	// => Email1 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	document.getElementById('email1').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('email2').focus();
				} //if 		
			});
	// -> 무결성 확인
	document.getElementById('email1').addEventListener("focusout",
			()=> { e1Check=email1Check(); });
	
	// => Email2 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	document.getElementById('email2').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('submitTag').focus();
				} //if 		
			});
	// -> 무결성 확인
	document.getElementById('email2').addEventListener("focusout",
			()=> { e2Check=email2Check(); });
	
}; //onload
  
// 3) submit 실행 여부 판단 & 실행
// => 모든항목의 무결성을 확인
// => 오류가 없으면 : return true
// => 오류가 1항목이라도 있으면 : return false 
function inCheck() {
	
	if (nCheck==false) { document.getElementById('nMessage').innerHTML=' 필수입력, name 을 확인하세요~~'; }
	if (iCheck==false) { document.getElementById('iMessage').innerHTML=' 필수입력, id 를 확인하세요~~'; }
	if (pCheck==false) { document.getElementById('pMessage').innerHTML=' 필수입력, password 를 확인하세요~~'; }
	if (p2Check==false) { document.getElementById('p2Message').innerHTML=' 필수입력, password 재입력을 확인하세요~~'; }
	if (ph1Check==false) { document.getElementById('ph1Message').innerHTML=' 필수입력, 전화번호 를 확인하세요~~'; }
	if (ph2Check==false) { document.getElementById('ph2Message').innerHTML=' 필수입력, 전화번호 를 확인하세요~~'; }
	if (ph3Check==false) { document.getElementById('ph3Message').innerHTML=' 필수입력, 전화번호 를 확인하세요~~'; }
	if (e1Check==false) { document.getElementById('em1Message').innerHTML=' 필수입력, 이메일 을 확인하세요~~'; }
	if (e2Check==false) { document.getElementById('em2Message').innerHTML=' 필수입력, 도메인 을 확인하세요~~'; }
	
	if (nCheck && iCheck && pCheck && p2Check && ph1Check && ph2Check && ph3Check && e1Check && e2Check ) {
		// => submit 확인
		if ( confirm(" 정말 가입 하십니까? (Yes:확인 / No:취소)") ) {
			// => submit 진행
			return true
		}else {
			alert("~~  가입이 취소 되었습니다 ~~");
			return false;
		} //alert
	}else {
		return false;
	}
} //inCheck

</script>

</head>
<body>
<h2>** Member Join **</h2>

<form action="join" method="Post" enctype="multipart/form-data" id="myform">
<table>

	<tr height="40"><th bgcolor="silver">Name</th>
		<td><input type="text" name="name" id="name" placeholder="한글 또는 영어" size="10"><br>
			<span id="nMessage" class="eMessage"></span>
		</td></tr>
	<tr height="40"><th bgcolor="silver">I D</th>
		<td><input type="text" name="id" id="id" placeholder="영어, 10글자이내" size="10" autocomplete="id">
			<button type="button" id="idDup" onclick="idDupCheck()">ID중복확인</button>
			<br><span id="iMessage" class="eMessage"></span>
		</td></tr>
	<tr height="40"><th bgcolor="silver">Password</th>
		<td><input type="password" name="password" id="password" placeholder="영어, 숫자, 특수문자" size="10" autocomplete="new-password"><br>
			<span id="pMessage" class="eMessage"></span>
		</td></tr>	
	<tr height="40"><th bgcolor="silver">Pw 확인</th>
      	<td><input type="password" id="password2" placeholder="재입력 확인" size="10" autocomplete="new-password"><br>
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
		    <input type="text" name="phone1" id="phone1" value="010" placeholder="010" size="1" readonly>&nbsp;-
		    <input type="text" name="phone2" id="phone2" size="3" maxlength="4">&nbsp;-
		    <input type="text" name="phone3" id="phone3" size="3" maxlength="4"><br>
      	 	<span id="ph2Message" class="eMessage"></span>&nbsp;&nbsp;&nbsp;<span id="ph3Message" class="eMessage"></span>
		</td>
	</tr>

	<tr height="40">
   		<th bgcolor="silver">이메일</th>
   	 	<td colspan="2">
	        <input type="text" name="email1" id="email1" size="15" required>
	        @
	        <input type="text" id="email2" name="email2" size="10" disabled>
	        <select name="email_domain" id="email_domain" onchange="handleDomainChange(this)" onblur="handleCustomDomain()">
			    <option value="self">선택</option>
			    <option value="naver.com">naver.com</option>
			    <option value="hanmail.net">hanmail.net</option>
			    <option value="gmail.com">gmail.com</option>
			    <option value="custom">직접입력</option>
			</select><br>
	        <span id="em1Message" class="eMessage"></span>&nbsp;&nbsp;&nbsp;<span id="em2Message" class="eMessage"></span>
    	</td>
	</tr>
	<tr height="40"><th bgcolor="silver">SMS 수신 여부</th>
		<td><input type="radio" name="marketing_sms" id="marketing_sms" value="y"><label>수신함</label>
			<input type="radio" name="marketing_sms" id="marketing_smsNone" value="n" checked><label>수신안함</label>
			<span style="font-size: 12px; color: black;">&nbsp;&nbsp;&nbsp;쇼핑몰에서 제공하는 유익한 이벤트 소식을 SMS로 받으실 수 있습니다.</span>
       	</td></tr>	
	<tr height="40"><th bgcolor="silver">이메일 수신 여부</th>
		<td><input type="radio" name="marketing_email" id="marketing_email" value="y"><label>수신함</label>
			<input type="radio" name="marketing_email" id="marketing_emailNone" value="n" checked><label>수신안함</label>
			<span style="font-size: 12px; color: black;">&nbsp;&nbsp;&nbsp;쇼핑몰에서 제공하는 유익한 이벤트 소식을 이메일로 받으실 수 있습니다.</span>
       	</td></tr>	
				
	<tr height="40"><th></th>
		<td><input type="submit" id="submitTag" value="가입" onclick="return inCheck()" disabled>
			&nbsp;&nbsp;
			<input type="reset" value="취소">&nbsp;&nbsp;
		</td>
	</tr>					

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