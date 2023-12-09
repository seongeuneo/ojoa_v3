
// 장바구니 추가 함수
//function addCart(prod_num, quantity) {
function addCart(prod_num, quantity) {
	// axios를 사용하여 관심목록에 상품을 추가하는 요청
	//axios.post(`/cart/addCart`,{prod_num:prod_num, quantity:quantity})
	alert(`prod_num=${prod_num}, quantity=${quantity}`);
	axios.post(`/cart/addCart`, { prod_num: prod_num, quantity: quantity })
		.then(response => {
			// 요청이 성공한 경우
			console.log(response.data); // 추가 정보나 로그 등을 출력하거나 다른 작업 수행
			alert('상품이 장바구니에 추가되었습니다.');
			// 추가적인 작업이 필요한 경우 페이지 새로고침 또는 다른 동작을 수행할 수 있습니다.
			// window.location.reload(); // 예시로 페이지를 새로고침하는 코드
		})
		.catch(error => {
			// 요청이 실패한 경우
			console.error('장바구니 추가 중 오류 발생:', error);
			alert('상품을 장바구니에 추가하는데 문제가 발생했습니다.');
		});
}

//==========================================================================================

// addWish.js 파일

// 관심목록 추가 함수
function addWish(prod_num) {
	// axios를 사용하여 관심목록에 상품을 추가하는 요청
	axios.post(`/wish/addWish`, { prod_num: prod_num })
		.then(response => {
			// 요청이 성공한 경우
			console.log(response.data); // 추가 정보나 로그 등을 출력하거나 다른 작업 수행
			alert('상품이 관심목록에 추가되었습니다.');
			// 추가적인 작업이 필요한 경우 페이지 새로고침 또는 다른 동작을 수행할 수 있습니다.
			// window.location.reload(); // 예시로 페이지를 새로고침하는 코드
		})
		.catch(error => {
			// 요청이 실패한 경우
			console.error('관심목록 추가 중 오류 발생:', error);
			if (error.response && error.response.status === 400) {
				// 중복된 상품인 경우
				alert('이미 관심목록에 추가된 상품입니다.');
			} else {
				// 기타 오류인 경우
				alert('상품을 관심목록에 추가하는데 문제가 발생했습니다.');
			}
		});

}
//=========================================================================================

// 장바구니 삭제
function cartDelete(prod_num, id) {
   let url = `/cart/cdelete/${id}/${prod_num}`; // URL 형식 수정
   axios.delete(url).then(response => {
      alert("삭제 성공 => " + response.data);
      // 페이지 새로고침을 통해 업데이트된 장바구니 목록을 불러올 수 있습니다.
      window.location.reload();
   }).catch(err => {
      alert("삭제 실패 => " + err.message);
   });
};



//==========================================================================================
// 결제하기 버튼
function payNow(id) {
	// axios를 사용하여 관심목록에 상품을 추가하는 요청
	axios.get(`/orders/payNow?id=${id}`)
		.then(response => {
			// 요청이 성공한 경우
			console.log(response.data); // 추가 정보나 로그 등을 출력하거나 다른 작업 수행
			alert('결제 완료!!');
			// 추가적인 작업이 필요한 경우 페이지 새로고침 또는 다른 동작을 수행할 수 있습니다.
			// window.location.reload(); // 예시로 페이지를 새로고침하는 코드
		})
		.catch(error => {
			// 요청이 실패한 경우
			console.error('관심목록 추가 중 오류 발생:', error);
			alert('상품을 관심목록에 추가하는데 문제가 발생했습니다.');
		});
}

//==========================================================================================
// 상품 수정
function modifyProduct(prod_num) {
	// prod_num을 사용하여 수정해야 할 상품의 ID를 전달하거나 작업을 수행합니다.
	// 예를 들어, 상품 수정 페이지로 이동하는 URL을 생성하거나 다른 작업을 수행할 수 있습니다.
   let url ="product/productDetail?prod_num=" + prod_num;
   axios.get(
      url
        ).then(response => {
        let list = response.data;
      /*alert("** List 성공 **");*/
      document.getElementById('contentArea').innerHTML=list;
   }).catch(err => {
      if(err.response.status=='502') alert(err.response.data);
      else alert("~~ 시스템 오류, 잠시후 다시하세요 => " + err.message);
      document.getElementById('contentArea').innerHTML="";
      });
      
    document.getElementById("contentArea").innerHTML="";       
}
