// review.js 파일

// 상품후기 삭제
function reviewDelete(review_seq) {
   let url="/review/rdelete/" + review_seq;
   axios.delete(url).then(response => {
      alert("삭제 성공 => " + response.data);
   }).catch(err => {
      alert("삭제 실패 => " + err.message);
   });
};