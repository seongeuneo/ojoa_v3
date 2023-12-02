<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** Product List **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
<script src="/resources/myLib/productCheck.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
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
					<td>${s.prod_num}</a></td>
					<td><img alt="MyImage" src="/${s.prod_mainimage}" width="80" height="70"></td>
					<td>${s.prod_name}</td>
					<td>${s.prod_kind}</td>
					<td>${s.prod_discount}</td>
					<td>${s.prod_price1}</td>
					<td>${s.prod_content}</td>
					<td>${s.prod_sellyn}</td>
					<td>${s.prod_regdate}</td>
					<td>${s.prod_stock}</td>
					<td>${s.prod_grade}</td>

				<!-- 관리자 기능 추가 -->
		<%-- <c:if test="${sessionScope.loginID=='admin'}"> --%>
					<td align="center"><a href="pdelete?prod_num=${s.prod_num}">상품삭제</a></td>
					<%-- <td align="center"><a href="/addCart?prod_num=${s.prod_num}" onclick="addCart()">장바구니담기</a></td> --%>
					<td align="center"><button onclick="addWish(${s.prod_num})">관심목록 추가</button></td>
					<td align="center"> <button onclick="addCart(${s.prod_num})">장바구니담기</button></td>
					<td align="center"> <button onclick="">상품수정</button></td>
		<%-- </c:if> --%>
				</tr>
			</c:forEach>
		</c:if>


		<c:if test="${empty requestScope.product}">
		<tr><td colspan="12">출력할 Data가 1건도 없습니다 ~~</td>
		</tr>
	</c:if>
</table>
<hr>
&nbsp;<a href="/home">Home</a>&nbsp;
</body>
</html>