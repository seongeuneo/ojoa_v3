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
	Ojoa Project SpringBoot JPA !!!  
</h1>
<P>* Server_Time: ${serverTime}</P>
<hr>

<!-- Login 전 -->
<c:if test="${empty sessionScope.loginID}">
	&nbsp;<a href="users/loginForm">Login</a>&nbsp;
	&nbsp;<a href="users/usersJoin">Join</a>&nbsp;
</c:if>
<!-- Login 후 -->
<c:if test="${not empty sessionScope.loginID}">
	&nbsp;<a href="users/logout">Logout</a>&nbsp;
	&nbsp;<a href="users/usersdetail?id=${sessionScope.loginID}">내정보</a>&nbsp;  
	&nbsp;<a href="users/usersdetail?jCode=U&id=${sessionScope.loginID}">내정보수정</a>&nbsp;  
	&nbsp;<a href="users/pUpdateForm">PW수정</a>&nbsp; 
	&nbsp;<a href="users/mdelete?id=${sessionScope.loginID}">탈퇴</a>&nbsp;       
</c:if>
<br>
&nbsp;<a href="member/memberList">mList</a>&nbsp; 
&nbsp;<a href="board/boardList">bList</a>&nbsp; 
&nbsp;<a href="board/bcriList">bcriList</a>&nbsp;
&nbsp;<a href="jo/joList">jList</a><br>
&nbsp;<a href="/ginsert">GSave</a>&nbsp; 
&nbsp;<a href="/guestlist">GList</a>&nbsp; 
&nbsp;<a href="/gupdate">GUpdate</a>&nbsp; 
&nbsp;<a href="/gpagelist">GPageList</a>&nbsp; 
</body>
</html>
