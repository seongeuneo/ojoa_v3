<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Spring_Boot Member Join **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
<script src="/resources/myLib/jquery-3.2.1.min.js"></script>
<script src="/resources/myLib/inCheck.js"></script>
<script> "use strict"

// ** ID 중복확인
// => UI 개선사항
// => 중복확인 버튼 추가
//    처음 : 중복확인버튼_enable / submit_disable
// => 중복확인 완료후 submit 이 가능하도록
//    중복확인버튼_disable / submit_enable
// => 중복확인 기능 : function idDupCheck()
//    id입력값의 무결성점검 -> id 확인요청 -> 서버로 전송 -> id , selectOne 결과 -> response: 사용가능/불가능 
// => 서버측 : 컨트롤러에 idDupCheck 요청을 처리하는 매핑메서드, view_Page(팝업창) 작성   
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
  let iCheck=false; 
  let pCheck=false;
  let p2Check=false;
  let nCheck=false;
  let aCheck=false; // 정수
  let bCheck=false;
  let oCheck=false; // Point 실수확인
  
//2) 개별적으로 확인
//=> 이벤트: focusout, keydown_EnterKey 적용
//=> 오류가 없으면: switch 변수값을 true로, 메시지삭제 
//=> 오류가 있다면: switch 변수값을 false로, 메시지출력	
//=> 순서: Tag인식 -> Tag의 value가져오기 -> 무결성확인

onload=function() {
	// => window.onload : window는 생략가능
	// => body 의 Tag 들을 인식가능한 상태일때 실행 되도록하기위함.
	
	// => ID
	// -> keydown_EnterKey 에 포커스이동 적용
	// -> 제어문자의 ascii 코드 값(참고)
	//	  esc=27, EnterKey=13, Space_Bar=32
	document.getElementById('id').focus();
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
	document.getElementById('password').addEventListener("focusout",
			()=> { pCheck=pwCheck(); });
	
	// => Password2
	document.getElementById('password2').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('name').focus();
				} //if 		
			});
	document.getElementById('password2').addEventListener("focusout",
			()=> { p2Check=pw2Check(); });
	
	// => Name
	document.getElementById('name').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('age').focus();
				} //if 		
			});
	document.getElementById('name').addEventListener("focusout",
			()=> { nCheck=nmCheck(); });
	
	// => Age
	document.getElementById('age').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('jno').focus();
				} //if 		
			});
	document.getElementById('age').addEventListener("focusout",
			()=> { aCheck=agCheck(); });
	
	// => Point
	document.getElementById('point').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('birthday').focus();
				} //if 		
			});
	document.getElementById('point').addEventListener("focusout",
			()=> { oCheck=poCheck(); });
	
	// => Birthday
	document.getElementById('birthday').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('rid').focus();
				} //if 		
			});
	document.getElementById('birthday').addEventListener("focusout",
			()=> { bCheck=bdCheck(); });
	
	// => Jno, Info, Rid, Image 는 EnterKey 처리(선택사항)
	document.getElementById('jno').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('info').focus();
				} //if 		
			});
	document.getElementById('info').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('point').focus();
				} //if 		
			});	
	document.getElementById('rid').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('uploadfilef').focus();
				} //if 		
			});
	document.getElementById('uploadfilef').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('submitTag').focus();
				} //if 		
			});
	
}; //onload 
	
// 3) submit 실행 여부 판단 & 실행
// => 모든항목의 무결성을 확인
// => 오류가 없으면 : return true
// => 오류가 1항목이라도 있으면 : return false 
function inCheck() {
	if (iCheck==false) { document.getElementById('iMessage').innerHTML=' 필수입력, id 를 확인하세요~~'; }
	if (pCheck==false) { document.getElementById('pMessage').innerHTML=' 필수입력, password 를 확인하세요~~'; }
	if (p2Check==false) { document.getElementById('p2Message').innerHTML=' 필수입력, password 재입력을 확인하세요~~'; }
	if (nCheck==false) { document.getElementById('nMessage').innerHTML=' 필수입력, name 을 확인하세요~~'; }
	if (aCheck==false) { document.getElementById('aMessage').innerHTML=' 필수입력, age 를 확인하세요~~'; }
	if (oCheck==false) { document.getElementById('oMessage').innerHTML=' 필수입력, point 를 확인하세요~~'; }
	if (bCheck==false) { document.getElementById('bMessage').innerHTML=' 필수입력, birthday 를 확인하세요~~'; }
	
	if (iCheck && pCheck && p2Check && nCheck 
			   && aCheck && oCheck && bCheck ) {
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
<h2>** Spring_Boot Member Join **</h2>
<!--  ** FileUpLoad Form **
=> form 과 table Tag 사용시 주의사항 : form 내부에 table 사용해야함
   -> form 단위작업시 인식안됨
   -> JQ 의 serialize, FormData 의 append all 등 

=> method="Post" : 255 byte 이상 대용량 전송 가능 하므로

=> <form enctype="속성값">
   <form> 태그의 데이터 (input 의 value)가 서버로 제출될때 해당 데이터가 인코딩되는 방법을 명시함.  
 
=> enctype="multipart/form-data" : 화일 upload 를 가능하게 해줌 
	** multipart/form-data는 파일업로드가 있는 입력양식요소에 사용되는 enctype 속성의 값중 하나이고, 
       multipart는 폼데이터가 여러 부분으로 나뉘어 서버로 전송되는 것을 의미
       이 폼이 제출될 때 이 형식을 서버에 알려주며, 
       multipart/form-data로 지정이 되어 있어야 서버에서 정상적으로 데이터를 처리할 수 있다.     
-->

<form action="join" method="Post" enctype="multipart/form-data" id="myform">
<table>
	<tr height="40"><th bgcolor="aqua">Name</th>
		<td><input type="text" name="name" id="name" placeholder="한글 또는 영어" size="20"><br>
			<span id="nMessage" class="eMessage"></span>
		</td></tr>
	<tr height="40"><th bgcolor="aqua">I D</th>
		<td><input type="text" name="id" id="id" placeholder="영어, 10글자이내" size="20">
			<button type="button" id="idDup" onclick="idDupCheck()">ID중복확인</button>
			<br><span id="iMessage" class="eMessage"></span>
		</td></tr>
	<tr height="40"><th bgcolor="aqua">Password</th>
		<td><input type="password" name="password" id="password" placeholder="영어, 숫자, 특수문자" size="20"><br>
			<span id="pMessage" class="eMessage"></span>
		</td></tr>	
	<tr height="40"><th bgcolor="aqua">Pw 확인</th>
      	<td><input type="password" id="password2" placeholder="재입력 확인"><br>
        	<span id="p2Message" class="eMessage"></span>
        </td></tr>	
        
    <tr height="40"><th bgcolor="aqua">주소</th>
      	<td><input type="password" id="password2" placeholder="우편번호입력">
      	<form action="" target="_blank"><input class="inside_btn" type="submit" name="find_postcode"
                                        value="우편번호찾기"></form><br>
                                        <input type="text" name="address" required>
                                <input type="text" name="address_detail" placeholder="상세주소">
        	<span id="p2Message" class="eMessage"></span>
        </td></tr>
        
        
        
	<tr height="40"><th bgcolor="aqua">휴대폰 번호</th>
		<td><input type="tel" name="first_phone_number" value="010" size="1" readonly>&ndash;
            <input type="tel" name="second_phone_number" minlength="3" maxlength="4" size="1" required>&ndash;
            <input type="tel" name="last_phone_number" minlength="4" maxlength="4" size="1" required>
		</td></tr>
	<tr height="40"><th bgcolor="aqua">이메일</th>
		<td><input type="text" size="20">@<input type="text" size="20">
		<select name="email_domain">
            <option value="self">선택</option>
            <option value="naver">naver.com</option>
            <option value="daum">hanmail.net</option>
            <option value="gmail">gmail.com</option>
        </select>
		</td></tr>
	<tr height="40"><th bgcolor="aqua">마케팅 수신 동의</th>
		<td><input type="radio" name="agree"><label>이메일</label>
            <input type="radio" name="agree"><label>SMS</label>
            <input type="radio" name="agree"><label>수신받지않음</label>
            <span>마케팅 수신에 동의하실 경우, Ojoa의 소식을 빠르게 받아보실 수 있습니다.</span>
       	</td></tr>
		
	<script>
	// 해당 파일의 서버상의 경로를 src로 지정하는것으로는 클라이언트 영역에서 이미지는 표시될수 없기 때문에
	// 이를 해결하기 위해 FileReader이라는 Web API를 사용
	// => 이 를 통해 url data를 얻을 수 있음.
	//    ( https://developer.mozilla.org/ko/docs/Web/API/FileReader)
	// ** FileReader
	// => 웹 애플리케이션이 비동기적으로 데이터를 읽기 위하여,
	//    읽을 파일을 가리키는File 혹은 Blob 객체를 이용해 파일의 내용을(혹은 raw data버퍼로) 읽고 
	//    사용자의 컴퓨터에 저장하는 것을 가능하게 해줌.	
	// => FileReader.readAsDataURL()
	//	  지정된 Blob의 내용 읽기를 시작하고, 완료되면 result 속성에 파일 데이터를 나타내는 data: URL이 포함됨.
	// => FileReader.onload 이벤트의 핸들러.
	//    읽기 동작이 성공적으로 완료 되었을 때마다 발생.
	// => e.target : 이벤트를 유발시킨 DOM 객체
	// => type="file" 은 복수개의 파일을 업로드할수 있도록 설계됨
	//    그러므로 files[] 배열 형태의 속성을 가짐
	</script>		
				
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