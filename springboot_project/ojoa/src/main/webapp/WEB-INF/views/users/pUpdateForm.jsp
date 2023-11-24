<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Spring Mybatis Password Update **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css" >
<script>
	function pCheck() {
		let pvalue = document.getElementById('password').value; 
		
		if ( pvalue.length < 4 ) {
			alert('~~ Password 를 4자 이상 입력 하세요 ~~');
			return false;
		}else if ( pvalue != document.getElementById('password2').value ) {
			alert('~~ Password 가 일치하지 않습니다 ~~') ;
			return false;
		}else return true; 
	} //pCheck

</script>
</head>
<body>
<h2>** Spring Mybatis Password Update **</h2>
<div align="center">
<br>
<b>=> 새로운 Password 를 입력 하세요 ~~</b><br><br>
<form action="passwordUpdate" method="post">
<table>
	<tr height="40">
		<td bgcolor="LightCyan" ><label for="password">Password</label></td>
		<td><input type="password" id="password" name="password"></td>
	</tr>
	<tr height="40">
		<td bgcolor="LightCyan" ><label for="password2">재 확 인</label></td>
		<td><input type="password" id="password2" placeholder="반드시 입력하세요" onblur="pCheck()"></td>
	</tr>
	
	<tr height="40"><td></td>
		<td><input type="submit" value="수정" onclick="return pCheck()">&nbsp;&nbsp;
			<input type="reset" value="취소">
		</td>
	</tr>
</table>
</form>
</div>
<hr>
<c:if test="${not empty requestScope.message}">
	<b>=> ${requestScope.message}</b><br>
</c:if>
<hr>
&nbsp;<a href="javascript:history.go(-1)">이전으로</a>&nbsp;
&nbsp;<a href="/home" >[Home]</a>&nbsp;
</body>
</html>