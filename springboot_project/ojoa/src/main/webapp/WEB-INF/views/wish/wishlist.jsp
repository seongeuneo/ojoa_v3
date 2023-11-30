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
		<th>상품 인덱스</th>
		<th>로그인 아이디</th>
		<th>상품 번호</th>
		<th>관심상품 제거</th>
	</tr>

		<c:if test="${not empty requestScope.mywish}">
			<c:forEach var="s" items="${requestScope.mywish}">
				<tr>
					<td>${s.wish_num}</a></td>
					<td>${s.id}</td>
					<td>${s.prod_num}</td>
					<td align="center"><a href="wdelete?wish_num=${s.wish_num}">삭제</a></td>
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