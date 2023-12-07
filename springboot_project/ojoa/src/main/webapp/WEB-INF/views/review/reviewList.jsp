<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>     
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>상품리뷰</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/Wish.css">
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="/resources/myLib/wish.js"></script>
</head>
<body>
<h2>상품후기목록</h2>

<c:if test="${not empty requestScope.message}">
	=> ${requestScope.message}<br><hr>
</c:if>
<table class="reviewTable" border="1" style="width: 90%">
	<tr bgcolor="Orange">
		<th>리뷰 번호</th>
		<th>리뷰한 고객 ID</th>
		<th>상품 번호</th>
		<th>리뷰 제목</th>
		<th>리뷰 내용</th>
		<th>업로드 이미지1</th>
		<th>업로드 이미지2</th>
		<th>리뷰 날짜</th>
		<th>조회수</th>
		<th>삭제</th>
	</tr>

	<c:if test="${not empty requestScope.myreview}">
			<c:forEach var="s" items="${requestScope.myreview}">
				<tr>
				<td>${s.review_seq}</td>
				<td>${s.id}</td>
				<td>${s.prod_num}</td>
				<td>${s.review_title}</td>
				<td>${s.review_content}</td>
				<td><img alt="MyImage" src="/${s.review_image1}" width="80"
					height="70"></td>
				<td><img alt="MyImage2" src="/${s.review_image2}" width="80"
				height="70"></td>
				<td>${s.review_date}</td>
				<td>${s.review_view}</td>
				<td align="center"><a class="textlink"
					onclick="reviewDelete(${s.review_seq})">삭제</a></td>
			</tr>
			</c:forEach>
		</c:if>


<c:if test="${empty requestScope.myreview}">
		<tr><td colspan="12">출력할 Data가 1건도 없습니다 ~~</td>
		</tr>
	</c:if>
</table>
<div class="home-link"><a href="/home">Home</a></div>
</body>
</html>