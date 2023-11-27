<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Spring_Boot ProductsList **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
</head>
<body>
<h2>** Spring_Boot ProductsList **</h2>

<hr>
<c:if test="${not empty requestScope.message}">
	=> ${requestScope.message}<br><hr>
</c:if>
<table border="1" style="width:90%">
	<tr bgcolor="Orange">
		<th>상품번호</th>
		<th>상품이름</th>
		<th>상품종류</th>
		<th>할인률</th>
		<th>판매가</th>
		<th>상품설명</th>
		<th>Image</th>
		<th>판매유무</th>
		<th>등록일</th>
		<th>재고수량</th>
		<th>평점</th>
		
		<!-- 관리자 기능 추가 -->
		<c:if test="${sessionScope.loginID=='admin'}">
			<th>Delete</th>
		</c:if>
	</tr>
	<c:if test="${not empty requestScope.banana}">
		<c:forEach var="s" items="${requestScope.banana}">
		<tr><td><a href="usersdetail?id=${s.id}">${s.id}</a></td>
			
			<td>${s.prod_num}</td>
			<td>${s.prod_name}</td>
			<td>${s.prod_kind}</td>
			<td>${s.prod_discount}</td>
			<td>${s.prod_price1}</td>
			<td>${s.prod_content}</td>
			<td>${s.prod_image}</td>
			<td>${s.prod_useyn}</td>
			<td>${s.prod_regdate}</td>
			<td>${s.prod_stock}</td>
			<td>${s.prod_grade}</td>
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