<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Product Insert **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
<script src="/resources/myLib/jquery-3.2.1.min.js"></script>
<script src="/resources/myLib/inCheck.js"></script>
<script> "use strict"


function prodnameCheck() {
	// 1) 입력값의 무결성 확인
	if ( iCheck==false ) iCheck=idCheck();
	else {
	// 2) 서버로 id 확인요청 -> 결과는 새창으로 
		let url = "idDupCheck?id="+document.getElementById('id').value;
		window.open(url,'_blank','width=400,height=300,resizable=yes,scrollbars=yes,toolbar=no,menubar=yes'); 
	}
	
} //prodnameCheck

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
  let phCheck=false; // 전화번호
  let eCheck=false; // 이메일
  let mCheck=false; // 마케팅 수신 동의

// 3) submit 실행 여부 판단 & 실행
// => 모든항목의 무결성을 확인
// => 오류가 없으면 : return true
// => 오류가 1항목이라도 있으면 : return false 
function inCheck() {
	if (nCheck==false) { document.getElementById('nMessage').innerHTML=' 필수입력, name 을 확인하세요~~'; }
	if (iCheck==false) { document.getElementById('iMessage').innerHTML=' 필수입력, id 를 확인하세요~~'; }
	if (pCheck==false) { document.getElementById('pMessage').innerHTML=' 필수입력, password 를 확인하세요~~'; }
	if (p2Check==false) { document.getElementById('p2Message').innerHTML=' 필수입력, password 재입력을 확인하세요~~'; }
	if (zCheck==false) { document.getElementById('zMessage').innerHTML=' 필수입력, zipcode 를 확인하세요~~'; }
	if (aCheck==false) { document.getElementById('aMessage').innerHTML=' 필수입력, 주소 를 확인하세요~~'; }
	if (adCheck==false) { document.getElementById('adMessage').innerHTML=' 필수입력, 상세주소 를 확인하세요~~'; }
	if (phCheck==false) { document.getElementById('phMessage').innerHTML=' 필수입력, 전화번호 를 확인하세요~~'; }
	if (eCheck==false) { document.getElementById('eMessage').innerHTML=' 필수입력, 이메일 을 확인하세요~~'; }
	if (mCheck==false) { document.getElementById('mMessage').innerHTML=' 필수입력, 마케팅 수신 동의 를 확인하세요~~'; }
	
	if (nCheck && iCheck && pCheck && p2Check 
			   && zCheck && aCheck && adCheck && phCheck && eCheck && mCheck) {
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
<h2>** Spring_Boot Product Insert **</h2>

<form action="join" method="Post" enctype="multipart/form-data" id="myform">
<table>
	<tr height="40"><th bgcolor="aqua">상품이름</th>
		<td><input type="text" name="prod_name" id="prod_name" size="30"><br>
			<span id="nMessage" class="eMessage"></span>
		</td></tr>
	<tr height="40"><th bgcolor="aqua">I D</th>
		<td><input type="text" name="id" id="id" placeholder="영어, 10글자이내" size="10" autocomplete="id">
			<button type="button" id="idDup" onclick="idDupCheck()">ID중복확인</button>
			<br><span id="iMessage" class="eMessage"></span>
		</td></tr>
	<tr height="40"><th bgcolor="aqua">Password</th>
		<td><input type="password" name="pwd" id="pwd" placeholder="영어, 숫자, 특수문자" size="10" autocomplete="new-password"><br>
			<span id="pMessage" class="eMessage"></span>
		</td></tr>	
	<tr height="40"><th bgcolor="aqua">Pw 확인</th>
      	<td><input type="password" id="pwd2" placeholder="재입력 확인" size="10" autocomplete="new-password"><br>
        	<span id="p2Message" class="eMessage"></span>
        </td></tr>	
    <tr height="40"><th bgcolor="aqua">주소</th>
      	<td><input type="text" name="zipcode" id="zipcode" placeholder="우편번호입력" size="10">
      	<form action="" target="_blank"><input class="inside_btn" type="submit" name="find_postcode"
                                        value="우편번호찾기"></form><br>
                                        <input type="text" name="address" id="address" required>
                                <input type="text" name="addressdetail" id="addressdetail" placeholder="상세주소" size="10">
        	<span id="adMessage" class="eMessage"></span>
        </td></tr>
	<tr height="40"><th bgcolor="aqua">휴대폰 번호</th>
		<td><input type="tel" name="phone" placeholder="'-' 를 제외한 전화번호 입력" size="20" ><br>
        	<span id="phMessage" class="eMessage">
		</td></tr>
	<tr height="40"><th bgcolor="aqua">이메일</th>
		<td><input type="text" name="email" id="email" size="20">@<input type="text" size="10"><br>
        	<span id="eMessage" class="eMessage">
		<select name="email_domain">
            <option value="self">선택</option>
            <option value="naver">naver.com</option>
            <option value="daum">hanmail.net</option>
            <option value="gmail">gmail.com</option>
        </select>
		</td></tr>
	<tr height="40"><th bgcolor="aqua">마케팅 수신 동의</th>
		<td><input type="radio" name="marketing" id="marketing" value="2"><label>이메일</label>
            <input type="radio" name="marketing" id="marketing" value="3"><label>SMS</label>
            <input type="radio" name="marketing" id="marketing" value="1" checked><label>수신받지않음</label>
            <span style="font-size: 12px; color: red;">&nbsp;&nbsp;&nbsp;마케팅 수신에 동의하실 경우, Ojoa의 소식을 빠르게 받아보실 수 있습니다.</span>
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