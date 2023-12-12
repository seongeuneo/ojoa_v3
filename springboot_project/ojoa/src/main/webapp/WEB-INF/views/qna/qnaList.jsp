<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** SpringBoot QnaList **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/Wish.css">
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="/resources/myLib/wish.js"></script>
</head>
<body>
	<h2>게시판 목록</h2>

	<c:if test="${not empty requestScope.message}">
	=> ${requestScope.message}<br>
		<hr>
	</c:if>

	<div class="filterArea">
		<div>
			<input type="text" id="productNameInput" placeholder="회원 ID 검색">
			<!-- 검색어 입력 필드 -->
			<button onclick="filterMembersByName()">검색</button>
			<!-- 검색 버튼 -->
		</div>
	</div>


	<table style="width: 100%">
		<tr>
			<th>문의 번호</th>
			<th>상품 번호</th>
			<th>ID</th>
			<th>카테고리</th>
			<th>문의 제목</th>
			<th>문의 내용</th>
			<th>답변 여부</th>
			<th>답변 하기</th>
			<th>삭제</th>

		</tr>
		<c:if test="${not empty requestScope.qna}">
			<c:forEach var="s" items="${requestScope.qna}">
				<tr>
					<td>${s.qna_seq}</td>
					<td>${s.prod_num}</td>
					<td>${s.id}</td>
					<td>${s.qna_category}</td>
				<%-- 	<td><a href="/qna/qdetail?qna_seq=${s.qna_seq}">
							${s.qna_title}</a></td> --%>
					<td>${s.qna_title}</td>
					<td>${s.qna_content}</td>

					<td>여기에 qna state</td>
					<%-- <td>${s.qna_state}</td> --%>

					<td align="center"><a class="texlink"
						onclick="replyAnswerForm(${s.qna_seq})">답변 하기</a></td>

					<td align="center"><a class="texlink"
						onclick="qnaDelete('${s.qna_seq}')">글 삭제</a></td>
				</tr>
			</c:forEach>
		</c:if>
		<c:if test="${empty requestScope.qna}">
			<tr>
				<td colspan="5">뭐라도 좀 써죠라~~</td>
			</tr>
		</c:if>
	</table>

	<div class="home-link">
		<a href="/home">Home</a>
	</div>
</body>
</html>