<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** SpringBoot QnaList **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
</head>
<body>
<h2>** SpringBoot QnaList **</h2>

<hr>
<c:if test="${not empty requestScope.message}">
	=> ${requestScope.message}<br><hr>
</c:if>
<table style="width:100%">
	<tr bgcolor="skyblue">
		<th>Qna_Seq</th>
		<th>Qna_Category</th>
		<th>Qna_Title</th>
		<th>ID</th>
		<th>Qna_indate</th>
	</tr>
	<c:if test="${not empty requestScope.qna}">
		<c:forEach var="s" items="${requestScope.qna}">
		<tr><td>${s.qna_seq}</td>
			<!-- Title
				=> 로그인 한 경우에만 글내용을 볼 수 있도록  Link 추가  
				=> 댓글 작성후에는 indent 값에 따른 들여쓰기 기능-->
			<td>
				<c:if test="${s.indent>0}">
					<c:forEach begin="1" end="${s.indent}">
						<span>&nbsp;&nbsp;</span>
					</c:forEach>
					<span style="color:blue;">re..</span>
				</c:if>
				
				<c:if test="${not empty sessionScope.loginID}">
					<a href="qdetail?qna_seq=${s.qna_seq}">${s.qna_title}</a>
			 	</c:if>    
				<c:if test="${empty sessionScope.loginID}">
					${s.qna_title}
			 	</c:if>
			</td>
			<td>${s.qna_category}</td><td>${s.id}</td><td>${s.qna_indate}</td>
		</tr>	
		</c:forEach>
	</c:if>
	<c:if test="${empty requestScope.qna}">
		<tr><td colspan="5">뭐라도 좀 써라</td>
		</tr>
	</c:if>
</table>
<hr>
<!-- 로그인 한 경우에만 새글등록 가능 -->
<c:if test="${not empty sessionScope.loginID}">
	&nbsp;<a href="qnaInsert">새글등록</a>&nbsp;
</c:if>	
&nbsp;<a href="/home">Home</a>&nbsp;
</body>
</html>