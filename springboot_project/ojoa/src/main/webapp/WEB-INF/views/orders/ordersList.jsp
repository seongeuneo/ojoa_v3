<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Orders List **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
</head>
<body>
<h2>** Orders List **</h2>

<hr>
<c:if test="${not empty requestScope.message}">
	=> ${requestScope.message}<br><hr>
</c:if>
<table border="1" style="width:90%">
	<tr bgcolor="SKyBlue">
		<th>주문번호</th>
		<th>회원ID</th>
		<th>주문날짜</th>
		<th>주문 총금액</th>
		<th>결제액</th>
		<th>결제 수단</th>
		<th>배송지</th>
		<th>*주문취소*</th>


		<!-- 관리자 기능 추가 -->
		<c:if test="${sessionScope.loginID=='admin'}">
		</c:if>
	</tr>

		<c:if test="${not empty requestScope.myorders}">
			<c:forEach var="s" items="${requestScope.myorders}">
				<tr>
					<td>${s.orders_num}</td>
					<td>${s.id}</td>
					<td>${s.orders_indate}</td>
					<td>${s.orders_totalprice}</td>
					<td>${s.orders_price}</td>
					<td>${s.orders_method}</td>
					<td>${s.orders_addresscheck}</td>
					<td align="center"><a href="ocancel?order_num=${s.orders_num}">주문취소</a></td>
				</tr>
			</c:forEach>
		</c:if>
		<c:if test="${empty requestScope.myorders}">
		<tr><td colspan="8">출력할 Data가 1건도 없습니다 ~~</td>
		</tr>
	</c:if>
</table>
<hr>
&nbsp;<a href="/home">Home</a>&nbsp;
</body>
</html>