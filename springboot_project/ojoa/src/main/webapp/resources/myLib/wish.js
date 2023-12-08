//wish.js
"use strict"

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

function replyAnswerForm(qna_seq) {
   let url="qna/replyAnswer";
   
   axios.get(url
   ).then(response => {
    //  alert("response 성공");
      document.getElementById('contentArea').innerHTML=response.data;
   }).catch(err => {
      alert("response 실패 => 바보" + err.message);
   });
   document.getElementById("contentArea").innerHTML="";

}

// 게시판QnA 글쓰기 삭제
function qnaDelete(qna_seq) {
   let url="/qna/qdelete/" + qna_seq;
   axios.delete(url).then(response => {
      alert("삭제 성공 => " + response.data);
   }).catch(err => {
      alert("삭제 실패 => " + err.message);
   });
};

// 문의 답변 등록 완료
function replyAnswerFinish() {
   let formData = new FormData(document.getElementById("replyAnswerForm"));

   let url = "qna/replyAnswerForm";
   
   axios.post(url, formData, 
            {headers:{"Content-Type" : "multipart/form-data"}
   }).then (response => {
         alert("문의에 답변을 등록했습니다.");
         qnaList();
   }).catch(err => {
         if(err.response.status=='502') alert("답변 등록에 실패했습니다.");
         else alert("시스템 오류, 잠시 후 다시하세요 =>" + err.message);
   })
   document.getElementById("resultArea1").innerHTML="";
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


//==============================================================================
// 상품후기 삭제
function reviewDelete(review_seq) {
   let url="/review/rdelete/" + review_seq;
   axios.delete(url).then(response => {
      alert("삭제 성공 => " + response.data);
   }).catch(err => {
      alert("삭제 실패 => " + err.message);
   });
};





