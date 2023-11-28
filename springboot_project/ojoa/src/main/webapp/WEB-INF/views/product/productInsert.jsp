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

//** ID 중복확인
//=> UI 개선사항
//=> 중복확인 버튼 추가
// 처음 : 중복확인버튼_enable / submit_disable
//=> 중복확인 완료후 submit 이 가능하도록
// 중복확인버튼_disable / submit_enable
//=> 중복확인 기능 : function idDupCheck()
// id입력값의 무결성점검 -> id 확인요청 -> 서버로 전송 -> id , selectOne 결과 -> response: 사용가능/불가능 
//=> 서버측 : 컨트롤러에 idDupCheck 요청을 처리하는 매핑메서드, view_Page(팝업창) 작성  

function idDupCheck() {
	// 1) 입력값의 무결성 확인
	if ( pdnCheck==false ) pdnCheck=pdnCheck();
	else {
	// 2) 서버로 id 확인요청 -> 결과는 새창으로 
		let url = "idDupCheck?id="+document.getElementById('id').value;
		window.open(url,'_blank','width=400,height=300,resizable=yes,scrollbars=yes,toolbar=no,menubar=yes'); 
	}
	
} //idDupCheck




// ** 입력값의 무결성 점검 ***************************
// 1) 전역변수 정의
//=> 입력값의 무결성 점검여부를 확인하는 switch 변수
  let pdnCheck=false; // 상품 이름
  let pdkCheck=false; // 상품 종류
  let pdpCheck=false; // 상품 가격
  let pdcCheck=false; // 상품 설명
  let pdynCheck=false; // 상품 판매유무
  let pdsCheck=false; // 재고 수량
  let pdrCheck=false; // 상품 등록일
  

// 3) submit 실행 여부 판단 & 실행
// => 모든항목의 무결성을 확인
// => 오류가 없으면 : return true
// => 오류가 1항목이라도 있으면 : return false 
function inCheck() {
	if (pdnCheck==false) { document.getElementById('pdnMessage').innerHTML=' 필수입력, 상품이름 을 확인하세요~~'; }
	if (pdkCheck==false) { document.getElementById('pdkMessage').innerHTML=' 필수입력, 상품종류 를 확인하세요~~'; }
	if (pdpCheck==false) { document.getElementById('pdpMessage').innerHTML=' 필수입력, 상품가격 을 확인하세요~~'; }
	if (pdcCheck==false) { document.getElementById('pdcMessage').innerHTML=' 필수입력, 상품설명 을 확인하세요~~'; }
	if (pdynCheck==false) { document.getElementById('pdynMessage').innerHTML=' 필수입력, 판매유무 를 선택하세요~~'; }
	if (pdsCheck==false) { document.getElementById('pdsMessage').innerHTML=' 필수입력, 재고수량 을 확인하세요~~'; }
	if (pdrCheck==false) { document.getElementById('pdrMessage').innerHTML=' 필수입력, 등록일 을 확인하세요~~'; }
	
	if (pdnCheck && pdkCheck && pdpCheck && pdcCheck 
			   && pdynCheck && pdsCheck && pdrCheck) {
		// => submit 확인
		if ( confirm(" 상품 등록을 하시겠습니까? (Yes:확인 / No:취소)") ) {
			// => submit 진행
			return true
		}else {
			alert("~~  상품등록이 취소 되었습니다 ~~");
			return false;
		} //alert
	}else {
		return false;
	}
} //inCheck
</script>

</head>

<body>
<h2>** Spring_Boot Product Insert 상품등록 **</h2>

<form action="productInsert" method="Post" enctype="multipart/form-data" id="myform">
<table>

	<tr height="40"><th bgcolor="aqua">상품이름</th>
		<td><input type="text" name="prod_name" id="prod_name" size="30" autocomplete="id">
			<button type="button" id="idDup" onclick="idDupCheck()">중복확인</button>
			<br><span id="pdnMessage" class="eMessage"></span>
		</td></tr>

			<tr height="40">
				<th bgcolor="aqua">상품 종류</th>
				<td><select name="prod_kind" id="prod_kind">
						<option value="침대">침대</option>
						<option value="소파">소파</option>
						<option value="책장">책장</option>
						<option value="옷장">옷장</option>
						<option value="조명">조명</option>
						<option value="의자">의자</option>
				</select>
				<br><span id="pdkMessage" class="eMessage"></span></td>
			</tr>

			<tr height="40"><th bgcolor="aqua">할인률</th>
		<td><input type="text"  name="prod_discount" id="prod_discount" placeholder="숫자만 입력" size="10"> %<br>
		</td></tr>
			
	<tr height="40"><th bgcolor="aqua">판매가</th>
      	<td><input type="text" id="prod_price1" name="prod_price1"  placeholder="숫자만 입력" size="10"> 원<br>
      	<br><span id="pdpMessage" class="eMessage"></span></td>
        </td></tr>	

	<tr height="40"><th bgcolor="aqua">상품 설명</th>
				<td><textarea rows="5" cols="50" id="prod_content" name="prod_content"></textarea>
				<br><span id="pdcMessage" class="eMessage"></span>
			</td></tr>
			
			
	<tr height="40"><th bgcolor="aqua">판매 유무</th>
				<td><select name="prod_sellyn" id="prod_sellyn">
						<option value="y">Y: 판매중</option>
						<option value="n">N: 판매중단</option>
				</select>
				<br><span id="pdynMessage" class="eMessage"></span>
				</td></tr> 
			
				
	<tr height="40"><th bgcolor="aqua">재고 수량</th>
		<td><input type="text"  name="prod_stock" id="prod_stock" placeholder="숫자만 입력" size="10"> 개<br>
		<br><span id="pdsMessage" class="eMessage"></span>
		</td></tr>		

	
 	<tr height="40">
		<th bgcolor="aqua">등록일</th>
		<td><input type="date" name="prod_regdate" id="prod_regdate" size="20"><br>
		<span id="pdrMessage" class="eMessage"></span>
	</td></tr> 
			
	
	<tr height="40">
		<th bgcolor="aqua">상품 대표 이미지</th>
			<td><img src="" class="select_img"><br>
				<input type="file" name="uploadfilef" id="uploadfilef" size="20">
			</td></tr>
		
		
<script>
     window.document.getElementById('uploadfilef').onchange=function(e){
   //$('#uploadfilef').change(function(){
   // => window.jquery('#uploadfilef').~.~.~
   //    - JS 에서 window 객체는 생략 가능
   //     - jquery 함수를 $ 기호로 간편하게 사용   
      if(this.files && this.files[0]) {
         let reader = new FileReader;
         reader.readAsDataURL(this.files[0]);
          reader.onload = function(e) {
               $(".select_img").attr("src", e.target.result)
                           .width(70).height(90); 
               // => jQuery를 사용하지 않는경우 
               //    class 속성 사용시에는 복수선택이 가능하므로 인덱스 사용해야함 
                //document.getElementsByClassName('select_img')[0].src=e.target.result;
            } // onload_function
       } // if   
   }; //change  -> }); JQ 사용시   
</script>
	
	<tr height="40"><th></th>
		<!-- <td><input type="submit" id="submitTag" value="상품등록" onclick="return inCheck()"> -->
		<td><input type="submit" id="submitTag" value="상품등록">
			&nbsp;&nbsp;
			<input type="reset" value="등록취소">&nbsp;&nbsp;
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