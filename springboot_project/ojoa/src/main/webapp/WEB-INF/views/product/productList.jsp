<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** UsersList **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
</head>
<body>
<h2>** UsersList **</h2>

<hr>
<c:if test="${not empty requestScope.message}">
	=> ${requestScope.message}<br><hr>
</c:if>
<table border="1" style="width:90%">
	<tr bgcolor="Orange">
		<th>ID</th>
		<th>Password</th>
		<th>Name</th>
		<th>Email</th>
		<th>zip_code</th>
		<th>address</th>
		<th>address_detail</th>
		<th>Phone</th>
		<th>가입현황</th>
		<th>가입날짜</th>
		<th>마케팅 동의</th>
		<!-- 관리자 기능 추가 -->
		<c:if test="${sessionScope.loginID=='admin'}">
			<th>Delete</th>
		</c:if>
	</tr>
	<c:if test="${not empty requestScope.banana}">
		<c:forEach var="s" items="${requestScope.banana}">
		<tr><td><a href="usersdetail?id=${s.id}">${s.id}</a></td>
			
			<td>${s.pwd}</td><td>${s.name}</td><td>${s.email}</td><td>${s.zipcode}</td>
			<td>${s.address}</td><td>${s.addressdetail}</td><td>${s.phone}</td><td>${s.useyn}</td><td>${s.regdate}</td><td>${s.marketing}</td>
			<!-- 관리자 기능 추가 -->
			<c:if test="${sessionScope.loginID=='admin'}">
				<td align="center"><a href="usersdelete?id=${s.id}">삭제</a></td>
			</c:if>
		</tr>	
		</c:forEach>
	</c:if>
	<c:if test="${empty requestScope.banana}">
		<tr><td colspan="7">출력할 Data가 1건도 없습니다 ~~</td>
		</tr>
	</c:if>
</table>
<hr>
&nbsp;<a href="/home">Home</a>&nbsp;
</body>
</html>