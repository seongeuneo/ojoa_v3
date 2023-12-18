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


// 주문 삭제
function ordersDelete(orders_num) {
   let url="/orders/odelete/" + orders_num;
   axios.delete(url).then(response => {
      alert("삭제 성공 => " + response.data);
      // 페이지 새로고침을 통해 업데이트된 장바구니 목록을 불러올 수 있습니다.
       ordersChange() 
   }).catch(err => {
      alert("삭제 실패 => " + err.message);
   });
};
// ====================================================================================================================
// orders 페이지네이션
function ordersManagementPage(pageNumber) {
    let url = "orders/ordersList?page=" + pageNumber;

    axios.get(url
    ).then(response => {
        document.getElementById('contentArea').innerHTML = response.data;
        
        /* 요청받은 데이터를 출력하면서 제목과 내용의 길이를 조절*/
      let table = document.getElementById("ordersTable");
      let rows = table.getElementsByTagName("tr");
      
      /* 제목과 내용의 크기를 확인 후 substring을 위한 for문 */
      for (let i = 1; i < rows.length; i++) {
         let cells = rows[i].getElementsByTagName("td");
         
         if (cells.length >= 4) {
            /* 제목과 내용 데이터의 length를 확인하기위해*/
            let nameValue = cells[2].innerText; 
            let contentValue = cells[6].innerText; 
            
            /* 제목과 내용 데이터를 innerText를 사용하기 위해 변수 지정
            innerText = 변경값이 원본에 영향을 주지 않기 때문에. */
            let nameCell = cells[2];
            let contentCell = cells[6];
            
            if(nameValue.length > 20) {
               nameCell.innerText = nameValue.substring(0, 20) + "...";
            }
            
            if(contentValue.length > 15) {
               contentCell.innerText = contentValue.substring(0, 15) + "...";
            }
         }
      }   
    })
    .catch(err => {
        alert("FAQ List response 실패 =>" + err.message);
    });
}
