<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** SpringBoot QnaUpdate **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
</head>
<body>
<h2>** SpringBoot QnaUpdate **</h2>

<form action="bupdate" method="Post">
<table>
  <c:if test="${not empty requestScope.apple}">
	<tr height="40"><th bgcolor="Chocolate">Qna_seq</th>
		<td><input type="text" name="seq" value="${requestScope.apple.qna_seq}" size="20" readonly></td></tr>
	<tr height="40"><th bgcolor="Chocolate">I D</th>
		<td><input type="text" name="id" value="${requestScope.apple.id}" size="20" readonly></td></tr>
	<tr height="40"><th bgcolor="Orange">Qna_title</th>
		<td><input type="text" name="title" value="${requestScope.apple.qna_title}" size="50"></td></tr>
	<tr height="40"><th bgcolor="Orange">Qna_content</th>
		<td><textarea rows="5" cols="50" name="content">${requestScope.apple.qna_content}</textarea> 
		</td></tr>
	<tr height="40"><th bgcolor="Chocolate">Qna_inDate</th>
		<td><input type="text" name="regdate" value="${requestScope.apple.qna_indate}" size="20" readonly>
		</td></tr>
	<%-- <tr height="40"><th bgcolor="Chocolate">조회수</th>
		<td><input type="text" name="cnt" value="${requestScope.apple.cnt}" size="20" readonly>
		</td></tr> --%>
	<tr height="40"><th></th>
		<td><input type="submit" value="수정">&nbsp;&nbsp;&nbsp;
			<input type="reset" value="취소">		
		</td>
	</tr>
  </c:if>
  <c:if test="${empty requestScope.apple}">
  	<tr height="40"><td>~~ 수정할 자료가 존재하지 않습니다 ~~</td>
  	</tr>
  </c:if>				
</table>
</form>
<hr>
<c:if test="${not empty requestScope.message}">
=> ${requestScope.message}
</c:if>
<hr>
&nbsp;<a href="javascript:history.go(-1)">이전으로</a>&nbsp;
&nbsp;<a href="/home">Home</a>&nbsp;
</body>
</html>