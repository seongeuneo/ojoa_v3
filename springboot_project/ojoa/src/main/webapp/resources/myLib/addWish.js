// addWish.js 파일

// 관심목록 추가 함수
function addWish(prod_num) {
    // axios를 사용하여 관심목록에 상품을 추가하는 요청
    axios.get(`/wish/addWish?prod_num=${prod_num}`)
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
            alert('상품을 관심목록에 추가하는데 문제가 발생했습니다.');
        });
}


