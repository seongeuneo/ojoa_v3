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
	&nbsp;<a href="member/pUpdateForm">PW수정</a>&nbsp; 
	&nbsp;<a href="member/memberdelete?id=${sessionScope.loginID}">탈퇴</a>&nbsp;       
</c:if>
<br>
<<<<<<< HEAD
&nbsp;<a href="member/memberList">memberList</a>&nbsp; 
=======
>>>>>>> main
&nbsp;<a href="board/boardList">bordList??</a>&nbsp; 
&nbsp;<a href="/guestlist">GList??</a>&nbsp; 
&nbsp;<a href="/gupdate">GUpdate??</a>&nbsp; 
&nbsp;<a href="/gpagelist">GPageList??</a>&nbsp; 
&nbsp;<a href="cart/cartList">cart_List</a>&nbsp;
&nbsp;<a href="admin/adminmain">관리자페이지</a>&nbsp; 
</body>
</html>
