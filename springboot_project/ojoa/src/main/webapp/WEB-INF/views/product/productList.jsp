<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Product List **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="/resources/myLib/productCheck.js"></script>
</head>
<body>
<h2>** Product List **</h2>

<hr>
<c:if test="${not empty requestScope.message}">
	=> ${requestScope.message}<br><hr>
</c:if>
<table border="1" style="width:90%">
	<tr bgcolor="Orange">
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
		<th>장바구니 담기</th>
		<th>관심목록 추가</th>
	</tr>
    <c:choose>
		<c:when test="${not empty requestScope.productList}">
			<c:forEach var="product" items="${requestScope.productList}">
				<tr>
					<td>${s.prod_num}</a></td>
					<td><img alt="Product Image" src="/${product.prod_mainimage}" width="80" height="70"></td>
					<td>${product.prod_name}</td>
					<td>${product.prod_kind}</td>
					<td>${product.prod_discount}</td>
					<td>${product.prod_price1}</td>
					<td>${product.prod_content}</td>
					<td>${product.prod_sellyn}</td>
					<td>${product.prod_regdate}</td>
					<td>${product.prod_stock}</td>
					<td>${product.prod_grade}</td>

					<td align="center"><a href="/product/delete/${product.prod_num}">상품삭제</a></td>

					<td align="center"> <button onclick="addCart(${product.prod_num},'${product.prod_mainimage}')">장바구니담기</button></td>
					<td align="center"><button onclick="addWish(${product.prod_num})">관심목록 추가</button></td>
				</tr>
			</c:forEach>
		</c:when>
		<c:otherwise>
		<tr><td colspan="12">출력할 Data가 1건도 없습니다 ~~</td>
		</tr>
		</c:otherwise>
</c:choose>

</table>
<hr>
&nbsp;<a href="/home">Home</a>&nbsp;
</body>
</html>