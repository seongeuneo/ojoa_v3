<%@ page language="java" contentType="text/html; charset=UTF-8" 
		 pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>
<head>
	<meta charset="UTF-8">
	<title>Home</title>
	<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
</head>
</head>
<body>
<h1>
	Ojoa Project  
</h1>
<P>* Server_Time: ${serverTime}</P>
<hr>

<br>

<h3>진기</h3>
<!-- Login 전 -->
<c:if test="${empty sessionScope.loginID}">
	&nbsp;<a href="member/loginForm">Login</a>&nbsp;
	&nbsp;<a href="member/memberJoin">Join</a>&nbsp;
</c:if>
<!-- Login 후 -->
<c:if test="${not empty sessionScope.loginID}">
	&nbsp;<a href="member/logout">Logout</a>&nbsp;
	&nbsp;<a href="member/memberDetail?id=${sessionScope.loginID}">내정보</a>&nbsp;
	&nbsp;<a href="member/memberDetail?jCode=U&id=${sessionScope.loginID}">내정보수정</a>&nbsp;  
	<%-- &nbsp;<a href="member/memberShippingAddress?jCode=U&id=${sessionScope.loginID}">배송지정보</a>&nbsp;  --%> 
	&nbsp;<a href="member/memberdelete?id=${sessionScope.loginID}">탈퇴</a>&nbsp;       
</c:if>
&nbsp;<a href="member/memberList">memberList</a>&nbsp; 
<hr>
<br>

<h3>성은</h3>
&nbsp;<a href="admin/adminmain">관리자페이지</a>&nbsp; 
&nbsp;<a href="wish/wishlist">관심상품</a>&nbsp;
&nbsp;<a href="product/productList">상품리스트 페이지</a>&nbsp; 
&nbsp;<a href="review/reviewList">상품후기 페이지</a>&nbsp; 
<hr>
<br>

<h3>희상</h3>
&nbsp;<a href="qna/qnaInsert">게시판 글쓰기</a>&nbsp; 
&nbsp;<a href="qna/qnaList">게시판QnA</a>&nbsp; 
<hr>
<br>

<h3>원희</h3>
&nbsp;<a href="cart/cartList">장바구니 리스트</a>&nbsp; 
&nbsp;<a href="orders/ordersList">주문리스트</a>&nbsp; 
&nbsp;<a href="orders/ordersDetail">주문상세 페이지</a>&nbsp; 
&nbsp;<a href="product/productInsert">상품등록 페이지</a>&nbsp; 
<hr>
<br>


</body>
</html>


