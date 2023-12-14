
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
function cartDelete(id, prod_num) {
   let url = "/cart/cdelete/" + id + "/" + prod_num; // URL 형식 수정
   axios.delete(url).then(response => {
      alert("삭제 성공 => " + response.data);
      // 페이지 새로고침을 통해 업데이트된 장바구니 목록을 불러올 수 있습니다.
      window.location.reload();
   }).catch(err => {
      alert("삭제 실패 => " + err.message);
   });
};


//==========================================================================================
// 상품 비동기 삭제
 // axios를 사용하여 DELETE 요청 보내기
    const productDelete = (prod_num) => {
        axios.delete(`/product/pdelete/${prod_num}`)
            .then((response) => {
                // 삭제 요청이 성공하면 성공 메시지 출력 혹은 다른 작업 수행
                console.log("삭제 요청 성공:", response);
                // 성공했을 때 필요한 작업 수행

                // 삭제된 항목을 화면에서도 제거하려면 해당 요소를 state에서 필터링하여 재설정해야합니다.
                setData(data.filter(item => item.prod_num !== prod_num));
                alert('상품 삭제 성공');
            })
            .catch((error) => {
                // 삭제 요청이 실패한 경우 에러 메시지 출력
                console.error("삭제 요청 실패:", error);
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

//==========================================================================================
// 상품 정렬

function sortTable(columnIndex) {
    const table = document.querySelector('table');
    const rows = table.querySelectorAll('tr');
    let shouldSwitch = false;

    // 스위칭 변수 설정
    let switching = true;
    let direction = 'asc'; // 초기 정렬 방향

    while (switching) {
        switching = false;
        const rowsArray = [];
        for (let i = 1; i < rows.length; i++) {
            rowsArray.push(rows[i]);
        }

        for (let i = 0; i < rowsArray.length - 1; i++) {
            let shouldSwitch = false;
            let x = rowsArray[i].querySelectorAll('td')[columnIndex].innerHTML.toLowerCase();
            let y = rowsArray[i + 1].querySelectorAll('td')[columnIndex].innerHTML.toLowerCase();

            if (direction === 'asc') {
                if (x > y) {
                    shouldSwitch = true;
                    break;
                }
            } else if (direction === 'desc') {
                if (x < y) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rowsArray[i].parentNode.insertBefore(rowsArray[i + 1], rowsArray[i]);
            switching = true;
        } else {
            if (direction === 'asc') {
                direction = 'desc';
                switching = true;
            }
        }
    }
}

//==========================================================================================
// 상품 정렬 :filterProducts

function filterProducts() {
    var filterKind = document.getElementById("filterKind"); // select 요소 가져오기
    var selectedKind = filterKind.options[filterKind.selectedIndex].value; // 선택된 옵션 값 가져오기

    // 선택된 카테고리에 따라 제품 필터링하는 로직
    var rows = document.querySelectorAll("table tr");
    for (var i = 1; i < rows.length; i++) { // 헤더 행을 건너뛰기 위해 인덱스 1부터 시작
        var category = rows[i].getElementsByTagName("td")[3].textContent; // 카테고리가 있는 네 번째 열을 가정
        if (selectedKind === "all" || category === selectedKind) {
            rows[i].style.display = ""; // 해당 행 보이기
        } else {
            rows[i].style.display = "none"; // 해당 행 숨기기
        }
    }
}


//==========================================================================================
// 상품 검색 
function filterProductsByName() {
    var input, filter, table, tr, td, productName, i, txtValue;
    input = document.getElementById("productNameInput"); // 검색어 입력 요소 가져오기
    filter = input.value.toUpperCase(); // 검색어를 대문자로 변환하여 일치 검색하기 위해 사용
    table = document.querySelector("table"); // 테이블 요소 가져오기
    tr = table.getElementsByTagName("tr"); // 테이블의 각 행 가져오기

    // 각 행을 순회하며 검색어와 일치하는 제품 이름이 있는지 확인
    for (i = 1; i < tr.length; i++) { // 헤더 행을 건너뛰기 위해 인덱스 1부터 시작
        td = tr[i].getElementsByTagName("td")[2]; // 제품 이름이 있는 세 번째 열을 가정
        if (td) {
            productName = td.textContent || td.innerText;
            if (productName.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = ""; // 검색어와 일치하는 제품이면 보이기
            } else {
                tr[i].style.display = "none"; // 검색어와 일치하지 않는 제품은 숨기기
            }
        }
    }
}


//==========================================================================================
// 회원 ID 검색 
function filterMembersByName() {
    var input, filter, table, tr, td, memberId, i, txtValue;
    input = document.getElementById("productNameInput"); // 검색어 입력 요소 가져오기
    filter = input.value.toUpperCase(); // 검색어를 대문자로 변환하여 일치 검색하기 위해 사용
    table = document.querySelector("table"); // 테이블 요소 가져오기
    tr = table.getElementsByTagName("tr"); // 테이블의 각 행 가져오기

    // 각 행을 순회하며 검색어와 일치하는 제품 이름이 있는지 확인
    for (i = 1; i < tr.length; i++) { // 헤더 행을 건너뛰기 위해 인덱스 1부터 시작
        td = tr[i].getElementsByTagName("td")[0]; // 회원 ID가 있는 첫 번째 열을 가정
        if (td) {
            memberId = td.textContent || td.innerText;
            if (memberId.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = ""; // 검색어와 일치하는 제품이면 보이기
            } else {
                tr[i].style.display = "none"; // 검색어와 일치하지 않는 제품은 숨기기
            }
        }
    }
}


//==========================================================================================
// 페이지네이션 
// 페이지당 아이템 수 정의
// 페이지당 아이템 수 정의
const itemsPerPage = 5;

// 제품 행 가져오고 총 페이지 계산
const productRows = document.querySelectorAll('table tr:not(.prod-columns)');
const totalPages = Math.ceil(productRows.length / itemsPerPage);

// 페이지 번호에 따라 아이템 표시하는 함수
function displayItems(pageNumber) {
    productRows.forEach((row, index) => {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        if (index >= startIndex && index < endIndex) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    });
}

// 초기 페이지 표시
displayItems(1);

// 페이지 번호 생성 함수
function generatePageNumbers() {
    let pageNumbersHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        pageNumbersHTML += `<button onclick="displayItems(${i})">${i}</button>`;
    }
    document.getElementById('pageNumbers').innerHTML = pageNumbersHTML;
}

// 초기 페이지 번호 표시
generatePageNumbers();

// 페이지네이션 버튼 이벤트 리스너
document.getElementById('prevPage').addEventListener('click', () => {
    const currentPage = parseInt(document.querySelector('#pageNumbers button.active').innerText);
    if (currentPage > 1) {
        displayItems(currentPage - 1);
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    const currentPage = parseInt(document.querySelector('#pageNumbers button.active').innerText);
    if (currentPage < totalPages) {
        displayItems(currentPage + 1);
    }
});



// FAQ 페이지네이션
function faqManagementPage(pageNumber) {
    let url = "member/memberList?page=" + pageNumber;

    axios.get(url
    ).then(response => {
        document.getElementById('contentArea').innerHTML = response.data;
        
        /* 요청받은 데이터를 출력하면서 제목과 내용의 길이를 조절*/
      let table = document.getElementById("memberTable");
      let rows = table.getElementsByTagName("tr");
      
      /* 제목과 내용의 크기를 확인 후 substring을 위한 for문 */
      for (let i = 1; i < rows.length; i++) {
         let cells = rows[i].getElementsByTagName("td");
         
         if (cells.length >= 4) {
            /* 제목과 내용 데이터의 length를 확인하기위해*/
            let passwordValue = cells[1].innerText; 
            let indateValue = cells[14].innerText; 
            
            /* 제목과 내용 데이터를 innerText를 사용하기 위해 변수 지정
            innerText = 변경값이 원본에 영향을 주지 않기 때문에. */
            let passwordCell = cells[1];
            let indateCell = cells[14];
            
            if(passwordValue.length > 20) {
               passwordCell.innerText = passwordValue.substring(0, 20) + "...";
            }
            
            if(indateValue.length > 15) {
               indateCell.innerText = indateValue.substring(0, 15) + "...";
            }
         }
      }   
    })
    .catch(err => {
        alert("FAQ List response 실패 =>" + err.message);
    });
}




