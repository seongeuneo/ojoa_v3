<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>       
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Wish Product List</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/Wish.css">
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="/resources/myLib/wish.js"></script>
</head>
<body>
<h2>Wish Product List</h2>

<hr>
<c:if test="${not empty requestScope.message}">
	=> ${requestScope.message}<br><hr>
</c:if>
<table class="wishTable" border="1" style="width:90%">
	<tr bgcolor="Orange">
		<th>상품 인덱스</th>
		<th>로그인 아이디</th>
		<th>상품 번호</th>
		<th>상품사진</th>
		<th>상품이름</th>
		<th>관심상품 제거</th>
	</tr>

		<c:if test="${not empty requestScope.mywish}">
			<c:forEach var="s" items="${requestScope.mywish}">
				<tr>
					<td>${s.wish_num}</td>
					<td>${s.id}</td>
					<td>${s.prod_num}</td>
					 <td><img alt="MyImage" src="/${s.prod_mainimage}" width="80" height="70"></td>
					<td>${s.prod_name}</td>
					<td align="center"><a class="textlink" onclick="wishDelete('${s.wish_num}')">삭제</a></td>
				</tr>
			</c:forEach>
		</c:if>


		<c:if test="${empty requestScope.mywish}">
		<tr><td colspan="12">출력할 Data가 1건도 없습니다 ~~</td>
		</tr>
	</c:if>
</table>
<hr>
&nbsp;<a href="/home">Home</a>&nbsp;
</body>
</html>