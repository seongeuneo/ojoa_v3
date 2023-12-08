<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** SpringBoot Reply_Insert **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="/resources/myLib/wish.js"></script>
</head>
<body>
<h2>** QnA Reply Answer Form **</h2>

<form action="replyAnswerForm" method="Post" enctype="multipart/form-data" id="replyAnswerForm">
<table>
	<!-- 기존 게시 글 -->	
		
<%-- 	<tr height="40"><td></td>
		<td><input type="hidden" name="root" value="${boardDTO.root}">
			<input type="hidden" name="step" value="${boardDTO.step}">
			<input type="hidden" name="indent" value="${boardDTO.indent}">
		</td>
	</tr> --%>
<c:if test="${not empty requestScope.qna}">
	<!-- 관리자 등록 글 form -->
	<tr height="40"><th bgcolor="lime">I D</th>
		<td><input type="text" name="id" value="${sessionScope.loginID}" readonly size="20"></td></tr>
	<tr height="40"><th bgcolor="lime">Qna_Title</th>
		<td><input type="text" name="qna_title" size="50"></td></tr>	
	<tr height="40"><th bgcolor="lime">Qna_Content</th>
		<td><textarea rows="5" cols="50" name="qna_content"></textarea>
		</td></tr>
	
	<tr height="40"><th></th>
		<td><input type="submit" value="등록" onclick="replyAnswerfinish()">&nbsp;&nbsp;&nbsp;
			<input type="reset" value="취소">		
		</td>
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