<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>오조아 상품등록</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/productInsert.css">
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="/resources/myLib/jquery-3.2.1.min.js"></script>
<script src="/resources/myLib/inCheck.js"></script>
<!-- <script src="/resources/myLib/memberCheck.js"></script> -->
</head>

<body>
<h2 class="insert-title">상품등록</h2>
<form action="" method="post" enctype="multipart/form-data" id="myform">
<table>

	<tr height="40"><th >상품이름</th>
		<td><input type="text" name="prod_name" id="prod_name" size="30" autocomplete="id">
			<button type="button" id="idDup" onclick="prodDupCheck()">중복확인</button>
			<br><span id="pdnMessage" class="eMessage"></span>
		</td></tr>

			<tr height="40">
				<th >상품 종류</th>
				<td><select name="prod_kind" id="prod_kind">
						<option value="침대">침대</option>
						<option value="소파">소파</option>
						<option value="책장">책장</option>
						<option value="옷장">옷장</option>
						<option value="조명">조명</option>
						<option value="의자">의자</option>
				</select>
				<br><span id="pdkMessage" class="eMessage"></span></td>
			</tr>

			<tr height="40"><th >할인률</th>
		<td><input type="text"  name="prod_discount" id="prod_discount" placeholder="숫자만 입력" size="10"> %<br>
		<span id="pddMessage" class="pddMessage"></span></td>
		</td></tr>
			
	<tr height="40"><th >판매가</th>
      	<td><input type="text" id="prod_price1" name="prod_price1"  placeholder="숫자만 입력" size="10"> 원<br>
      	<br><span id="pdpMessage" class="eMessage"></span></td>
        </td></tr>	

	<tr height="40"><th >상품 설명</th>
				<td><textarea rows="5" cols="50" id="prod_content" name="prod_content"></textarea>
				<br><span id="pdcMessage" class="eMessage"></span>
			</td></tr>
			
			
	<tr height="40"><th >판매 유무</th>
				<td><select name="prod_sellyn" id="prod_sellyn">
						<option value="y">Y: 판매중</option>
						<option value="n">N: 판매중단</option>
				</select>
				<br><span id="pdynMessage" class="eMessage"></span>
				</td></tr> 
			
				
	<tr height="40"><th >재고 수량</th>
		<td><input type="text"  name="prod_stock" id="prod_stock" placeholder="숫자만 입력" size="10"> 개<br>
		<br><span id="pdsMessage" class="eMessage"></span>
		</td></tr>		

	
 	<tr height="40">
		<th >등록일</th>
		<td><input type="date" name="prod_regdate" id="prod_regdate" size="20"><br>
		<span id="pdrMessage" class="eMessage"></span>
	</td></tr> 
			
	
	<tr height="40">
		<th >상품 대표 이미지</th>
			<td>
			<img src="" class="select_img"><br>
				<input type="file" name="uploadfilef" id="uploadfilef" size="20"><br>
		<span id="pdiMessage" class="eMessage"></span>
			</td></tr>
		
		
<script>
     window.document.getElementById('uploadfilef').onchange=function(e){
   //$('#uploadfilef').change(function(){
   // => window.jquery('#uploadfilef').~.~.~
   //    - JS 에서 window 객체는 생략 가능
   //     - jquery 함수를 $ 기호로 간편하게 사용   
      if(this.files && this.files[0]) {
         let reader = new FileReader;
         reader.readAsDataURL(this.files[0]);
          reader.onload = function(e) {
               $(".select_img").attr("src", e.target.result)
                           .width(70).height(90); 
               // => jQuery를 사용하지 않는경우 
               //    class 속성 사용시에는 복수선택이 가능하므로 인덱스 사용해야함 
                //document.getElementsByClassName('select_img')[0].src=e.target.result;
            } // onload_function
       } // if   
   }; //change  -> }); JQ 사용시   
</script>
	
	<tr height="40"><th></th>
		<!-- <td><input type="submit" id="submitTag" value="상품등록" onclick="return inCheck()"> -->
		<td><button type="button" id="submitTag" value="상품등록" onclick="productInsertAndMove(event)">상품등록</button>
			&nbsp;&nbsp;
			<input type="reset" value="등록취소">&nbsp;&nbsp;
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