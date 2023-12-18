"use strict";

//==============================================================================
// productInsert 페이지 비동기 이동
function productInsertAndMove(e) {
	 if (inCheck()) {
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
	} else {
        // 유효성 검사를 통과하지 못한 경우
        e.preventDefault(); // 기본 이벤트(등록) 차단
        // 추가적인 처리나 알림 메시지 표시 등을 할 수 있습니다.
        alert('필수 입력값을 확인해주세요.');
    }

//	document.getElementById('resultArea2').innerHTML = "";




} //productInsert


/**
** 입력값의 무결성 확인
** member 무결성 확인사항
// Name : 길이(2이상), 영문 또는 한글로 만 입력
// ID : 길이(4~10), 영문자,숫자 로만 구성
// Password : 길이(4~10), 영문,숫자,특수문자로 구성, 특수문자는 반드시 1개 이상 포함할것
// Password2: 재입력후 Password 와 일치성 확인

** 작성 규칙
	=> JavaScript function 으로 정의 하고 
		결과를 true or false 로 return
	=> 정규식을 활용한다.

** match Test
	=> 아래 조건에 true -> not (!)  match 적용해보면
	=> 정확하지 않으므로 (부적절, replace 를 사용)
		...       
		} else if (!id.match(/[a-z.0-9]/gi)) {
			alert(' ID는 영문자와 숫자로만 입력하세요. !!!')
			return false;
		}    
 */


// 1) 상품명  : 길이, 한글과 영문

function prodnCheck() {
	let pdName = document.getElementById('prod_name').value;
	if (pdName.length < 2) {
		document.getElementById('pdnMessage').innerHTML = '상품명은 2글자 이상 입력하세요.';
		return false;

	} else if (pdName.replace(/[a-z.가-힣]/gi, '').length > 0) {
		document.getElementById('pdnMessage').innerHTML = '상품명은 한글과 영문으로만 입력하세요.';
		return false;

	} else {
		document.getElementById('pdnMessage').innerHTML = '';
		return true;
	};
} //prodnCheck

// 2) 상품종류
function prodkCheck() {
	
} //prodkCheck

// 3) 상품 할인율
function proddCheck() {
	let prod_discount = document.getElementById('prod_discount').value;
	if (prod_discount.length < 0 || prod_discount.length > 2) {
		document.getElementById('pddMessage').innerHTML = '100 미만으로 입력해주세요.';
		return false;

		// => 숫자로만 구성 되었는지 확인
	} else if (prod_discount.replace(/[0-9]/gi, '').length > 0) {
		document.getElementById('pddMessage').innerHTML = '숫자만 입력하세요.';
		return false;
	} else {
		document.getElementById('pddMessage').innerHTML = '';
		return true;
	};
} //proddCheck

// 4) 상품 가격
function prodpCheck() {
	let prod_price1 = document.getElementById('prod_price1').value;
	if (prod_price1.length < 0) {
		document.getElementById('pdpCheck').innerHTML = '숫자를 입력해주세요.';
		return false;

		// => 숫자로만 구성 되었는지 확인
	} else if (prod_price1.replace(/[0-9]/gi, '').length > 0) {
		document.getElementById('pdpCheck').innerHTML = '숫자만 입력하세요.';
		return false;
	} else {
		document.getElementById('pdpCheck').innerHTML = '';
		return true;
	};
} //prodpCheck

// 5) 상품 설명
function prodcCheck() {
	let prod_content = document.getElementById('prod_content').value;
	if (prod_content.length < 0) {
		document.getElementById('pdcMessage').innerHTML = '상품설명을 적어주세요.';
		return false;

	} else {
		document.getElementById('pdcMessage').innerHTML = '';
		return true;
	};
} //prodcCheck

// 6) 상품 판매유무
function pho2Check() {
} //pho2Check

// 7) 상품 등록일
function prodrCheck() {
} //prodrCheck

// 6) 상품 대표 이미지
function prodiCheck() {
} //prodiCheck




//==========================================================
// <상품 등록 유효성 검사>
//
//** ID 중복확인
//=> UI 개선사항
//=> 중복확인 버튼 추가
// 처음 : 중복확인버튼_enable / submit_disable
//=> 중복확인 완료후 submit 이 가능하도록
// 중복확인버튼_disable / submit_enable
//=> 중복확인 기능 : function idDupCheck()
// id입력값의 무결성점검 -> id 확인요청 -> 서버로 전송 -> id , selectOne 결과 -> response: 사용가능/불가능 
//=> 서버측 : 컨트롤러에 idDupCheck 요청을 처리하는 매핑메서드, view_Page(팝업창) 작성  

// 상품 중복체크 유효성검사
function prodDupCheck() {
   let productName = document.getElementById('prod_name').value;

    // 서버로 요청을 보내기 위한 Axios 사용
    axios.get('/product/checkProductName?prod_name=${productName}', {
        params: {
            prod_name: prod_name // 요청할 데이터 설정
        }
    })
    .then(response => {
        if (response.data) {
            // 상품명이 중복될 때 처리할 내용
            document.getElementById('pdnMessage').innerHTML = '상품명이 이미 존재합니다.';
        } else {
            // 상품명이 중복되지 않을 때 처리할 내용
            window.open('_blank', 'width=400,height=300,resizable=yes,scrollbars=yes,toolbar=no,menubar=yes');
        }
    })
    .catch(error => {
        // 에러 발생 시 처리할 내용
        console.error('Error:', error);
    });
}




// ** 입력값의 무결성 점검 ***************************
// 1) 전역변수 정의
//=> 입력값의 무결성 점검여부를 확인하는 switch 변수
  let pdnCheck=false; // 상품 이름
  let pdkCheck=false; // 상품 종류
  let pddCheck=false; // 상품 할인율
  let pdpCheck=false; // 상품 가격
  let pdcCheck=false; // 상품 설명
  let pdynCheck=false; // 상품 판매유무
  let pdsCheck=false; // 재고 수량
  let pdrCheck=false; // 상품 등록일
  let pdiCheck=false; // 상품 대표 이미지


window.onload=function() {
	  
	// => 상품 이름============================================================
	document.getElementById('prod_name').focus();
	document.getElementById('prod_name').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('id').focus();
				} //if 		
			});
	// -> 무결성 확인
	document.getElementById('prod_kind').addEventListener('focusout',
			()=>{ pdnCheck=prodnCheck(); }); 
	
	// => 상품 종류============================================================
	// -> keydown_EnterKey 에 포커스이동 적용
	// -> 제어문자의 ascii 코드 값(참고)
	//	  esc=27, EnterKey=13, Space_Bar=32
	document.getElementById('prod_kind').addEventListener('keydown', 
		(e) => { 
			if ( e.which==13 ) {
				e.preventDefault();
				// => form 에 submit 이 있는경우
				// => enter 누르면 자동 submit 발생되므로 이를 제거함
				document.getElementById('prod_discount').focus();
			} //if
		});
	// -> 무결성 확인
	document.getElementById('prod_kind').addEventListener('focusout',
			()=>{ pdkCheck=prodkCheck(); }); 	  
	  
	// => 상품 할인율============================================================
	document.getElementById('prod_discount').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('prod_price1').focus();
				} //if 		
			});
	// -> 무결성 확인
	document.getElementById('prod_discount').addEventListener("focusout",
			()=> { pddCheck=proddCheck(); });
	
	// =>  상품 가격============================================================
	document.getElementById('prod_price1').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('prod_content').focus();
				} //if 		
			});
	// -> 무결성 확인
	document.getElementById('prod_price1').addEventListener("focusout",
			()=> { pdpCheck=prodpCheck(); });
	
	// => 상품 설명 ============================================================
	document.getElementById('prod_content').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('prod_sellyn').focus();
				} //if 		
			});
	// -> 무결성 확인
	document.getElementById('prod_content').addEventListener("focusout",
			()=> { pdcCheck=prodcCheck(); });
	
	// => 상품 판매유무 ============================================================
	document.getElementById('prod_sellyn').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('prod_stock').focus();
				} //if 		
			});
	// -> 무결성 확인
	document.getElementById('prod_sellyn').addEventListener("focusout",
			()=> { pdynCheck=prodynCheck(); });
	
	// => 재고 수량 ============================================================
	document.getElementById('prod_stock').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('prod_regdate').focus();
				} //if 		
			});
	// -> 무결성 확인
	document.getElementById('prod_stock').addEventListener("focusout",
			()=> { pdsCheck=prodsCheck(); });
	
	// => 상품 등록일 ============================================================
	document.getElementById('prod_regdate').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('uploadfilef').focus();
				} //if 		
			});
	// -> 무결성 확인
	document.getElementById('prod_regdate').addEventListener("focusout",
			()=> { pdrCheck=prodrCheck(); });
	
	// => 상품 대표 이미지 ============================================================
	document.getElementById('uploadfilef').addEventListener("keydown",
			(e)=> {
				if ( e.which==13 ) {
					e.preventDefault();
					document.getElementById('submitTag').focus();
				} //if 		
			});
	// -> 무결성 확인
	document.getElementById('uploadfilef').addEventListener("focusout",
			()=> { pdiCheck=prodiCheck(); });
	
}; //onload

// 3) submit 실행 여부 판단 & 실행
// => 모든항목의 무결성을 확인
// => 오류가 없으면 : return true
// => 오류가 1항목이라도 있으면 : return false 
function inCheck() {
	if (pdnCheck==false) { document.getElementById('pdnMessage').innerHTML=' 필수입력, 상품이름 을 확인하세요~~'; }
	if (pdkCheck==false) { document.getElementById('pdkMessage').innerHTML=' 필수입력, 상품종류 를 확인하세요~~'; }
	if (pddCheck==false) { document.getElementById('pddMessage').innerHTML=' 필수입력, 상품할인률 를 확인하세요~~'; }
	if (pdpCheck==false) { document.getElementById('pdpMessage').innerHTML=' 필수입력, 상품가격 을 확인하세요~~'; }
	if (pdcCheck==false) { document.getElementById('pdcMessage').innerHTML=' 필수입력, 상품설명 을 확인하세요~~'; }
	if (pdynCheck==false) { document.getElementById('pdynMessage').innerHTML=' 필수입력, 판매유무 를 선택하세요~~'; }
	if (pdsCheck==false) { document.getElementById('pdsMessage').innerHTML=' 필수입력, 재고수량 을 확인하세요~~'; }
	if (pdrCheck==false) { document.getElementById('pdrMessage').innerHTML=' 필수입력, 등록일 을 확인하세요~~'; }
	if (pdiCheck==false) { document.getElementById('pdiMessage').innerHTML=' 필수입력, 상품이미지 를 확인하세요~~'; }
	
	if (pdnCheck && pdkCheck && pddCheck && pdpCheck && pdcCheck 
			   && pdynCheck && pdsCheck && pdrCheck && pdiCheck) {
		// => submit 확인
		if ( confirm(" 상품 등록을 하시겠습니까? (Yes:확인 / No:취소)") ) {
			// => submit 진행
			return true
		}else {
			alert("~~  상품등록이 취소 되었습니다 ~~");
			return false;
		} //alert
	}else {
		return false;
	}
} //inCheck