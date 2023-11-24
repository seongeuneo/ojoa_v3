<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Spring_Boot Member Detail **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
</head>
<body>
<h2>** Spring_Boot Member Detail **</h2>
<table>
<c:if test="${not empty requestScope.apple}">
	<tr height="40"><th bgcolor="Thistle">I D</th>
		<td>${requestScope.apple.id}</td></tr>
	<tr height="40"><th bgcolor="Thistle">Password</th>
		<td>${requestScope.apple.password}</td></tr>	
	<tr height="40"><th bgcolor="Thistle">Name</th>
		<td>${requestScope.apple.name}</td></tr>
	<tr height="40"><th bgcolor="Thistle">Age</th>
		<td>${requestScope.apple.age}</td></tr>
	<tr height="40"><th bgcolor="Thistle">Jno</th>
		<td>${requestScope.apple.jno}</td></tr>
	<tr height="40"><th bgcolor="Thistle">Info</th>
		<td>${requestScope.apple.info}</td></tr>
	<tr height="40"><th bgcolor="Thistle">Point</th>
		<td>${requestScope.apple.point}</td></tr>
	<tr height="40"><th bgcolor="Thistle">Birthday</th>
		<td>${requestScope.apple.birthday}</td></tr>
	<tr height="40"><th bgcolor="Thistle">추천인</th>
		<td>${requestScope.apple.rid}</td></tr>	
	<tr height="40"><th bgcolor="Thistle">Image</th>
		<td><img alt="MyImage" src="/${requestScope.apple.uploadfile}" width="80" height="100"></td></tr>									
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