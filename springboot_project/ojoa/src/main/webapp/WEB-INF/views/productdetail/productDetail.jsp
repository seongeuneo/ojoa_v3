<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>상품 상세 수정페이지</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/productList.css">
</head>
<body>

	<h2>상품 상세 수정페이지</h2>
	
		<table>
			<c:if test="${not empty requestScope.productDetails}">
				<tr height="40">
					<th bgcolor="Thistle">상품 번호 수정불가</th>
					<td>${requestScope.productDetails.prod_num}</td>
				</tr>
				<tr height="40">
					<th bgcolor="Thistle">상품명</th>
					<td>${requestScope.productDetails.prod_name}</td>
				</tr>
				<tr height="40">
					<th bgcolor="Thistle">상품사진</th>
					<td><img src="${requestScope.productDetails.prod_mainimage}"
						class="select_img" width="70" height="90"></td>
				</tr>
				<tr height="40">
					<th bgcolor="Thistle">상품종류</th>
					<td>${requestScope.productDetails.prod_kind}</td>
				</tr>
				<tr height="40">
					<th bgcolor="Thistle">할인율</th>
					<td>${requestScope.productDetails.prod_discount}%</td>
				</tr>
				<tr height="40">
					<th bgcolor="Thistle">판매가</th>
					<td>${requestScope.productDetails.prod_price1}</td>
				</tr>
				<tr height="40">
					<th bgcolor="Thistle">상품설명</th>
					<td>${requestScope.productDetails.prod_content}</td>
				</tr>
				<tr height="40">
					<th bgcolor="Thistle">판매유무</th>
					<td>${requestScope.productDetails.prod_sellyn}</td>
				</tr>
				<tr height="40">
					<th bgcolor="Thistle">등록일 수정불가</th>
					<td>${requestScope.productDetails.prod_regdate}</td>
				</tr>
				</c:if>
				</table>
				
				
				<!-- 수정할 내용 입력 폼 -->
				<form action="/product/updateProduct" method="post"
		enctype="multipart/form-data">
		<table>
		<tr height="40">
					<th bgcolor="LemonChiffon">상품 번호 수정불가</th>
					<td><input type="hidden" name="prod_num" value="${productDetails.prod_num}"></td>
				</tr>
				<tr>
					<th bgcolor="LemonChiffon">상품명 수정</th>
					<td><input type="text" name="prod_name"
						value="${productDetails.prod_name}"></td>
				</tr>
				<tr height="40">
					<th bgcolor="LemonChiffon">상품 대표 이미지 교체</th>
					<td><img src="${requestScope.productDetails.prod_mainimage}"
						class="select_img" width="70" height="90"> <br> <input
						type="file" name="uploadfilef" id="uploadfilef" size="20">
					</td>
				</tr>
				<script>
					window.onload = function() {
						let uploadFile = document.getElementById('uploadfilef');
						if (uploadFile) {
							uploadFile.onchange = function(e) {
								if (this.files && this.files[0]) {
									let reader = new FileReader();
									reader.readAsDataURL(this.files[0]);
									reader.onload = function(e) {
										document.querySelector(".select_img").src = e.target.result;
										document.querySelector(".select_img").width = 70;
										document.querySelector(".select_img").height = 90;
									}
								}
							};
						} else {
							console.error("uploadfilef element not found.");
						}
					};
				</script>
				<tr height="40">
					<th bgcolor="LemonChiffon">상품 종류 수정</th>
					<td><select name="prod_kind" id="prod_kind">
							<option value="침대">침대</option>
							<option value="소파">소파</option>
							<option value="책장">책장</option>
							<option value="옷장">옷장</option>
							<option value="조명">조명</option>
							<option value="의자">의자</option>
					</select> <br> <span id="pdkMessage" class="eMessage"></span></td>
				</tr>
				<tr>
					<th bgcolor="LemonChiffon">할인율 수정</th>
					<td><input type="text" name="prod_discount"
						value="${productDetails.prod_discount}"></td>
				</tr>
				<tr height="40">
					<th bgcolor="LemonChiffon">판매가 수정</th>
					<td><input type="text" id="prod_price1" name="prod_price1"
						value="${productDetails.prod_price1}" placeholder="숫자만 입력"
						size="10"> 원<br> <br> <span id="pdpMessage"
						class="eMessage"></span></td>
					</td>
				</tr>
				<tr height="40">
					<th bgcolor="LemonChiffon">상품 설명 수정</th>
					<td><textarea rows="5" cols="50" id="prod_content"
							name="prod_content">${productDetails.prod_content}</textarea> <br>
						<span id="pdcMessage" class="eMessage"></span></td>
				</tr>
				<tr height="40">
					<th bgcolor="LemonChiffon">판매 유무 변경</th>
					<td><select name="prod_sellyn" id="prod_sellyn">
							<option value="y">Y: 판매중</option>
							<option value="n">N: 판매중단</option>
					</select> <br>
					<span id="pdynMessage" class="eMessage"></span></td>
				</tr>
				<tr height="40">
				<th bgcolor="LemonChiffon">재고 수량 변경</th>
				<td><input type="text" id="prod_stock" name="prod_stock"
						value="${productDetails.prod_stock}" placeholder="숫자만 입력"
						size="10"> <br> <br> <span id="pdpMessage"
						class="eMessage"></span></td>
				</tr>
				<!-- 기타 수정할 내용도 유사한 방식으로 추가 -->
				<tr>
					<td><input type="submit" value="수정"></td>
				</tr>
			
			<c:if test="${empty requestScope.productDetails}">
				<tr>
					<td colspan="2">~~ 출력할 자료가 없습니다 ~~</td>
				</tr>
			</c:if>
		</table>
	</form>
<div class="home-link"><a href="/home">Home</a></div>
</body>
</html>