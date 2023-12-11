// 주문 삭제
function ordersDelete(orders_num) {
   let url="/orders/odelete/" + orders_num;
   axios.delete(url).then(response => {
      alert("삭제 성공 => " + response.data);
      // 페이지 새로고침을 통해 업데이트된 장바구니 목록을 불러올 수 있습니다.
      window.location.reload();
   }).catch(err => {
      alert("삭제 실패 => " + err.message);
   });
};


