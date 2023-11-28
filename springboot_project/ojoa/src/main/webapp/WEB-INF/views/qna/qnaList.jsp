<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** SpringBoot QnaList **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
</head>
<body>
<h2>** SpringBoot QnaList **</h2>

<hr>
<c:if test="${not empty requestScope.message}">
	=> ${requestScope.message}<br><hr>
</c:if>
<table style="width:100%">
	<tr bgcolor="skyblue">
		<th>Qna_Seq</th>
		<th>Qna_Category</th>
		<th>Qna_Title</th>
		<th>ID</th>
		
	</tr>
	<c:if test="${not empty requestScope.qna}">
		<c:forEach var="s" items="${requestScope.qna}">
		<tr><td>${s.qna_seq}</td>	
			<td>${s.qna_title}</td>
			<td>${s.qna_category}</td>
			<td>${s.id}</td>
		</tr>	
		</c:forEach>
	</c:if>
	<c:if test="${empty requestScope.qna}">
		<tr><td colspan="5">뭐라도 좀 써죠라~~</td>
		</tr>
	</c:if>
</table>
<hr>
<!-- 로그인 한 경우에만 새글등록 가능 -->
<c:if test="${not empty sessionScope.loginID}">
	&nbsp;<a href="qnaInsert">새글등록</a>&nbsp;
</c:if>	
&nbsp;<a href="/home">Home</a>&nbsp;
</body>
</html>