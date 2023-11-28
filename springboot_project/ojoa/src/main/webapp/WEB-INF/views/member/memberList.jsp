<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** MemberList **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
</head>
<body>
<h2>** MemberList **</h2>

<hr>
<c:if test="${not empty requestScope.message}">
	=> ${requestScope.message}<br><hr>
</c:if>
<table border="1" style="width:90%">
	<tr bgcolor="Silver">
		<th>ID</th><th>Password</th><th>Name</th><th>Email</th><th>domain</th><th>zip_code</th><th>address</th>
		<th>address_detail</th><th>Phone1</th><th>Phone2</th><th>Phone3</th><th>가입현황</th><th>가입날짜</th><th>마케팅 동의(sms)</th><th>마케팅 동의(email)</th>
		<!-- 관리자 기능 추가 -->
		<c:if test="${sessionScope.loginID=='admin'}">
			<th>Delete</th>
		</c:if>
	</tr>
	<c:if test="${not empty requestScope.banana}">
		<c:forEach var="s" items="${requestScope.banana}">
		<tr><td><a href="memberDetail?id=${s.id}">${s.id}</a></td>
			
			<td>${s.password}</td><td>${s.name}</td><td align="center">${s.email1}</td><td align="center">${s.email2}</td><td>${s.zipcode}</td>
			<td>${s.address}</td><td>${s.addressdetail}</td><td align="center">${s.phone1}</td><td align="center">${s.phone2}</td><td align="center">${s.phone3}</td><td>${s.memberyn}</td><td align="center">${s.regdate}</td><td align="center">${s.marketing_sms}</td><td align="center">${s.marketing_email}</td>
			<!-- 관리자 기능 추가 -->
			<c:if test="${sessionScope.loginID=='admin'}">
				<td align="center"><a href="memberdelete?id=${s.id}">삭제</a></td>
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