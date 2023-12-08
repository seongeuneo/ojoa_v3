<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Orders Detail **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/ordersDetail.css">
<script src="/resources/myLib/productCheck.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
<h2>** Orders Detail 주문 후 확인 **</h2>

<table border="1" style="width:90%">
	<tr >
		<th>주문처리번호</th>
		<th>주문번호</th>
		<th>상품번호</th>
		<th>수량</th>
		<th>배송비</th>
		<th>총액</th>
		<th>처리유무</th>


		<!-- 관리자 기능 추가 -->
		<c:if test="${sessionScope.loginID=='admin'}">
		</c:if>
	</tr>

		<c:if test="${not empty requestScope.ordersdt}">
			<c:forEach var="s" items="${requestScope.ordersdt}">
				<tr>
					<td>${s.ordersdt_num}</td>
					<td>${s.orders_num}</td>
					<td>${s.prod_num}</td>
					<td>${s.quantity}</td>
					<td>${s.ordersdt_shippingfee}</td>
					<td>${s.ordersdt_totalprice}</td>
					<td>${s.ordersdt_result}</td>
					
				</tr>
			</c:forEach>
		</c:if>
		<c:if test="${empty requestScope.ordersdt}">
		<tr><td colspan="8">주문을 하고나면 나올껄???</td>
		</tr>
	</c:if>
</table>

<hr>
&nbsp;<a href="javascript:history.go(-1)">이전으로</a>&nbsp;
&nbsp;<a href="/home">Home</a>&nbsp;
</body>
</html>