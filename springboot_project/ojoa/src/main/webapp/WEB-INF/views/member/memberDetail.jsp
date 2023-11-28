<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Member Detail **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
</head>
<body>
<h2>** Member Detail **</h2>
<table>
<c:if test="${not empty requestScope.apple}">
	<tr height="40"><th bgcolor="Thistle">I D</th>
		<td>${requestScope.apple.id}</td></tr>
	<tr height="40"><th bgcolor="Thistle">password</th>
		<td>${requestScope.apple.password}</td></tr>	
	<tr height="40"><th bgcolor="Thistle">Name</th>
		<td>${requestScope.apple.name}</td></tr>
	<tr height="40"><th bgcolor="Thistle">phone</th>
		<td>${requestScope.apple.phone}</td></tr>	
	<tr height="40"><th bgcolor="Thistle">zip_code</th>
		<td>${requestScope.apple.zipcode}</td></tr>	
	<tr height="40"><th bgcolor="Thistle">address</th>
		<td>${requestScope.apple.address}</td></tr>
	<tr height="40"><th bgcolor="Thistle">address_detail</th>
		<td>${requestScope.apple.addressdetail}</td></tr>
	<tr height="40"><th bgcolor="Thistle">email</th>
		<td>${requestScope.apple.email}</td></tr>
	<tr height="40"><th bgcolor="Thistle">SMS 수신여부</th>
		<td>${requestScope.apple.marketing_sms}</td></tr>	
	<tr height="40"><th bgcolor="Thistle">이메일 수신여부</th>
		<td>${requestScope.apple.marketing_email}</td></tr>	
	<tr height="40"><th bgcolor="Thistle">가입일</th>
		<td>${requestScope.apple.regdate}</td></tr>	
</c:if>
<c:if test="${empty requestScope.apple}">
	<tr><td colspan="2">~~ 출력할 자료가 없습니다 ~~</td></tr>
</c:if>
</table>
<hr>
&nbsp;<a href="javascript:history.go(-1)">이전으로</a>&nbsp;
&nbsp;<a href="/home">Home</a>&nbsp;
</body>
</html>