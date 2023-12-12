<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** SpringBoot Qna_Insert **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/Wish.css">
</head>
<body>
<h2  style="text-align: center;">QnA Insert</h2>
<form action="qnaInsert" method="Post" enctype="multipart/form-data" id="myform">
<table>
	<tr height="40"><th>I D</th>
		<td><input type="text" name="id" value="${sessionScope.loginID}" readonly size="20"></td></tr>
	
	 <!-- <tr height="40"><th>상품 번호</th>
		<td><input type="text" name="prod_num" value="prod_num" size="20"></td></tr> --> 
	
	<tr height="40">
				<th>카테고리</th>
				<td>공지사항</td>
   </tr>
				<!-- <select name="qna_category" id="qna_category">				
						<option value="공지 사항">공지 사항</option>
						<option value="상품 문의">상품 문의</option>
						<option value="배송 문의">배송 문의</option>
						<option value="주문/결제">주문/결제</option>
						<option value="취소 문의">취소 문의</option>
						<option value="반품/교환">반품/교환</option>
						<option value="환불 문의">환불 문의</option>
						<option value="재입고문의">재입고문의</option>
						<option value="기타 문의">기타 문의</option>
				</select> -->
				<!-- <br><span id="pdkMessage" class="eMessage"></span> -->
		
	
	<tr height="40"><th>제 목</th>
		<td><input type="text" name="qna_title" id="qna_title" size="50"></td></tr>	
	
	<tr height="40"><th>내 용</th>
		<td><textarea rows="5" cols="50" name="qna_content" id="qna_content"></textarea>
		</td></tr>
	
	<tr height="40"><th></th>
		<td><input type="submit" id="submitTag" value="글등록" onclick="qnaInsertChange()">&nbsp;&nbsp;&nbsp;
			<input type="reset" value="취소">		
		</td>
	</tr>
						
</table>
</form>
<c:if test="${not empty requestScope.message}">
=> ${requestScope.message}
</c:if>
<div class="home-link"><a href="/home">Home</a></div>
</body>
</html>