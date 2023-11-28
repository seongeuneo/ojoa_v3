<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>       
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Wish Product List</title>
</head>
<body>
<h2>Wish Product List</h2>

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
		<th>관심상품 제거</th>
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
					<td align="center"><a href="pdelete?prod_num=${s.prod_num}">삭제</a></td>
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