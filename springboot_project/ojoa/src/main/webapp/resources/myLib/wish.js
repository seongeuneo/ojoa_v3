//wish.js

// 관심상품 삭제
function wishDelete(wish_num) {
   let url="/wish/wdelete/" + wish_num;
   axios.delete(url).then(response => {
      alert("삭제 성공 => " + response.data);
   }).catch(err => {
      alert("삭제 실패 => " + err.message);
   });
};

//==============================================================================
// 상품관리 페이지 비동기 이동
function productChange() {
   let url="product/productList";
   
   axios.get(url
   ).then(response => {
    //  alert("response 성공");
      document.getElementById('contentArea').innerHTML=response.data;
   }).catch(err => {
      alert("response 실패 => 바보" + err.message);
   });
   document.getElementById("contentArea").innerHTML="";

}

//==============================================================================
// 상품등록 페이지 비동기 이동
function productInsertChange() {
   let url="product/productInsert";
   
   axios.get(url
   ).then(response => {
    //  alert("response 성공");
      document.getElementById('contentArea').innerHTML=response.data;
   }).catch(err => {
      alert("response 실패 => 바보" + err.message);
   });
   document.getElementById("contentArea").innerHTML="";

}

//==============================================================================
// 회원관리 페이지 비동기 이동
function memberChange() {
   let url="member/memberList";
   
   axios.get(url
   ).then(response => {
    //  alert("response 성공");
      document.getElementById('contentArea').innerHTML=response.data;
   }).catch(err => {
      alert("response 실패 => 바보" + err.message);
   });
   document.getElementById("contentArea").innerHTML="";

}

//==============================================================================
// 주문관리 페이지 비동기 이동
function ordersChange() {
   let url="orders/ordersList";
   
   axios.get(url
   ).then(response => {
    //  alert("response 성공");
      document.getElementById('contentArea').innerHTML=response.data;
   }).catch(err => {
      alert("response 실패 => 바보" + err.message);
   });
   document.getElementById("contentArea").innerHTML="";

}

//==============================================================================
// 관심상품 페이지 비동기 이동
function wishChange() {
   let url="wish/wishlist";
   
   axios.get(url
   ).then(response => {
    //  alert("response 성공");
      document.getElementById('contentArea').innerHTML=response.data;
   }).catch(err => {
      alert("response 실패 => 바보" + err.message);
   });
   document.getElementById("contentArea").innerHTML="";

}

//==============================================================================
// 상품후기 페이지 비동기 이동
function reviewChange() {
   let url="review/reviewList";
   
   axios.get(url
   ).then(response => {
    //  alert("response 성공");
      document.getElementById('contentArea').innerHTML=response.data;
   }).catch(err => {
      alert("response 실패 => 바보" + err.message);
   });
   document.getElementById("contentArea").innerHTML="";

}

//==============================================================================
// 게시판QnA 페이지 비동기 이동
function qnaChange() {
   let url="qna/qnaList";
   
   axios.get(url
   ).then(response => {
    //  alert("response 성공");
      document.getElementById('contentArea').innerHTML=response.data;
   }).catch(err => {
      alert("response 실패 => 바보" + err.message);
   });
   document.getElementById("contentArea").innerHTML="";

}

//==============================================================================
// 게시판QnA 글쓰기 페이지 비동기 이동
function qnaInsertChange() {
   let url="qna/qnaInsert";
   
   axios.get(url
   ).then(response => {
    //  alert("response 성공");
      document.getElementById('contentArea').innerHTML=response.data;
   }).catch(err => {
      alert("response 실패 => 바보" + err.message);
   });
   document.getElementById("contentArea").innerHTML="";

}

//==============================================================================
// 장바구니 페이지 비동기 이동
function cartChange() {
   let url="cart/cartList";
   
   axios.get(url
   ).then(response => {
    //  alert("response 성공");
      document.getElementById('contentArea').innerHTML=response.data;
   }).catch(err => {
      alert("response 실패 => 바보" + err.message);
   });
   document.getElementById("contentArea").innerHTML="";

}