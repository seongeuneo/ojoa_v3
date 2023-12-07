<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Cart List</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/Wish.css">
<script src="/resources/myLib/productCheck.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
<h2>장바구니 목록</h2>

<c:if test="${not empty requestScope.message}">
	=> ${requestScope.message}<br><hr>
</c:if>
<table border="1" style="width:90%">
	<tr bgcolor="Orange">
		<th>회원ID</th>
		<th>상품번호</th>
		<th>상품사진</th>
		<th>상품이름</th>
		<th>수량</th>
		<th>결제하기</th>
		<th>Delete</th>


		<!-- 관리자 기능 추가 -->
		<c:if test="${sessionScope.loginID=='admin'}">
		</c:if>
	</tr>

		<c:if test="${not empty requestScope.mycart}">
			<c:forEach var="s" items="${requestScope.mycart}">
				<tr>
					<td>${s.id}</td>
					<td>${s.prod_num}</td>
				    <td><img alt="MyImage" src="/${s.prod_mainimage}" width="80" height="70"></td>
					<td>${s.prod_name}</td>
					<td>${s.quantity}</td>
					<td align="center"> <button onclick="payNow('${s.id}')">결제하기</button></td>
					<td align="center"><a href="cdelete?prod_num=${s.prod_num}&id=${s.id}">삭제</a></td>
				</tr>
			</c:forEach>
		</c:if>
		<c:if test="${empty requestScope.mycart}">
		<tr><td colspan="7">출력할 Data가 1건도 없습니다 ~~</td>
		</tr>
	</c:if>
</table>
<div class="home-link"><a href="/home">Home</a></div>
</body>
</html>