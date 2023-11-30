<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Orders Detail **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
</head>
<body>
<h2>** Orders Detail 주문 후 확인 **</h2>
<table>
<c:if test="${not empty requestScope.ordersdt}">

	<tr height="40"><th bgcolor="Thistle">주문처리번호</th>
		<td>${requestScope.ordersdt.ordersdt_num}</td></tr>
		
	<tr height="40"><th bgcolor="Thistle">주문번호</th>
		<td>${requestScope.ordersdt.orders_num}</td></tr>	
		
	<tr height="40"><th bgcolor="Thistle">상품번호</th>
		<td>${requestScope.ordersdt.prod_num}</td></tr>
		
	<tr height="40"><th bgcolor="Thistle">수량</th>
		<td>${requestScope.ordersdt.quantity}</td></tr>	
		
	<tr height="40"><th bgcolor="Thistle">배송비</th>
		<td>${requestScope.ordersdt.ordersdt_shippingfee}</td></tr>	
		
	<tr height="40"><th bgcolor="Thistle">총액</th>
		<td>${requestScope.ordersdt.ordersdt_totalprice}</td></tr>
		
	<tr height="40"><th bgcolor="Thistle">처리유무</th>
		<td>${requestScope.ordersdt.ordersdt_result}</td></tr>
</c:if>
<c:if test="${empty requestScope.ordersdt}">
	<tr><td colspan="2">~~ 출력할 자료가 없습니다 ~~</td></tr>
</c:if>
</table>
<hr>
&nbsp;<a href="javascript:history.go(-1)">이전으로</a>&nbsp;
&nbsp;<a href="/home">Home</a>&nbsp;
</body>
</html>