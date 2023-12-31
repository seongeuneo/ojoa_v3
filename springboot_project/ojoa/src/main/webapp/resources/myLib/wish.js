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


// 답변달기 페이지로 이동
function replyAnswerForm(qna_seq) {
   
   let url="qna/replyAnswer/" + qna_seq;
   axios.get(url
   ).then(response => {
    //  alert("response 성공");
      document.getElementById('contentArea').innerHTML=response.data;
   }).catch(err => {
      alert("response 실패 => 바보" + err.message);
   });
   //document.getElementById("contentArea").innerHTML="";
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
function AnswerFinish(e) {
   e.preventDefault();
   
   let formData = new FormData(document.getElementById("replyAnswerForm"));

   let url = "qna/replyAnswerForm";
   
   axios.post(url, formData, 
            {headers:{"Content-Type" : "multipart/form-data"}
   }).then (response => {
         alert("문의에 답변을 등록했습니다.");
        document.getElementById('contentArea').innerHTML=response.data;
   }).catch(err => {
         if(err.response.status=='502') alert("답변 등록에 실패했습니다.");
         else alert("시스템 오류, 잠시 후 다시하세요 =>" + err.message);
   })
   //document.getElementById("resultArea1").innerHTML="";
}



//==============================================================================



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



//==============================================================================
// productInsert 페이지 비동기 이동
function productInsertAndMove(e) {
	e.preventDefault();
	let formData = new FormData(document.getElementById("myform"));

	let url = "/api/productInsert";

	axios.post(url, formData,
		{
			headers: { "Content-Type": "multipart/form-data" }
		}).then(response => {
			alert(`** response.data: ${response.data}`);
			location.reload(); //화면 새로고침
		}).catch(err => {
			if (err.response.status == '502') alert("~~ 입력 오류 !! 다시하세요 ~~");
			else alert("~~ 시스템 오류, 잠시후 다시하세요 => " + err.message);
		});

//	document.getElementById('resultArea2').innerHTML = "";




} //productInsert



// ====================================================================================================================
// review 페이지네이션
function reviewManagementPage(pageNumber) {
    let url = "review/reviewList?page=" + pageNumber;

    axios.get(url
    ).then(response => {
        document.getElementById('contentArea').innerHTML = response.data;
        
        /* 요청받은 데이터를 출력하면서 제목과 내용의 길이를 조절*/
      let table = document.getElementById("reviewTable");
      let rows = table.getElementsByTagName("tr");
      
      /* 제목과 내용의 크기를 확인 후 substring을 위한 for문 */
      for (let i = 1; i < rows.length; i++) {
         let cells = rows[i].getElementsByTagName("td");
         
         if (cells.length >= 4) {
            /* 제목과 내용 데이터의 length를 확인하기위해*/
            let nameValue = cells[3].innerText; 
            let contentValue = cells[4].innerText; 
            
            /* 제목과 내용 데이터를 innerText를 사용하기 위해 변수 지정
            innerText = 변경값이 원본에 영향을 주지 않기 때문에. */
            let nameCell = cells[3];
            let contentCell = cells[4];
            
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



// ====================================================================================================================
// qna 페이지네이션
function qnaManagementPage(pageNumber) {
    let url = "qna/qnaList?page=" + pageNumber;

    axios.get(url
    ).then(response => {
        document.getElementById('contentArea').innerHTML = response.data;
        
        /* 요청받은 데이터를 출력하면서 제목과 내용의 길이를 조절*/
      let table = document.getElementById("qnaTable");
      let rows = table.getElementsByTagName("tr");
      
      /* 제목과 내용의 크기를 확인 후 substring을 위한 for문 */
      for (let i = 1; i < rows.length; i++) {
         let cells = rows[i].getElementsByTagName("td");
         
         if (cells.length >= 4) {
            /* 제목과 내용 데이터의 length를 확인하기위해*/
            let idValue = cells[2].innerText; 
            let contentValue = cells[5].innerText; 
            
            /* 제목과 내용 데이터를 innerText를 사용하기 위해 변수 지정
            innerText = 변경값이 원본에 영향을 주지 않기 때문에. */
            let idCell = cells[2];
            let contentCell = cells[5];
            
            if(idValue.length > 20) {
               idCell.innerText = idValue.substring(0, 20) + "...";
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




