// wish.js 파일
"use strict"

// 관심상품 삭제
function wishDelete(wish_num) {
   let url="/wish/wdelete/" + wish_num;
   axios.delete(url).then(response => {
      alert("삭제 성공 => " + response.data);
   }).catch(err => {
      alert("삭제 실패 => " + err.message);
   });
}


