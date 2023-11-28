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
	<tr height="40"><th bgcolor="Chocolate">Qna_Seq</th>
		<td><input type="text" name="qna_seq" value="${requestScope.apple.qna_seq}" size="20" readonly></td></tr>
	<tr height="40"><th bgcolor="Chocolate">I D</th>
		<td><input type="text" name="id" value="${requestScope.apple.id}" size="20" readonly></td></tr>
	<tr height="40"><th bgcolor="Orange">Qna_Title</th>
		<td><input type="text" name="qna_title" value="${requestScope.apple.qna_title}" size="50"></td></tr>
	<tr height="40"><th bgcolor="Orange">Qna_Content</th>
		<td><textarea rows="5" cols="50" name="qna_content">${requestScope.apple.qna_content}</textarea> 
		</td></tr>
	<tr height="40"><th bgcolor="Chocolate">Qna_Indate</th>
		<td><input type="text" name="qna_indate" value="${requestScope.apple.qna_indate}" size="20" readonly>
		</td></tr>
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