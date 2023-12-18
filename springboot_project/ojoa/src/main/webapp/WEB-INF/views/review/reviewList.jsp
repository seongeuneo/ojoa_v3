<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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


	<table class="reviewTable" border="1" style="width: 90%"
		id="reviewTable">
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
					<td><c:choose>
							<c:when test="${not empty s.review_image1}">
								<img alt="MyImage" src="/resources/uploadImages/${s.review_image1}" width="80"
									height="70">
							</c:when>
							<c:otherwise>
								이미지 없음.
							</c:otherwise>
						</c:choose></td>
					<td>
					<c:choose>
							<c:when test="${not empty s.review_image2}">
								<img alt="MyImage" src="/resources/uploadImages/${s.review_image2}" width="80"
									height="70">
							</c:when>
							<c:otherwise>
								이미지 없음.
							</c:otherwise>
						</c:choose>
					<td>${s.review_date}</td>
					<td>${s.review_view}</td>
					<td align="center"><a class="textlink"
						onclick="reviewDelete(${s.review_seq})">삭제</a></td>
				</tr>
			</c:forEach>
		</c:if>


		<c:if test="${empty requestScope.myreview}">
			<tr>
				<td colspan="12">출력할 Data가 1건도 없습니다 ~~</td>
			</tr>
		</c:if>
	</table>
	<div class="pagination_wrap">
		<c:if test="${not empty requestScope.itemPage}">
			<c:forEach var="pageNumber" begin="0"
				end="${requestScope.totalPages - 1}">
				<span onclick="reviewManagementPage(${pageNumber})"
					class="${pageNumber == requestScope.itemPage.number ? 'currentPage' : ''}">
					${pageNumber + 1} </span>
			</c:forEach>
		</c:if>
	</div>
	<div class="home-link">
		<a href="/home">Home</a>
	</div>
</body>
</html>