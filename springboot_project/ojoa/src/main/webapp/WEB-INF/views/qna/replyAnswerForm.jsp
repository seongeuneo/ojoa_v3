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
<script src="/resources/myLib/jquery-3.2.1.min.js"></script>
<script src="/resources/myLib/wish.js"></script>
</head>
<body>
<h2>** QnA Reply Answer Form **</h2>

	<h3>문의 내용</h3>

	<table border="1">
		<c:if test="${not empty requestScope.qna}">

			<tr height="40">
				<th bgcolor="Plum">문의 번호</th>
				<td>${requestScope.qna.qna_seq}</td>
			</tr>
			<tr height="40">
				<th bgcolor="Plum">상품 번호</th>
				<td>${requestScope.qna.prod_num}</td>
			</tr>
			<tr height="40">
				<th bgcolor="Plum">I D</th>
				<td>${requestScope.qna.id}</td>
			</tr>
			<tr height="40">
				<th bgcolor="Plum">카테고리</th>
				<td>${requestScope.qna.qna_category}</td>
			</tr>
			<tr height="40">
				<th bgcolor="Plum">문의 제목</th>
				<td>${requestScope.qna.qna_title}</td>
			</tr>
			<tr height="40">
				<th bgcolor="Plum">문의 내용</th>
				<td>${requestScope.qna.qna_content}</td>
			</tr>
			<tr height="40">
				<th bgcolor="Plum">문의 날짜</th>
				<td>${requestScope.qna.qna_indate}</td>
			</tr>

		</c:if>
	</table>
<hr>
<hr>
	<h3>답변 내용</h3>
	<form action="replyAnswerForm" method="Post" enctype="multipart/form-data" id="replyAnswerForm">
		<table border="1">
				<c:if test="${sessionScope.loginID=='admin'}">
			<tr height="40">
					<th bgcolor="Plum">I D</th>
					<td><input type="text" name="id"
						value="${sessionScope.loginID}" readonly size="20"></td>
			</tr>
			<tr height="40">
				<th bgcolor="Plum">문의 번호</th>
				<td><input type="text" name="qna_seq" value="${requestScope.qna.qna_seq}" readonly></td>  
			</tr>
			<tr height="40">
				<th bgcolor="Lime">답변 내용</th>
				<td><textarea rows="5" cols="50" name="qna_reply">${requestScope.qna.qna_reply}</textarea></td>
			</tr>

			<tr height="40">
				<td colspan=2  align="center">
				<input type="submit" value="답변 등록" onclick="AnswerFinish(event)">&nbsp;&nbsp;&nbsp;&nbsp;
				<input type="reset" value="취소"></td>
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