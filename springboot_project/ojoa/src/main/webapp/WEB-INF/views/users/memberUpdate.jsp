<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Spring_Boot MemberUpdate **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
<script src="/resources/myLib/jquery-3.2.1.min.js"></script>
</head>
<body>
<h2>** Spring_Boot MemberUpdate **</h2>

<form action="mupdate" method="Post" enctype="multipart/form-data">
<table>
  <c:if test="${not empty requestScope.apple}">
	<tr height="40"><th bgcolor="Chocolate">I D</th>
		<td><input type="text" name="id" value="${requestScope.apple.id}" size="20" readonly></td></tr>
		<!-- id: 화면출력, 서버로 전송, 수정은불가(즉, input Tag 의 입력 막기) 
				 -> readonly: 서버로 전송 (권장)
				 -> disabled: 서버로 전송되지않음
		-->
		
		<!-- password 수정: 기본적으로 복호화불가능한 방식으로 암호화되어있기 때문에 별도로 처리
						-> 암호수정: 별도의 수정화면에서 재입력후 교체됨
					  	-> 암호찾기: 본인 재인증 후, 새암호를 발송 -> 새암호로 본인이 로그인후 수정  
		<tr height="40"><th bgcolor="Khaki">Password</th>
		<td><input type="password" name="password" value=${requestScope.apple.password} size="20"></td></tr>	
		-->
		
	<tr height="40"><th bgcolor="Orange">Name</th>
		<td><input type="text" name="name" value="${requestScope.apple.name}" size="20"></td></tr>
	<tr height="40"><th bgcolor="Orange">Age</th>
		<td><input type="text" name="age" value="${requestScope.apple.age}" size="20"></td></tr>
	<tr height="40"><th bgcolor="Orange">Jno</th>
		<td><select name="jno">
				<option value="1" ${requestScope.apple.jno==1 ? "selected" : ""} >1조: 119조</option>
				<option value="2" ${requestScope.apple.jno==2 ? "selected" : ""} >2조: 여우조</option>
				<option value="3" ${requestScope.apple.jno==3 ? "selected" : ""} >3조: i4조</option>
				<option value="4" ${requestScope.apple.jno==4 ? "selected" : ""} >4조: 최고조</option>
				<option value="5" ${requestScope.apple.jno==5 ? "selected" : ""} >5조: 오조</option>
				<option value="7" ${requestScope.apple.jno==7 ? "selected" : ""} >7조: 관리팀</option>
		</select></td></tr>
	<tr height="40"><th bgcolor="Orange">Info</th>
		<td><input type="text" name="info" value="${requestScope.apple.info}" size="20"></td></tr>
	<tr height="40"><th bgcolor="Orange">Point</th>
		<td><input type="text" name="point" value="${requestScope.apple.point}" size="20"></td></tr>
	<tr height="40"><th bgcolor="Orange">Birthday</th>
		<td><input type="date" name="birthday" value="${requestScope.apple.birthday}" size="20"></td></tr>	
	<tr height="40"><th bgcolor="Orange">추천인</th>
		<td><input type="text" name="rid" value="${requestScope.apple.rid}" size="20"></td></tr>			
	
	<!-- Image Update 추가 
			=> form Tag : method, enctype 확인
			=> new Image 를 선택하는 경우 -> uploadfilef 사용
			=> new Image 를 선택하지않는 경우 
				-> 본래 Image 를 사용 -> uploadfile 값이 필요함
	-->	
	<tr height="40"><th bgcolor="Orange">Image</th>
		<td><img alt="MyImage" src="/${requestScope.apple.uploadfile}" 
							   width="80" height="100" class="select_img" > 
			<input type="hidden" name="uploadfile" value="${requestScope.apple.uploadfile}"><br>		
			<input type="file" name="uploadfilef" id="uploadfilef" size="20">
		</td></tr>		
	
	<script>
	  document.getElementById('uploadfilef').onchange=function(e){
		if(this.files && this.files[0]) {
			let reader = new FileReader;
			reader.readAsDataURL(this.files[0]);
 			reader.onload = function(e) {
 				// => jQuery를 사용하지 않는경우 
 				document.getElementsByClassName('select_img')[0].src=e.target.result;
 				
				//$(".select_img").attr("src", e.target.result)
				//				.width(70).height(90); 
				} // onload_function
 		} // if	
	  }; //change  
	</script>
	
	<tr height="40"><th></th>
		<td><input type="submit" value="수정">&nbsp;&nbsp;&nbsp;
			<input type="reset" value="취소">		
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