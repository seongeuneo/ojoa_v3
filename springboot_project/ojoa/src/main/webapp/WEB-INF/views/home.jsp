<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<html>
<head>
<meta charset="UTF-8">
<title>Home</title>
<link rel="stylesheet" type="text/css"
	href="/resources/myLib/Header.css">
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="/resources/myLib/wish.js"></script>
</head>
</head>
<body>
	<P>Server Time: ${serverTime}</P>
	<header class='header'>
		<div id="mheader">
			<!-- header -->
			<div>
				<!-- 상단 로고 -->
				<div class="centered-logo">
					<a href="/home" class="logo-link"><img class="logo"
						src="/resources/uploadImages/ojoa_logo_b.png" alt="logo" />
					<p>관리자용 페이지</p></a>
				</div>
				<!-- 상단 네비 -->
				<div class="navBar">
					<ul class="login-out">
						<!-- Login 전 -->
						<c:if test="${empty sessionScope.loginID}">
							<li><a href="member/loginForm">Login</a></li>
							<li><a href="member/memberJoin">Join</a></li>
						</c:if>
						<!-- Login 후 -->
						<c:if test="${not empty sessionScope.loginID}">
							<li><a href="member/logout">Logout</a></li>
							<li><a href="member/memberDetail?id=${sessionScope.loginID}">내정보</a></li>
							<li><a
								href="member/memberDetail?jCode=U&id=${sessionScope.loginID}">내정보수정</a></li>
							<%-- <li><a href="member/memberShippingAddress?jCode=U&id=${sessionScope.loginID}">배송지정보</a></li> --%>
							<li><a href="member/memberdelete?id=${sessionScope.loginID}">탈퇴</a></li>
						</c:if>
					</ul>
					<ul class="admin-lists">
						<li onclick="productChange()"><a>상품관리 </a>&nbsp;<span>|</span></li>
						<li onclick="productInsertChange()"><a>상품등록 </a>&nbsp;<span>|</span></li>
						<li onclick="memberChange()"><a>회원관리 </a>&nbsp;<span>|</span></li>
						<!--  <li><a href="/admindeliever/admindelieverlist">배송관리 </a>&nbsp;<span>|</span></li> -->
						<li onclick="ordersChange()"><a>주문관리 </a>&nbsp;<span>|</span></li>
						<!-- <li><a href="wish/wishlist">관심상품관리 </a>&nbsp;<span>|</span></li> -->
						<li onclick="wishChange()"><a>관심상품관리 </a>&nbsp;<span>|</span></li>
						<li onclick="reviewChange()"><a>상품후기관리 </a>&nbsp;<span>|</span></li>
						<li><a onclick="qnaChange()">게시판QnA관리 </a>&nbsp;<a
							 onclick="qnaInsertChange()">게시판 글쓰기</a>&nbsp;<span>|</span></li>
						<li onclick="cartChange()"><a>장바구니관리 </a></li>
						<!-- <li><a href="orders/ordersDetail">주문상세 페이지 </a></li> -->
					</ul>
				</div>
			</div>
			<br />
		</div>
	</header>
	<br>
	<br>
	<br>
	<hr>
	<div class="content" id="contentArea"></div>




</body>
</html>


