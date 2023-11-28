<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** SpringBoot Qna_Insert **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/myStyle.css">
</head>
<body>
<h2>** SpringBoot Qna_Insert **</h2>

<form action="qinsert" method="Post">
<table>
	<tr height="40"><th bgcolor="Pink">I D</th>
		<td><input type="text" name="id" value="${sessionScope.loginID}" readonly size="20"></td></tr>
	
	<%-- <tr height="40"><th bgcolor="Pink">상 품</th>
		<td><input type="text" name="prod_num" value="${sessionScope.loginID}" readonly size="20"></td></tr> --%>
	
	<tr height="40">
				<th bgcolor="Pink">카테고리</th>
				<td><select name="qna_category" id="qna_category">
						<option value="상품 문의">상품 문의</option>
						<option value="배송 문의">배송 문의</option>
						<option value="주문/결제">주문/결제</option>
						<option value="취소 문의">취소 문의</option>
						<option value="반품/교환">반품/교환</option>
						<option value="환불 문의">환불 문의</option>
						<option value="재입고문의">재입고문의</option>
						<option value="기타 문의">기타 문의</option>
				</select>
				<!-- <br><span id="pdkMessage" class="eMessage"></span> -->
		</td></tr>
	
	<tr height="40"><th bgcolor="Pink">제 목</th>
		<td><input type="text" name="qna_title" size="50"></td></tr>	
	
	<tr height="40"><th bgcolor="Pink">문의내용</th>
		<td><textarea rows="5" cols="50" name="qna_content"></textarea>
		</td></tr>
	
	<tr height="40"><th></th>
		<td><input type="submit" value="등록">&nbsp;&nbsp;&nbsp;
			<input type="reset" value="취소">		
		</td>
	</tr>
						
</table>
</form>
<hr>
<c:if test="${not empty requestScope.message}">
=> ${requestScope.message}
</c:if>
<hr>
&nbsp;<a href="javascript:history.go(-1)">이전으로</a>&nbsp;
&nbsp;<a href="/home">Home</a>&nbsp;
</body>
</html>