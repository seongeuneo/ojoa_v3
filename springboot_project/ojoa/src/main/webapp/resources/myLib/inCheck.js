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

"use strict"

// 1) Name : 길이, 한글과 영문
function nmCheck() {
    let name = document.getElementById('name').value;
    if (name.length < 2) {
        document.getElementById('nMessage').innerHTML = 'name 은 2글자 이상 입력하세요.';
        return false;

    } else if (name.replace(/[a-z.가-힣]/gi, '').length > 0) {
        document.getElementById('nMessage').innerHTML = 'name 은 한글과 영문으로만 입력하세요.';
        return false;

    } else {
        document.getElementById('nMessage').innerHTML = '';
        return true;
    };
} //nmCheck
	
// 2) ID
function idCheck() {
    let id = document.getElementById('id').value;
    if (id.length < 4 || id.length > 10) {
        document.getElementById('iMessage').innerHTML = 'id 는 4~10 글자 입니다.';
        return false;

        // => 영문과 숫자로만 입력했는지 : id 에서 영문과 숫자를 모두 ' ' 로 변경하면 length 가 0 이면 OK
    } else if (id.replace(/[a-z.0-9]/gi, '').length > 0) {  // g = id 안의 모든 문자 / i = 대문자는 소문자로 변환.
        document.getElementById('iMessage').innerHTML = 'id 는 영문과 숫자만 입력하세요.';
        return false;

    } else {
        document.getElementById('iMessage').innerHTML = '';
        return true;
    };
} //idCheck

// 3) Password
function pwCheck() {
    let password = document.getElementById('password').value;
    let special = /[!-*.@]/gi;  // 특수문자 범위 축소
    if (password.length < 4 || password.length > 10) {
        document.getElementById('pMessage').innerHTML = 'password 는 4~10 글자 입니다.';
        return false;

        // => 영문, 숫자, 특수문자 로만 구성 되었는지 확인
    } else if (password.replace(/[a-z.0-9.!-*.@]/gi, '').length > 0) {
        document.getElementById('pMessage').innerHTML = '영문, 숫자, 특수문자만 입력하세요.';
        return false;

        // => 특수문자 포함 확인 : 정규식의 test 메서드 활용
    } else if (special.test(password) == false) {
        document.getElementById('pMessage').innerHTML = '특수문자가 포함되어야 합니다.';
        return false;

    } else {
        document.getElementById('pMessage').innerHTML = '';
        return true;
    };
} //pwCheck

// 4) Password2
// => password 와 동일성 확인
function pw2Check() {
    let password = document.getElementById('password').value;
    let password2 = document.getElementById('password2').value;
    if (password !== password2) {
        document.getElementById('p2Message').innerHTML = 'password 가 다릅니다.';
        return false;

    } else {
        document.getElementById('p2Message').innerHTML = '';
        return true;
    };
} //pw2Check
  
// 5) Phone1
function pho1Check() {
    let phone1 = document.getElementById('phone1').value;
    if (phone.length < 3) {
        document.getElementById('ph1Message').innerHTML = '전화번호를 올바르게 입력하세요.';
        return false;

        // => 숫자 로만 구성 되었는지 확인
    } else if (phone1.replace(/[0-9]/gi, '').length > 0) {
        document.getElementById('ph1Message').innerHTML = '숫자만 입력하세요.';
        return false;

    } else {
        document.getElementById('ph1Message').innerHTML = '';
        return true;
    };
} //pho1Check
  
// 6) Phone2
function pho2Check() {
    let phone2 = document.getElementById('phone2').value;
    if (phone2.length < 4) {
        document.getElementById('ph2Message').innerHTML = '중간 4자리 번호를 올바르게 입력하세요.';
        return false;

        // => 숫자 로만 구성 되었는지 확인
    } else if (phone2.replace(/[0-9]/gi, '').length > 0) {
        document.getElementById('ph2Message').innerHTML = '숫자만 입력하세요.';
        return false;

    } else {
        document.getElementById('ph2Message').innerHTML = '';
        return true;
    };
} //pho2Check
  
// 7) Phone3
function pho3Check() {
    let phone3 = document.getElementById('phone3').value;
    if (phone3.length < 4) {
        document.getElementById('ph3Message').innerHTML = '마지막 4자리 번호를 올바르게 입력하세요.';
        return false;

        // => 숫자 로만 구성 되었는지 확인
    } else if (phone3.replace(/[0-9]/gi, '').length > 0) {
        document.getElementById('ph3Message').innerHTML = '숫자만 입력하세요.';
        return false;

    } else {
        document.getElementById('ph3Message').innerHTML = '';
        return true;
    };
} //pho3Check
  
// 6) email1
function email1Check() {
    let email1 = document.getElementById('email1').value;
    if (email1.length < 3) {
        document.getElementById('em1Message').innerHTML = '이메일을 입력하세요.';
        return false;
    } else {
        document.getElementById('em1Message').innerHTML = '';
        return true;
    };
} //email1Check
  
// 7) email2
function email2Check() {
    let email2 = document.getElementById('email2').value;
    if (email2.length < 3) {
        document.getElementById('em2Message').innerHTML = '도메인을 입력하세요.';
        return false;
    } else {
        document.getElementById('em2Message').innerHTML = '';
        return true;
    };
} //email2Check
  
// 8) zip_code
function zipCheck() {
    let zipcode = document.getElementById('zipcode').value;
    if (zipcode.length < 2) {
        document.getElementById('zMessage').innerHTML = '우편번호를 입력하세요.';
        return false;
    } else {
        document.getElementById('zMessage').innerHTML = '';
        return true;
    };
} //zipCheck
  
// 9) address
function addressCheck() {
    let address = document.getElementById('address').value;
    if (address.length < 4) {
        document.getElementById('aMessage').innerHTML = '주소를 입력하세요.';
        return false;
    } else {
        document.getElementById('aMessage').innerHTML = '';
        return true;
    };
} //addressCheck
  
// 10) address_detail
function addressdetailCheck() {
    let addressdetail = document.getElementById('addressdetail').value;
    if (addressdetail.length < 2) {
        document.getElementById('adMessage').innerHTML = '상세주소를 입력하세요.';
        return false;
    } else {
        document.getElementById('adMessage').innerHTML = '';
        return true;
    };
} //addressdetailCheck



//==============================================================================
// productInsert 페이지 비동기 이동
function productInsertAndMove() {
   let url="product/productList";
   
   axios.get(url
   ).then(response => {
    //  alert("response 성공");
      document.getElementById('contentArea').innerHTML=response.data;
   }).catch(err => {
      alert("response 실패 => 바보" + err.message);
   });
   document.getElementById("contentArea").innerHTML="";

} //productInsert

//==============================================================================
// 로그인 페이지 비동기 이동
function loginChange() {
   let url = "member/loginForm";
   
   axios.get(url)
     .then(response => {
        document.getElementById('contentArea').innerHTML = response.data;
     })
     .catch(err => {
        alert("response 실패 => " + err.message);
     });
} //loginChange

//==============================================================================
// 회원가입 페이지 비동기 이동
function joinChange() {
   let url="member/memberJoin";
   
   axios.get(url
   ).then(response => {
    //  alert("response 성공");
      document.getElementById('contentArea').innerHTML=response.data;
   }).catch(err => {
      alert("response 실패 => 바보" + err.message);
   });
   document.getElementById("contentArea").innerHTML="";

} //joinChange

//==========================================================
// 로그인폼 아이디유효성체크 버튼
function idCheck() {

	
} //idCheck()
	
//==========================================================
// 내정보 페이지 비동기 이동


//==========================================================
// 로그인폼 아이디유효성체크 버튼
