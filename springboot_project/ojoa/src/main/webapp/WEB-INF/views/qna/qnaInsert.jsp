<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>SpringBoot Qna_Insert</title>
    <link rel="stylesheet" type="text/css" href="/resources/myLib/Wish.css">
</head>
<body>
    <h2>QnA Insert</h2>
    <form action="/qna/qnaInsert" class="qna" method="Post" onsubmit="return onSubmit()" enctype="multipart/form-data" id="myform">
        <table>
            <tr height="40">
                <th>I D</th>
                <td><input type="text" name="id" value="${sessionScope.loginID}" readonly size="20"></td>
            </tr>
            <tr height="40">
                <th>카테고리</th>
                <td>
                	<input type="text" id="qna_category" name="qna_category" value="공지사항" />
                </td>
            </tr>
            <tr height="40">
                <th>제 목</th>
                <td><input type="text" name="qna_title" id="qna_title" size="50"></td>
            </tr>   
            <tr height="40">
                <th>내 용</th>
                <td><textarea rows="5" cols="50" name="qna_content" id="qna_content"></textarea></td>
            </tr>
            <tr height="40">
                <th></th>
                <td>
                    <input type="submit" id="submitTag" value="글등록" >
                    &nbsp;&nbsp;&nbsp;
                    <input type="reset" value="취소">        
                </td>
            </tr>
        </table>
    </form>
    <script>
	    function onSubmit() {
	    	alert('공지사항 등록')
	        // 폼 요소들을 가져오기
	        const id = document.getElementById('id').value;
	        const qna_category = document.getElementById('qna_category').value;
	        const qna_title = document.getElementById('qna_title').value;
	        const qna_content = document.getElementById('qna_content').value;
	
	        // qnaInsert 함수 호출
	        return qnaInsert(id, qna_category, qna_title, qna_content);
	    }

    </script>
    <c:if test="${not empty requestScope.message}">
        => ${requestScope.message}
    </c:if>
    <div class="home-link"><a href="/home">Home</a></div>
</body>
</html>
