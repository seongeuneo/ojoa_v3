<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** SpringBoot Qna Detail **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
</head>
<body>
<h2>** SpringBoot Qna Detail **</h2>
<table>
<c:if test="${not empty requestScope.apple}">
	<tr height="40"><th bgcolor="Plum">Qna_seq</th>
		<td>${requestScope.apple.qna_seq}</td></tr>
	<tr height="40"><th bgcolor="Plum">Prod_num</th>
		<td>${requestScope.apple.prod_num}</td></tr>	
	<tr height="40"><th bgcolor="Plum">I D</th>
		<td>${requestScope.apple.id}</td></tr>	
	<tr height="40"><th bgcolor="Plum">Qna_category</th>
		<td>${requestScope.apple.qna_category}</td></tr>	
	<tr height="40"><th bgcolor="Plum">Qna_Title</th>
		<td>${requestScope.apple.qna_title}</td></tr>
	<tr height="40"><th bgcolor="Plum">Qna_content</th>
		<td>${requestScope.apple.qna_content}</td></tr>
	<tr height="40"><th bgcolor="Plum">Qna_reply</th>
		<td>${requestScope.apple.qna_reply}</td></tr>
	<tr height="40"><th bgcolor="Plum">Qna_redate</th>
		<td>${requestScope.apple.qna_redate}</td></tr>
	<tr height="40"><th bgcolor="Plum">Qna_indate</th>
		<td>${requestScope.apple.qna_indate}</td></tr>
</c:if>
<c:if test="${empty requestScope.apple}">
	<tr><td colspan="2">~~ 출력할 자료가 없습니다 ~~</td></tr>
</c:if>
</table>
<hr>
<c:if test="${not empty requestScope.message}">
=> ${requestScope.message}
</c:if>
<hr>
<!-- 로그인 한 경우에는 새글등록, 답글등록 -->
&nbsp;<a href="qnaInsert">새글등록</a>&nbsp;
<!-- 댓글등록을 위해 부모글의 root, step, indent 값이 필요하기 때문에
	 서버로 보내주어야함 (퀴리스트링으로 작성)	 -->
&nbsp;<a href="replyInsert?root=${qnaqna.root}&step=${qnaqna.step}&indent=${qnaqna.indent}">답글등록</a>&nbsp;
<!-- 로그인id 와 글쓴이id 가 동일하면 수정, 삭제 가능  --> 
<c:if test="${sessionScope.loginID==requestScope.qnaqna.id}">
	&nbsp;<a href="qdetail?jCode=U&qna_seq=${requestScope.qnaqna.qna_seq}">글수정</a>&nbsp;
	&nbsp;<a href="qdelete?qna_seq=${qnaqna.qna_seq}&root=${qnaqna.root}">글삭제</a>&nbsp;
</c:if>
<hr>
&nbsp;<a href="javascript:history.go(-1)">이전으로</a>&nbsp;
&nbsp;<a href="/home">Home</a>&nbsp;
</body>
</html>