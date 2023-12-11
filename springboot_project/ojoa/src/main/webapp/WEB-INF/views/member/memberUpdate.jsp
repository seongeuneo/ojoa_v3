<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** MemberUpdate **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/Wish.css">
<script src="/resources/myLib/jquery-3.2.1.min.js"></script>
<script src="/resources/myLib/inCheck.js"></script>
<script>let loggedInUserID = "${sessionScope.loginID}";</script>
<script> "use strict"

//** 입력값의 무결성 점검 ***************************
//1) 전역변수 정의
//=> 입력값의 무결성 점검여부를 확인하는 switch 변수
let zCheck=false; // 우편번호
let aCheck=false; // 주소
let adCheck=false; // 상세주소
let ph2Check=false; // 전화번호2
let ph3Check=false; // 전화번호3
let e1Check=false; // 이메일1
let e2Check=false; // 이메일2(domain)

onload=function() {
	  
	// => Name
	//document.getElementById('name').focus();
	/* document.getElementById('name').addEventListener("keydown",
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
	 */
	
	// => zipcode ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	document.getElementById('zipcode').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('address').focus();
				} //if 		
			});
	// -> 무결성 확인
	document.getElementById('zipcode').addEventListener("focusout",
			()=> { zCheck=zipCheck(); });
	
	// => Address ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	document.getElementById('address').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('addressdetail').focus();
				} //if 		
			});
	// -> 무결성 확인
	document.getElementById('address').addEventListener("focusout",
			()=> { aCheck=addressCheck(); });
	
	// => Address_detail ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	document.getElementById('addressdetail').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('phone2').focus();
				} //if 		
			});
	// -> 무결성 확인
	document.getElementById('addressdetail').addEventListener("focusout",
			()=> { adCheck=addressdetailCheck(); });
	
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

function inCheck() {
	
	if (zCheck==false) { document.getElementById('zMessage').innerHTML=' 필수입력, zipcode 를 확인하세요~~'; }
	if (aCheck==false) { document.getElementById('aMessage').innerHTML=' 필수입력, 주소 를 확인하세요~~'; }
	if (adCheck==false) { document.getElementById('adMessage').innerHTML=' 필수입력, 상세주소 를 확인하세요~~'; }
	if (ph2Check==false) { document.getElementById('ph2Message').innerHTML=' 필수입력, 전화번호 를 확인하세요~~'; }
	if (ph3Check==false) { document.getElementById('ph3Message').innerHTML=' 필수입력, 전화번호 를 확인하세요~~'; }
	if (e1Check==false) { document.getElementById('em1Message').innerHTML=' 필수입력, 이메일 을 확인하세요~~'; }
	if (e2Check==false) { document.getElementById('em2Message').innerHTML=' 필수입력, 도메인 을 확인하세요~~'; }
	
	if ( zCheck && aCheck && adCheck && ph2Check && ph3Check && e1Check && e2Check ) {
		// => submit 확인
		if ( confirm(" 정말 수정 하십니까? (Yes:확인 / No:취소)") ) {
			// => submit 진행
			return true
		}else {
			alert("~~  정보 수정이 취소 되었습니다 ~~");
			return false;
		} //alert
	}else {
		return false;
	}
} //inCheck

</script>
</head>
<body>
<h2>** MemberUpdate **</h2>

<form action="member/memberUpdate" method="Post" enctype="multipart/form-data">
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
		<td><input type="text" name="name" value="${requestScope.apple.name}" size="20" readonly autocomplete="username">
		</td></tr>
		
   	<tr height="40" style="display: none;"><th bgcolor="Silver">Password</th>
		<td><input type="password" name="password" id="password" placeholder="영어, 숫자, 특수문자" value="${requestScope.apple.password}" size="20" autocomplete="new-password" readonly><br>
		</td>
	</tr>	
	<tr height="40" style="display: none;"><th bgcolor="Silver">Pw 확인</th>
      	<td><input type="password" id="password2" placeholder="재입력 확인" value="${requestScope.apple.password}" size="20" autocomplete="new-password" readonly><br>
        </td>
    </tr>
        
	<tr height="40">
    <th bgcolor="silver">주소</th>
    	<td colspan="2">
	        <input type="text" name="zipcode" id="zipcode" placeholder="우편번호입력" value="${requestScope.apple.zipcode}" size="10">
	        <input class="inside_btn" type="submit" name="find_postcode" value="우편번호찾기"><span id="zMessage" class="eMessage"></span><br>
	        <input type="text" name="address" id="address" value="${requestScope.apple.address}">
	        <input type="text" name="addressdetail" id="addressdetail" value="${requestScope.apple.addressdetail}" placeholder="상세주소" size="10">
	        <span id="aMessage" class="eMessage"></span>&nbsp;&nbsp;&nbsp;<span id="adMessage" class="eMessage"></span>
   		</td>
	</tr>
	
	<tr height="40">
	    <th bgcolor="silver">휴대폰 번호</th>
	    <td>
		    <input type="text" name="phone1" id="phone1" value="010" placeholder="010" size="1" readonly>&nbsp;-
		    <input type="text" name="phone2" id="phone2" value="${requestScope.apple.phone2}" size="3" maxlength="4">&nbsp;-
		    <input type="text" name="phone3" id="phone3" value="${requestScope.apple.phone3}" size="3" maxlength="4">
       	<span id="ph2Message" class="eMessage"></span>&nbsp;&nbsp;&nbsp;<span id="ph3Message" class="eMessage"></span>
		</td>
	</tr>

	<tr height="40">
   		<th bgcolor="silver">이메일</th>
   	 	<td colspan="2">
	        <input type="text" name="email1" id="email1" value="${requestScope.apple.email1}" size="15" >
	        @
	        <input type="text" name="email2" id="email2" value="${requestScope.apple.email2}" oninput="handleDirectInput(this)" size="10">
	        <span id="em1Message" class="eMessage"></span>&nbsp;&nbsp;&nbsp;<span id="em2Message" class="eMessage"></span>
    	</td>
	</tr>
	
	<tr height="40"><th bgcolor="Silver">SMS 수신 여부</th>
		<td><input type="radio" name="marketing_sms" id="marketing_sms" value="y"><label>SMS</label>
            <input type="radio" name="marketing_sms" id="marketing_smsNone" value="n" checked><label>수신받지않음</label>
            <span style="font-size: 12px; color: black;">&nbsp;&nbsp;&nbsp;쇼핑몰에서 제공하는 유익한 이벤트 소식을 SMS로 받으실 수 있습니다.</span>
       	</td></tr>	
	<tr height="40"><th bgcolor="Silver">이메일 수신 여부</th>
		<td><input type="radio" name="marketing_email" id="marketing_email" value="y"><label>이메일</label>
            <input type="radio" name="marketing_email" id="marketing_emailNone" value="n" checked><label>수신받지않음</label>
            <span style="font-size: 12px; color: black;">&nbsp;&nbsp;&nbsp;쇼핑몰에서 제공하는 유익한 이벤트 소식을 이메일로 받으실 수 있습니다.</span>
       	</td></tr>	
	
	<tr height="40"><th></th>
		<td><input type="submit" id="submitTag" value="수정" onclick="return inCheck()">&nbsp;&nbsp;&nbsp;
			<input type="reset" value="취소">	&nbsp;&nbsp;&nbsp;&nbsp;<a href="pUpdateForm?jCode=U&id=${sessionScope.loginID}">[Password 수정]</a>&nbsp;	
		</td>
	</tr>
  </c:if>
  <c:if test="${empty requestScope.apple}">
  	<tr height="40"><td>~~ 수정할 자료가 존재하지 않습니다 ~~</td>
  	</tr>
  </c:if>				
</table>
</form>
<c:if test="${not empty requestScope.message}">
=> ${requestScope.message}
</c:if>
<div class="home-link"><a href="/home">Home</a></div>
</body>
</html>