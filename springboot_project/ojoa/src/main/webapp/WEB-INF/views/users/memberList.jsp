<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Spring_Boot MemberList **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
</head>
<body>
<h2>** Spring_Boot MemberList **</h2>

<hr>
<c:if test="${not empty requestScope.message}">
	=> ${requestScope.message}<br><hr>
</c:if>
<table border="1" style="width:90%">
	<tr bgcolor="Orange">
		<th>ID</th><th>Password</th><th>Name</th><th>Age</th><th>Jno</th><th>Info</th>
		<th>Point</th><th>Birthday</th><th>Rid</th><th>Image</th><th>Download</th>
		<!-- 관리자 기능 추가 -->
		<c:if test="${sessionScope.loginID=='admin'}">
			<th>Delete</th>
		</c:if>
	</tr>
	<c:if test="${not empty requestScope.banana}">
		<c:forEach var="s" items="${requestScope.banana}">
		<tr><td><a href="mdetail?id=${s.id}">${s.id}</a></td>
			
			<td>${s.password}</td><td>${s.name}</td><td>${s.age}</td><td>${s.jno}</td>
			<td>${s.info}</td><td>${s.point}</td><td>${s.birthday}</td><td>${s.rid}</td>
			<!-- 관리자 기능 추가 -->
			<c:if test="${sessionScope.loginID=='admin'}">
				<td align="center"><a href="mdelete?id=${s.id}">삭제</a></td>
			</c:if>
			<!-- Image 추가 -->
			<td><img alt="MyImage" src="/${s.uploadfile}" width="50" height="70"></td>
			
			<!-- File Download ** 
			=> download 요청을 받으면 서버는 해당화일을 찾아 response 에 담아보내면,
			   웹브라우져가 받아 download 시켜줌 
			=> 최종적 처리를 웹브라우져가 해주기때문에 일반적으로 a Tag 로 처리함     
			  ( 즉, 비동기 처리_Ajax 를 하지 않음, 비동기처리에서는 response를 웹브라우져가 받지않기때문 )
			-->
			<td> <a href="download?dnfile=${s.uploadfile}">${s.uploadfile}</a></td>
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