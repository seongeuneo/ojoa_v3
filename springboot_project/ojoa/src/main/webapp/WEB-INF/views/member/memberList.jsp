<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** MemberList **</title>
<link rel="stylesheet" type="text/css"
	href="/resources/myLib/memberList.css">
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="/resources/myLib/productCheck.js"></script>
</head>
<body>
	<h2>오조아 회원목록</h2>

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

	<table border="1" style="width: 90%" id="memberTable">
		<tr>
			<th>ID</th>
			<th>Password</th>
			<th>Name</th>
			<th>Email</th>
			<th>domain</th>
			<th>zip code</th>
			<th>address</th>
			<th>address_detail</th>
			<th>Phone1</th>
			<th>Phone2</th>
			<th>Phone3</th>
			<th>마케팅 동의(sms)</th>
			<th>마케팅 동의(email)</th>
			<th>적립금(mileage)</th>
			<th>가입날짜</th>
			<th>가입현황</th>
			<!-- 관리자 기능 추가 -->
			<c:if test="${sessionScope.loginID=='admin'}">
				<th>강퇴</th>
			</c:if>
		</tr>
		<c:if test="${not empty requestScope.memberList}">
			<c:forEach var="s" items="${requestScope.memberList}">
				<tr>
					<td>${s.id}</td>
					<td>${s.password}</td>
					<td>${s.name}</td>
					<td align="center">${s.email1}</td>
					<td align="center">${s.email2}</td>
					<td>${s.zipcode}</td>
					<td>${s.address}</td>
					<td>${s.addressdetail}</td>
					<td align="center">${s.phone1}</td>
					<td align="center">${s.phone2}</td>
					<td align="center">${s.phone3}</td>
					<td align="center">${s.marketing_sms}</td>
					<td align="center">${s.marketing_email}</td>
					<td align="center">${s.mileage}</td>
					<td align="center">${s.regdate}</td>
					<td align="center">${s.memberyn}</td>
					<!-- 관리자 기능 추가 -->
					<c:if test="${sessionScope.loginID=='admin'}">
						<td align="center"><a class="texlink"
							onclick="memberdelete('${s.id}')">강퇴</a></td>
					</c:if>
				</tr>
			</c:forEach>
		</c:if>
		<c:if test="${empty requestScope.memberList}">
			<tr>
				<td colspan="7">출력할 Data가 1건도 없습니다 ~~</td>
			</tr>
		</c:if>
	</table>
	<div class="pagination_wrap">
       <c:if test="${not empty requestScope.itemPage}">
           <c:forEach var="pageNumber" begin="0" end="${requestScope.totalPages - 1}">
           <span onclick="memberManagementPage(${pageNumber})"
                   class="${pageNumber == requestScope.itemPage.number ? 'currentPage' : ''}">
                 ${pageNumber + 1}
           </span>
           </c:forEach>
       </c:if>
   </div>
	<div class="home-link">
		<a href="/home">Home</a>
	</div>
</body>
</html>