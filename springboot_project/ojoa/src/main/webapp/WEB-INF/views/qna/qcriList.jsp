<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>** SpringBoot Board CriList **</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/Wish.css">
<script>
//1. 검색조건 입력 후 버튼클릭
// => 입력된 값들을 서버로 전송요청: location
function searchDB() {
	self.location='bcriList'
				+'${pageMaker.makeQuery(1)}'
				+'&searchType='+document.getElementById('searchType').value
				+'&keyword='+document.getElementById('keyword').value;
} //searchDB() 

// => 검색조건 입력 후 첫 Page 요청
//    이때는 서버에 searchType, keyword 가 전달되기 이전이므로 
//	  searchType, keyword 가 없는 makeQuery 메서드사용
// => self.location="bcrilist?currPage=?????" : 해당 요청을 서버로 전달 	
		
// *** JS 코드 내부에서 el Tag 사용시 주의사항
// => JS 코드의 스트링 내에서 사용한 el Tag 는 JSP 가 처리해주므로   
//    사용가능 하지만, 이 스크립트가 외부 문서인 경우에는 처리해주지 않으므로 주의
//    이 코드를 외부문서로 작성하면 "${pageMaker.makeQuery(1)}" 이 글자 그대로 적용되어 404 발생 
		
// ** self.location	
// 1) location 객체 직접사용 Test : url로 이동, 히스토리에 기록됨
// 2) location 객체의 메서드
// => href, replace('...'), reload() 

// 2. searchType 을 '전체' 로 변경하면 keyword는 clear 
function keywordClear(){
	if ( document.getElementById('searchType').value=='all' )
		document.getElementById('keyword').value='';	
} 
</script>

</head>
<body>
<h2>** Board CriList Mybatis **</h2>
<hr>
<c:if test="${not empty requestScope.message}">
	=> ${requestScope.message}<br><hr>
</c:if>
<hr>
<div id="searchBar">
	<select name="searchType" id="searchType" onchange="keywordClear()">
		<option value="all" ${pageMaker.cri.searchType=='all' ? 'selected' : ''}>전체</option>
		<option value="qna_title" ${pageMaker.cri.searchType=='qna_title' ? 'selected' : ''}>Qnd_Title</option>
		<option value="qna_content" ${pageMaker.cri.searchType=='qna_content' ? 'selected' : ''}>Qnd_Content</option>
		<option value="id" ${pageMaker.cri.searchType=='id' ? 'selected' : ''}>ID(글쓴이)</option>
		<option value="qna_indate" ${pageMaker.cri.searchType=='qna_indate' ? 'selected' : ''}>Qna_Indate</option>
	</select>
	<input type="text" name="keyword" id="keyword" value="${pageMaker.cri.keyword}">
	<button id="searchBtn" onclick="searchDB()">Search</button>
</div>
<br><hr>
<table style="width:100%">
	<tr bgcolor="LimeGreen">
		<th>Qnd_Seq</th><th>Qna_Title</th><th>ID</th><th>Qna_indate</th>
	</tr>
	<c:if test="${not empty requestScope.banana}">
		<c:forEach var="s" items="${requestScope.banana}">
		<tr><td>${s.qna_seq}</td>
			<!-- Title
				=> 로그인 한 경우에만 글내용을 볼 수 있도록  Link 추가  
				=> 댓글 작성후에는 indent 값에 따른 들여쓰기 기능-->
			<td>
				<c:if test="${s.indent>0}">
					<c:forEach begin="1" end="${s.indent}">
						<span>&nbsp;&nbsp;</span>
					</c:forEach>
					<span style="color:blue;">re..</span>
				</c:if>
				
				<c:if test="${not empty sessionScope.loginID}">
					<a href="qdetail?qna_seq=${s.qna_seq}">${s.qna_title}</a>
			 	</c:if>    
				<c:if test="${empty sessionScope.loginID}">
					${s.qna_title}
			 	</c:if>
			</td>
			<td>${s.id}</td><td>${s.qna_indate}</td>
		</tr>	
		</c:forEach>
	</c:if>
	<c:if test="${empty requestScope.banana}">
		<tr><td colspan="5">출력할 Data가 1건도 없습니다 ~~</td>
		</tr>
	</c:if>
</table>
<hr>
<div align="center">
<!-- ** Cri_Paging ** 
	=> ver01: OLD_Version, QueryString 자동생성
	=> ver02: ver01 + 검색조건 

 	 1) FirstPage, Prev  -->
	<c:choose>
		<c:when test="${pageMaker.prev && pageMaker.spageNo>1}">
		  	<a href="qcriList${pageMaker.searchQuery(1)}">FP</a>&nbsp;
		  	<a href="qcriList${pageMaker.searchQuery(pageMaker.spageNo-1)}">&LT;</a>&nbsp;&nbsp;
		</c:when>
		<c:otherwise>
		  	<font color="Gray">FP&nbsp;&LT;&nbsp;&nbsp;</font>
		</c:otherwise>
	</c:choose> 	 
	 
	<!-- 2) Display PageNo -->
	<c:forEach var="i" begin="${pageMaker.spageNo}" end="${pageMaker.epageNo}">
		<c:if test="${i==pageMaker.cri.currPage}">
			<font color="Orange" size="5"><b>${i}</b></font>&nbsp;
		</c:if>
		<c:if test="${i!=pageMaker.cri.currPage}">

			<a href="qcriList${pageMaker.searchQuery(i)}">${i}</a>&nbsp;
		</c:if>
	</c:forEach>
	 
	<c:choose>
		<c:when test="${pageMaker.next && pageMaker.epageNo>0}">
			&nbsp;<a href="qcriList${pageMaker.searchQuery(pageMaker.epageNo+1)}">&GT;</a>
			&nbsp;<a href="qcriList${pageMaker.searchQuery(pageMaker.lastPageNo)}">LP</a>
		</c:when>
		<c:otherwise>
			<font color="Gray">&nbsp;&GT;&nbsp;LP</font>
		</c:otherwise>
	</c:choose>
</div>
<hr>
<!-- 로그인 한 경우에만 새글등록 가능 -->
<c:if test="${not empty sessionScope.loginID}">
	&nbsp;<a href="qnaInsert">새글등록</a>&nbsp;
</c:if>	
&nbsp;<a href="/home">Home</a>&nbsp;

</body>
</html>