<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>오조아 로그인</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/Wish.css">
</head>
<body>
<h2>오조아 로그인</h2>
<form action="member/login" method="post">
<table>
	<tr height="40"><td><label for="id">ID</label></td>
		<td><input type="text" id="id" name="id" autocomplete="username"></td>
	</tr>
	<tr height="40"><td><label for="password">Password</label></td>
		<td><input type="password" id="password" name="password" autocomplete="current-password"></td>
	</tr>
	<tr height="40"><td></td>
		<td><input type="submit" value="로그인">&nbsp;&nbsp;
			<input type="reset" value="취소">
		</td>
	</tr>
</table>
</form>
<c:if test="${not empty requestScope.message}">
=> ${requestScope.message}<br>
</c:if>	
<div class="home-link"><a href="/home">Home</a></div>
</body>
</html>