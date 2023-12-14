<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Product List **</title>
<link rel="stylesheet" type="text/css"
	href="/resources/myLib/productList.css">
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="/resources/myLib/productCheck.js"></script>
</head>
<body>
	<h2>상품 목록</h2>

	<c:if test="${not empty requestScope.message}">
	=> ${requestScope.message}<br>
		<hr>
	</c:if>

	<div class="filterArea">
		<div class="filterArea1">
			<div>
				<label for="filterKind">상품 종류:</label> <select id="filterKind">
					<option value="all">전체</option>
					<option value="침대">침대</option>
					<option value="소파">소파</option>
					<option value="책장">책장</option>
					<option value="옷장">옷장</option>
					<option value="조명">조명</option>
					<option value="의자">의자</option>
				</select>
			</div>
			<div class="applyButton">
				<label>&nbsp;</label>
				<button onclick="filterProducts()">적용</button>
			</div>
		</div>
		<div>
			<input type="text" id="productNameInput" placeholder="상품 이름 검색">
			<!-- 검색어 입력 필드 -->
			<button onclick="filterProductsByName()">검색</button>
			<!-- 검색 버튼 -->
		</div>
	</div>

	<table border="1" style="width: 90%">
		<tr class="prod-columns">
			<th>상품 번호</th>
			<th>대표 썸네일 사진</th>
			<th>상품 이름</th>
			<th>상품 종류</th>
			<th>할인률</th>
			<th>판매가</th>
			<th>상품설명</th>
			<th>판매 유무</th>
			<th>등록일</th>
			<th>재고 수량</th>
			<th>평점</th>
			<th>상품 삭제</th>
			<th>관심목록 추가</th>
			<th>장바구니 담기</th>
			<th>상품 수정</th>

			<!-- 관리자 기능 추가 -->
			<c:if test="${sessionScope.loginID=='admin'}">
			</c:if>
		</tr>

		<c:if test="${not empty requestScope.product}">
			<c:forEach var="s" items="${requestScope.product}">
				<tr>
					<td>${s.prod_num}</td>
				
					<td>
					<img alt="MyImage" src="springboot_project/ojoa/src/main/ojoa_project/public/thumbs/${s.prod_mainimage}" width="80"
						height="70">
						</td>
					<td>${s.prod_name}</td>
					<td>${s.prod_kind}</td>
					<td>${s.prod_discount}</td>
					<td>${s.prod_price1}</td>
					<td>${s.prod_content}</td>
					<td>${s.prod_sellyn}</td>
					<td>${s.prod_regdate}</td>
					<td>${s.prod_stock}</td>
					<td>${s.prod_grade}</td>

					<td align="center"><button onclick="productDelete(${s.prod_num})">상품삭제</button></td>
					<td align="center"><button onclick="addWish(${s.prod_num})">관심목록
							추가</button></td>
					<td align="center">
						<button onclick="addCart(${s.prod_num},1)">장바구니담기</button>
					</td>
					<td align="center">
						<button onclick="modifyProduct(${s.prod_num})">상품수정</button>
					</td>
				</tr>
			</c:forEach>
		</c:if>


		<c:if test="${empty requestScope.product}">
			<tr>
				<td colspan="12">출력할 Data가 1건도 없습니다 ~~</td>
			</tr>
		</c:if>
	</table>
<!-- 	<div class="pagination">
		<button id="prevPage">이전</button>
		<span id="pageNumbers"></span>
		<button id="nextPage">다음</button>
	</div> -->

	<div class="home-link">
		<a href="/home">Home</a>
	</div>
</body>
</html>