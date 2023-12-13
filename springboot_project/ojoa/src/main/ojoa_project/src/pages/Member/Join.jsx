import './Join.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import Post from "../../components/Post";

const Join = () => {
    const navigate = useNavigate();

    const handleIdDuplication = () => {
        axios.get(`/member/ridDupCheck?id=${id}`)
            .then((response) => {
                console.log("응답 데이터:", response.data); // 응답 데이터 확인
                alert("가입 가능한 ID입니다.");
            })
            .catch((error) => {
                if (error.response.status == '502')
                    alert("중복된 ID입니다. 다른 ID를 입력해주세요.");
                else {
                    alert("중복 확인 에러:", error.message);
                    console.error("중복 확인 에러:", error.message);
                }
            });
    };

    // 중복 확인 버튼 클릭 시 실행될 함수
    const handleCheckDuplicate = () => {
        if (id.length === 0) {
            alert("ID를 입력해주세요.");
            return;
        }
        handleIdDuplication();
    };

    // 엔터키 누르면 아래로
    const handleKeyDown = (event, nextInputRef) => {
        if (event.key === "Enter") {
            event.preventDefault(); // 기본 엔터키 동작 방지
            nextInputRef.current.focus(); // 다음 입력 필드로 포커스 이동
        }
    };

    // 주소 관련 상태
    // const [address, setAddress] = useState(""); // 주소
    // const [addressError, setAddressError] = useState("");
    const [addressdetail, setAddressdetail] = useState(""); // 상세주소
    const [addressdetailError, setAddressdetailError] = useState("");

    const [enroll_company, setEnroll_company] = useState({
        address: '',
        zipcode: '',
    });

    const handleInput = (e) => {
        setEnroll_company({
            ...enroll_company,
            [e.target.name]: e.target.value,
        })
    }

    // 연락처 관련 상태
    const [phone2, setPhone2] = useState("");
    const [phone2Error, setPhone2Error] = useState("");
    const [phone3, setPhone3] = useState("");
    const [phone3Error, setPhone3Error] = useState("");

    // Ref 객체 추가
    const idInputRef = useRef(null); // 아이디 입력 필드의 Ref 객체
    const passwordInputRef = useRef(null);
    const password2InputRef = useRef(null);
    // const addressInputRef = useRef(null);
    const addressdetailInputRef = useRef(null);
    const phone2InputRef = useRef(null);
    const phone3InputRef = useRef(null);
    const email1InputRef = useRef(null);
    const email2InputRef = useRef(null);

    // 이름
    const [name, setName] = useState(""); // 이름 상태와 변경 함수
    const [nameError, setNameError] = useState(""); // 이름 에러 메세지
    const handleNameChange = (event) => {
        const newName = event.target.value;
        setName(newName);
        // 이름 입력시 2자 이상 입력했는지
        if (newName.length < 2) {
            setNameError("2자 이상 입력해주세요.");
        } else if (newName.replace(/[a-z.가-힣]/gi, '').length > 0) {
            setNameError("이름은 한글과 영문으로만 입력하세요.");
        } else {
            setNameError("");
        }
    };

    // 아이디 -> 중복확인은 아니고 그냥 아이디값 입력잘했는지
    const [id, setId] = useState("");  // 아이디 상태와 변경 함수
    const [idError, setIdError] = useState(""); // 이름 에러 메세지
    const handleidChange = (event) => {
        const newId = event.target.value;
        setId(newId);
        console.log(newId);
        // 아이디 입력시 4자~10 입력했는지
        if (newId.length < 4 || newId.length > 10) {
            setIdError("아이디는 4~10 글자 입니다.");
        } else if (newId.replace(/[a-z.0-9]/gi, '').length > 0) {  // g = id 안의 모든 문자 / i = 대문자는 소문자로 변환.
            setIdError("id 는 영문과 숫자만 입력하세요.");
        } else {
            setIdError("");
        }
    };

    // 비밀번호
    const [password, setPassword] = useState(""); // 비밀번호 상태와 변경 함수
    const [passwordError, setPasswordError] = useState(""); // 비밀번호 오류메세지
    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        // 비밀번호 입력값
        if (newPassword.length < 4 || newPassword.length > 10) {
            setPasswordError("비밀번호는 4~10 글자 입니다.");
        } else if (newPassword.replace(/[a-z.0-9.!-*.@]/gi, '').length > 0) {
            setPasswordError("영문, 숫자, 특수문자만 입력하세요.");
        } else if (/[!@#$%^&*()+\-=[\]{};':"\\|,.<>/?]+/.test(newPassword) == false) {
            setPasswordError("특수문자가 포함되어야 합니다.");
        } else {
            setPasswordError("");
        };

        // const isValidPassword = newPassword.length < 4 &&
        //     newPassword.length > 10 &&
        //     /[!@#$%^&*()+\-=[\]{};':"\\|,.<>/?]+/.test(newPassword);

        // if (!isValidPassword) {
        //     setPasswordError("비밀번호는 4~10 글자, 최소 1개의 특수문자를 포함해야 합니다.");
        // } else {
        //     setPasswordError("");
        // }
    };

    // 비밀번호 확인
    const [password2, setPassword2] = useState("");
    const [password2Error, setPassword2Error] = useState(""); // 비밀번호 확인 오류 메세지
    const handlePassword2Change = (event) => {
        const newPassword2 = event.target.value;
        setPassword2(newPassword2);
        // 비밀번호 확인 입력값 비교
        if (newPassword2 !== password) {
            setPassword2Error("비밀번호가 일치하지 않습니다.");
        } else {
            setPassword2Error("");
        }
    };

    // // 우편번호 확인
    // const [zipcode, setZipcode] = useState("");
    // const [zipcodeError, setZipcodeError] = useState("");
    // const handleZipcodeChange = (event) => {
    //     const newZipcode = event.target.value;
    //     // 우편번호 입력값이 숫자와 "-"만으로 구성되어 있는지 확인
    //     if (!/^[0-9-]*$/.test(newZipcode)) {
    //         setZipcodeError("우편번호는 숫자와 기호 '-'만 가능합니다.");
    //     } else {
    //         // 숫자와 "-"만으로 구성된 경우에만 우편번호 변경 및 오류 초기화
    //         setZipcode(newZipcode);
    //         setZipcodeError("");
    //     }
    // };

    // // 주소 확인
    // const handleAddressChange = (event) => {
    //     const newAddress = event.target.value;
    //     // 주소 입력값이 4글자 이상으로 구성되엉 있는지 확인
    //     if (newAddress.length < 0 || newAddress.length > 40) {
    //         setAddressError("주소는 4글자 이상 40글자 이하여야 합니다.");
    //     } else {
    //         setAddress(newAddress);
    //         setAddressError("");
    //     }
    // };

    // 상세주소 확인
    const handleAddressdetailChange = (event) => {
        const newAddressdetail = event.target.value;
        setAddressdetail(newAddressdetail);
        // 상세주소 입력값이 2글자 이상으로 구성되엉 있는지 확인
        if (newAddressdetail.length < 2) {
            setAddressdetailError("상세주소는 2글자 이상이어야 합니다.");
        } else {
            setAddressdetail(newAddressdetail);
            setAddressdetailError("");
        }
    };

    // 연락처2 확인
    const handlePhone2Change = (event) => {
        const newPhone2 = event.target.value;
        setPhone2(newPhone2);
        // 연락처2 입력값이 숫자 4자리로 구성되어 있는지 확인
        if (!/^\d{4}$/.test(newPhone2)) {
            setPhone2Error("연락처 중간번호는 숫자 4자리만 가능합니다.");
        } else {
            setPhone2(newPhone2);
            setPhone2Error("");
        }
    };

    // 연락처3 확인
    const handlePhone3Change = (event) => {
        const newPhone3 = event.target.value;
        setPhone3(newPhone3);
        // 연락처3 입력값이 숫자 4자리로 구성되어 있는지 확인
        if (!/^\d{4}$/.test(newPhone3)) {
            setPhone3Error("연락처 끝번호는 숫자 4자리로 입력해주세요.");
        } else {
            setPhone3(newPhone3);
            setPhone3Error("");
        }
    };

    // 이메일1 확인
    const [email1, setEmail1] = useState("");
    const [email1Error, setEmail1Error] = useState("");
    const handleEmail1Change = (event) => {
        const newEmail1 = event.target.value;
        setEmail1(newEmail1);
        // 이메일1 입력값이 알파벳과 숫자 만으로 구성되어 있는지 확인
        if (!/^[a-zA-Z0-9]+$/.test(newEmail1)) {
            setEmail1Error("이메일은 최소 3글자 이상의 알파벳과 숫자만 가능합니다.");
        } else {
            // 알파벳과 숫자로만 구성된 경우에만 연락처 끝번호 변경 및 오류 초기화
            setEmail1(newEmail1);
            setEmail1Error("");
        }
    };

    // 이메일2 확인
    const [email2, setEmail2] = useState("");
    const [email2Error, setEmail2Error] = useState("");
    const handleEmail2Change = (event) => {
        const newEmail2 = event.target.value;
        setEmail2(newEmail2);
        // 이메일2 입력값이 최소 3글자 이상의 알파벳, 숫자, '.'로 구성되어 있는지 확인
        if (!/^[a-zA-Z0-9.]+$/.test(newEmail2)) {
            setEmail2Error("도메인은 최소 3글자의 알파벳, 숫자, '.'으로만 입력 가능합니다.");
        } else {
            setEmail2(newEmail2);
            setEmail2Error("");
        }
    };

    // 취소 버튼 클릭 시 -> 입력된거 초기화
    // const handleCancelClick = () => {
    //     setName("");
    //     setId("");
    //     setPassword("");
    //     setPassword2("");
    // };

    const clickJoin = (e) => {

        e.preventDefault();

        // 각 항목별로 유효성 검사를 통과했는지를 나타내는 변수들
        let isNameValid = nameError === '';
        let isIdValid = idError === '';
        let isPasswordValid = passwordError === '';
        let isPassword2Valid = password2Error === '';
        // let isZipcodeValid = zipcodeError === '';
        // let isAddressValid = addressError === '';
        let isAddressDetailValid = addressdetailError === '';
        let isPhone2Valid = phone2Error === '';
        let isPhone3Valid = phone3Error === '';
        let isEmail1Valid = email1Error === '';
        let isEmail2Valid = email2Error === '';

        // 모든 항목의 유효성 검사를 통과했는지 확인하는 check 변수
        let check =
            isNameValid &&
            isIdValid &&
            isPasswordValid &&
            isPassword2Valid &&
            // isZipcodeValid &&
            // isAddressValid &&
            isAddressDetailValid &&
            isPhone2Valid &&
            isPhone3Valid &&
            isEmail1Valid &&
            isEmail2Valid;

        if (check) {
            axios
                .post('/member/rjoin', {
                    name: name,
                    id: id,
                    password: password,
                    password2: password2,
                    zipcode: enroll_company.zipcode,
                    address: enroll_company.address,
                    addressdetail: addressdetail,
                    phone1: "010",
                    phone2: phone2,
                    phone3: phone3,
                    email1: email1,
                    email2: email2,
                    marketing_sms: document.getElementById('marketing_sms').checked ? 'y' : 'n',
                    marketing_email: document.getElementById('marketing_email').checked ? 'y' : 'n',
                    memberyn: "y",
                    mileage: "0",
                })
                .then((response) => {
                    console.log(response.data);
                    if (response.data != null) {
                        alert("회원가입이 완료되었습니다.");
                        navigate('/member/rlogin');
                    } else {
                        alert("회원가입에 실패했습니다.");
                    }
                    console.log(`** checkdata 서버연결 성공 => ${response.data}`);
                }).catch((err) => {
                    alert(`** checkdata 서버연결 실패 => ${err.message}`);
                });
        } else {
            alert("입력 내용을 확인해주세요.");
        }

    };

    return (
        <div className="Join">
            <div className="path">
                <span>현재 위치</span>
                <ol>
                    <li><Link to="/">홈</Link></li>
                    <li title="현재 위치"> &gt; &nbsp; Join</li>
                </ol>
            </div>
            <div className="title">
                <h2>JOIN</h2>
                <div className="txt_01">회원가입</div>
            </div>
            <form onSubmit={e => { clickJoin(e) }}>
                <table className="personal_join">
                    <caption>
                        <h3>회원정보</h3>
                    </caption>
                    <tr>
                        <th>
                            <label for="name"><span>&#42;</span>이름</label>
                        </th>
                        <td>
                            <input type="text"
                                name="name"
                                minlength="2"
                                id="name"
                                value={name}
                                onChange={handleNameChange}
                                onKeyDown={(e) => handleKeyDown(e, idInputRef)} // 다음 입력창의 Ref 객체 전달
                                required
                            />
                            {nameError && (
                                <span className="input_error">{nameError}</span>)}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label for="userid"><span>&#42;</span>아이디</label>
                        </th>
                        <td>
                            <input type="text"
                                name="id"
                                minlength="4"
                                maxlength="10"
                                id="id"
                                value={id}
                                onChange={handleidChange}
                                ref={idInputRef} // Ref 객체 연결
                                onKeyDown={(e) => handleKeyDown(e, passwordInputRef)} // 다음 입력창의 Ref 객체 전달
                                required />&nbsp;

                            <input className="inside_btn"
                                type="submit"
                                name="idDup"
                                id="idDup"
                                value="중복확인"
                                onClick={handleCheckDuplicate}
                            // ref={idDupCheck()} // Ref 객체 연결
                            // onKeyDown={(e) => handleKeyDown(e, password2InputRef)}
                            />
                            {idError && (
                                <span className="input_error">{idError}</span>)}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label for="pw"><span>&#42;</span>비밀번호</label>
                        </th>
                        <td>
                            <input type="password"
                                name="password"
                                minlength="4"
                                maxlength="10"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                ref={passwordInputRef} // Ref 객체 연결
                                onKeyDown={(e) => handleKeyDown(e, password2InputRef)} // 다음 입력창의 Ref 객체 전달
                                required
                            />
                            {passwordError && (
                                <span className="input_error">{passwordError}</span>)}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label for="passwordcheck"><span>&#42;</span>비밀번호 확인</label>
                        </th>
                        <td>
                            <input type="password"
                                name="password2"
                                maxlength="10"
                                id="password2"
                                value={password2}
                                onChange={handlePassword2Change}
                                ref={password2InputRef} // Ref 객체 연결
                                // onKeyDown={(e) => handleKeyDown(e, zipcodeInputRef)} // 다음 입력창의 Ref 객체 전달
                                required />
                            {password2Error && (
                                <span className="input_error">{password2Error}</span>)}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label for="zipcode"><span>&#42;</span>주소</label>
                        </th>
                        <td>
                            <div className="input_zipcode">
                                <input type="text"
                                    name="zipcode"
                                    id="zipcode"
                                    placeholder="우편번호"
                                    value={enroll_company.zipcode}
                                    // onChange={handleZipcodeChange}
                                    // ref={zipcodeInputRef} // Ref 객체 연결
                                    // onKeyDown={(e) => handleKeyDown(e, addressInputRef)}
                                    readonly />&nbsp;
                                <button className="address_search"><Post company={enroll_company} setcompany={setEnroll_company}></Post></button>
                                {/* {zipcodeError && (
                                    <span className="input_error">{zipcodeError}</span>)} */}
                            </div>
                            <div>
                                <input
                                    className="user_enroll_text"
                                    placeholder="주소"
                                    type="text"
                                    required={true}
                                    name="address"
                                    id="address"
                                    onChange={handleInput}
                                    value={enroll_company.address}
                                    onKeyDown={(e) => handleKeyDown(e, addressdetailInputRef)} />&nbsp;
                                <input type="text"
                                    name="addressdetail"
                                    id="addressdetail"
                                    value={addressdetail}
                                    onChange={handleAddressdetailChange}
                                    placeholder="상세주소"
                                    ref={addressdetailInputRef} // Ref 객체 연결
                                    onKeyDown={(e) => handleKeyDown(e, phone2InputRef)}
                                    readonly />
                                {/* {addressError && (
                                    <span className="input_error">{addressError}</span>)} */}
                                {addressdetailError && (
                                    <span className="input_error">{addressdetailError}</span>)}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label for="cellphone"><span>&#42;</span>휴대폰 번호</label>
                        </th>
                        <td>
                            <div>
                                <input type="tel"
                                    name="phone1"
                                    value="010"
                                    size="1"
                                    id="phone1"
                                    readonly />
                                &nbsp;&ndash;&nbsp;
                                <input type="tel"
                                    name="phone2"
                                    size="1"
                                    id="phone2"
                                    value={phone2}
                                    onChange={handlePhone2Change}
                                    ref={phone2InputRef} // Ref 객체 연결
                                    onKeyDown={(e) => handleKeyDown(e, phone3InputRef)}
                                    required />
                                &nbsp;&ndash;&nbsp;
                                <input type="tel"
                                    name="phone3"
                                    size="1"
                                    id="phone3"
                                    value={phone3}
                                    onChange={handlePhone3Change}
                                    ref={phone3InputRef} // Ref 객체 연결
                                    onKeyDown={(e) => handleKeyDown(e, email1InputRef)}
                                    required />
                            </div>
                            {phone2Error && (
                                <span className="input_error">{phone2Error}</span>)}
                            {phone3Error && (
                                <span className="input_error">{phone3Error}</span>)}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label for="email1"><span>&#42;</span>이메일</label>
                        </th>
                        <td>
                            <input type="text"
                                name="email1"
                                id="email1"
                                value={email1}
                                onChange={handleEmail1Change}
                                ref={email1InputRef} // Ref 객체 연결
                                onKeyDown={(e) => handleKeyDown(e, email2InputRef)} />
                            &nbsp;@&nbsp;
                            <input type="text"
                                name="email2"
                                id="email2"
                                value={email2}
                                onChange={handleEmail2Change}
                                placeholder="직접 입력"
                                ref={email2InputRef} />
                            {email1Error && (
                                <span className="input_error">{email1Error}</span>)}
                            {email2Error && (
                                <span className="input_error">{email2Error}</span>)}
                        </td>
                    </tr>
                    <tr>
                        <th><span>&#42;</span>마케팅 수신 동의 ( SMS )</th>
                        <td>
                            <div className="agree_check">
                                <input type="radio" name="marketing_sms" id="marketing_sms" value="y" />
                                <label htmlFor="marketing_sms">SMS</label>
                                <input type="radio" name="marketing_sms" id="marketing_smsNone" value="n" checked />
                                <label htmlFor="marketing_smsNone">수신받지않음</label>
                                <span>마케팅 수신에 동의하실 경우, Ojoa의 소식을 SMS 로 받아보실 수 있습니다.</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th><span>&#42;</span>마케팅 수신 동의 ( 이메일 )</th>
                        <td>
                            <div className="agree_check">
                                <input type="radio" name="marketing_email" id="marketing_email" value="y" />
                                <label htmlFor="marketing_email">이메일</label>
                                <input type="radio" name="marketing_email" id="marketing_emailNone" value="n" checked />
                                <label htmlFor="marketing_emailNone">수신받지않음</label>
                                <span>마케팅 수신에 동의하실 경우, Ojoa의 소식을 이메일 로 받아보실 수 있습니다.</span>
                            </div>
                        </td>
                    </tr>
                </table>
                <div className="input_warn">* 는 필수 입력사항입니다.</div>

                <div className="Agree" />
                <div className="agree_total">
                    <h3 className="agree_mini">&bull; 개인정보처리방침 (필수)</h3>
                    <div className="agree_text">
                        <h4>개인정보의 수집 및 이용목적</h4>
                        <h4>제 1 장 총칙</h4>
                        <h4>제 1 조 목적</h4>
                        "본 약관은 통계청이 운영하는 나라통계시스템 운영홈페이지(이하 "당 사이트")에서 제공하는 모든 서비스(이하 "서비스")의 이용조건 및 절차, 이용자와 당 사이트의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다. 제 2 조 (약관의 효력과 변경) ① 당 사이트는 이용자가 본 약관 내용에 동의하는 것을 조건으로 이용자에게 서비스를 제공하며, 당 사이트의 서비스 제공 행위 및 이용자의 서비스 사용 행위에는 본 약관을 우선적으로 적용하겠습니다. ② 당 사이트는 본 약관을 사전 고지 없이 변경할 수 있으며, 변경된 약관은 당 사이트 내에 공지함으로써 이용자가 직접 확인하도록 할 것입니다. 이용자가 변경된 약관에 동의하지 아니하는 경우 본인의 회원등록을 취소(회원탈퇴)할 수 있으며, 계속 사용할 경우에는 약관 변경에 대한 암묵적 동의로 간주됩니다. 변경된 약관은 공지와 동시에 그 효력을 발휘합니다."
                        <h4>제 3 조 (약관 외 준칙)</h4>
                        "본 약관에 명시되지 않은 사항은 전기통신기본법, 전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 및 기타 관련 법령의 규정에 의합니다. 제 4 조 (용어의 정의) ① 본 약관에서 사용하는 용어의 정의는 다음과 같습니다. 1. 이용자 : 본 약관에 따라 당 사이트가 제공하는 서비스를 받는 자 2. 가 입 : 당 사이트가 제공하는 신청서 양식에 해당 정보를 기입하고, 본 약관에 동의하여 서비스 이용계약을 완료시키는 행위 3. 회 원 : 당 사이트에 필요한 개인 정보를 제공하여 회원 등록을 한 자로서, 당 사이트의 정보 및 서비스를 이용할 수 있는 자 4. 아이디 : 이용고객의 식별과 이용자가 서비스 이용을 위하여 이용자가 정한 문자와 숫자의 조합 5. 비밀번호 : 아이디에 대한 본인 여부를 확인하기 위하여 사용되는 문자, 숫자, 특수문자 등의 조합 6. 탈퇴 : 서비스 또는 회원이 이용계약을 종료하는 행위 ② 본 약관에서 정의하지 않은 용어는 개별서비스에 대한 별도 약관 및 이용규정에서 정의합니다."
                        <h4>제 2 장 서비스 제공 및 이용</h4>
                        "제 5 조 (이용 계약의 성립) ① 이용계약은 이용자가 온라인으로 당 사이트에서 제공하는 이용계약 신청서를 작성하여 가입을 완료하는 것으로 성립됩니다. ② 당 사이트는 다음 각 호에 해당하는 경우에 가입을 취소할 수 있습니다. 1. 다른 사람의 명의를 사용하여 신청하였을 때 2. 이용 계약 신청서의 내용을 허위로 기재하였거나 신청하였을 때 3. 사회의 안녕 질서 혹은 미풍양속을 저해할 목적으로 신청하였을 때 4. 다른 사람의 당 사이트 서비스 이용을 방해하거나 그 정보를 도용하는 등의 행위를 하였을 때 5. 당 사이트를 이용하여 법령과 본 약관이 금지하는 행위를 하는 경우 6. 기타 당 사이트가 정한 이용신청요건이 미비 되었을 때 ③ 당 사이트는 다음 각 호에 해당하는 경우 그 사유가 소멸될 때까지 이용계약 성립을 유보할 수 있습니다. 1. 서비스 관련 제반 용량이 부족한 경우 2. 기술상 장애 사유가 있는 경우 ④ 당 사이트가 제공하는 서비스는 자체 개발하거나 다른 기관과의 협의 등을 통해 제공하는 일체의 서비스를 말하는 것이며, 그 내용을 변경할 경우에는 이용자에게 공지한 후 변경하여 제공할 수 있습니다."
                        <h4>제 6 조 (회원정보 사용에 대한 동의)</h4>
                        "① 회원의 개인정보는 공공기관의 개인정보보호법에 의해 보호되며 당 사이트의 개인정보처리방침이 적용됩니다. ② 당 사이트의 회원 정보는 다음과 같이 수집, 사용, 관리, 보호됩니다. 1. 개인정보의 수집 : 당 사이트는 회원 가입시 회원이 제공하는 정보를 수집합니다. 2. 개인정보의 사용 : 당 사이트는 서비스 제공과 관련해서 수집된 회원정보를 본인의 승낙 없이 제3자에게 누설, 배포하지 않습니다. 단, 전기통신기본법 등 법률의 규정에 의해 국가기관의 요구가 있는 경우, 범죄에 대한 수사상의 목적이 있거나 방송통신심의위원회의 요청이 있는 경우 또는 기타 관계법령에서 정한 절차에 따른 요청이 있는 경우, 회원이 당 사이트에 제공한 개인정보를 스스로 공개한 경우에는 그러하지 않습니다. 3. 개인정보의 관리 : 회원은 개인정보의 보호 및 관리를 위하여 서비스의 개인정보관리에서 수시로 회원의 개인정보를 수정/삭제할 수 있습니다. 수신되는 정보 중 불필요하다고 생각되는 부분도 변경/조정할 수 있습니다. 개인정보의 이용기간은 이용자가 가입을 완료하고 개인정보관리에서 회원가입을 탈퇴하는 시점이며 보호기간도 동일합니다. 4. 개인정보의 보호 : 회원의 개인정보는 오직 회원만이 열람/수정/삭제 할 수 있으며, 이는 전적으로 회원의 아이디와 비밀번호에 의해 관리되고 있습니다. 따라서 타인에게 본인의 아이디와 비밀번호를 알려주어서는 아니 되며, 작업 종료 시에는 반드시 로그아웃 해주시고, 웹 브라우저의 창을 닫아주시기 바랍니다(이는 타인과 컴퓨터를 공유하는 인터넷 카페나 도서관 같은 공공장소에서 컴퓨터를 사용하는 경우에 회원의 정보의 보호를 위하여 필요한 사항입니다.)"
                        <h4>제 7 조 (회원의 정보 보안)</h4>
                        "① 가입 신청자가 당 사이트 서비스 가입 절차를 완료하는 순간부터 회원은 입력한 정보의 비밀을 유지할 책임이 있으며, 회원의 아이디와 비밀번호를 타인에게 제공하여 발생하는 모든 결과에 대한 책임은 회원 본인에게 있습니다. ② 아이디와 비밀번호에 관한 모든 관리의 책임은 회원에게 있으며, 회원의 아이디나 비밀번호가 부정하게 사용되었다는 사실을 발견한 경우에는 즉시 당 사이트에 신고하여야 합니다. 신고를 하지 않음으로 인한 모든 책임은 회원 본인에게 있습니다. ③ 회원은 당 사이트 서비스의 사용 종료 시마다 정확히 접속을 종료하도록 해야 하며, 정확히 종료하지 아니함으로써 제3자가 이용자 또는 회원에 관한 정보를 이용하게 되는 등의 결과로 인해 발생하는 손해 및 손실에 대하여 당 사이트는 책임을 부담하지 아니합니다."
                        <h4>제 8 조 (서비스 이용시간)</h4>
                        "① 서비스 이용시간은 당 사이트의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간을 원칙으로 합니다. ② 제1항의 이용시간은 정기점검 등의 필요로 인하여 당 사이트가 정한 날 또는 시간 및 예기치 않은 사건사고로 인한 시간은 예외로 합니다. 제 9 조 (서비스의 중지 및 정보의 저장과 사용) ① 당 사이트 서비스에 보관되거나 전송된 메시지 및 기타 통신 메시지 등의 내용이 국가의 비상사태, 정전, 당 사이트의 관리 범위 외의 서비스 설비 장애 및 기타 불가항력에 의하여 보관되지 못하였거나 삭제된 경우, 전송되지 못한 경우 및 기타 통신 데이터의 손실이 있을 경우에 당 사이트는 관련 책임을 부담하지 아니합니다. ② 당 사이트가 정상적인 서비스 제공의 어려움으로 인하여 일시적으로 서비스를 중지하여야 할 경우에는 서비스 중지 1주일 전의 고지 후 서비스를 중지할 수 있으며, 이 기간 동안 이용자가 고지내용을 인지하지 못한 데 대하여 당 사이트는 책임을 부담하지 아니합니다. 부득이한 사정이 있을 경우 위 사전 고지기간은 감축되거나 생략될 수 있습니다. 또한 위 서비스 중지에 의하여 본 서비스에 보관되거나 전송된 메시지 및 기타 통신 메시지 등의 내용이 보관되지 못하였거나 삭제․전송되지 못한 경우 및 기타 통신 데이터의 손실이 있을 경우에 대하여도 당 사이트는 책임을 부담하지 아니합니다. ③ 당 사이트의 사정으로 서비스를 영구적으로 중단하여야 할 경우 제2항에 의거합니다. 다만, 이 경우 사전 고지기간은 1개월로 합니다. ④ 당 사이트는 사전 고지 후 서비스를 일시적으로 수정, 변경 및 중단할 수 있으며, 이에 대하여 이용자 또는 제3자에게 어떠한 책임도 부담하지 아니합니다. ⑤ 당 사이트는 이용자가 본 약관의 내용에 위배되는 행동을 한 경우, 임의로 서비스 사용을 제한 및 중지할 수 있습니다. 이 경우 당 사이트는 위 이용자의 접속을 금지할 수 있습니다. ⑥ 장기간 휴면 회원인 경우 안내 메일 또는 공지사항 발표 후 1주일간의 통지 기간을 거쳐 서비스 사용을 중지할 수 있습니다. 제 10 조 (서비스의 변경 및 해지) ① 당 사이트는 이용자가 서비스를 이용하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않으며, 회원이 본 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 관하여는 책임을 지지 않습니다. ② 당 사이트는 서비스 이용과 관련하여 가입자에게 발생한 손해 중 가입자의 고의, 과실에 의한 손해에 대하여 책임을 부담하지 아니합니다. ③ 회원을 탈퇴하고자 하는 경우에는 당 사이트 로그인 후 회원탈퇴 절차에 따라 해지할 수 있습니다. 제 11 조 (정보 제공 및 홍보물 게재) ① 당 사이트는 서비스를 운영함에 있어서 각종 정보를 서비스에 게재하는 방법 등으로 회원에게 제공할 수 있습니다. ② 당 사이트는 서비스에 적절하다고 판단되거나 활용 가능성 있는 홍보물을 게재할 수 있습니다. 제 12 조 (게시물의 저작권) ① 이용자가 게시한 게시물의 내용에 대한 권리는 이용자에게 있습니다. ② 당 사이트는 게시된 내용을 사전 통지 없이 편집, 이동할 수 있는 권리를 보유하며, 다음의 경우 사전 통지 없이 삭제할 수 있습니다. 1. 본 이용약관에 위배되거나 상용 또는 불법, 음란, 저속하다고 판단되는 게시물을 게시한 경우 2. 다른 이용자 또는 제 3자를 비방하거나 중상모략으로 명예를 손상시키는 내용인 경우 3. 공공질서 및 미풍양속에 위반되는 내용인 경우 4. 범죄적 행위에 결부된다고 인정되는 내용일 경우 5. 제3자의 저작권 등 기타 권리를 침해하는 내용인 경우 6. 기타 관계 법령에 위배되는 경우 ③ 이용자의 게시물이 타인의 저작권을 침해함으로써 발생하는 민․형사상의 책임은 전적으로 이용자가 부담하여야 합니다."
                    </div>
                    <div className="agree_check">
                        <input type="checkbox" id="check_1" required /><label for="check_1">개인정보 처리방침에 동의합니다.</label>
                    </div>
                    <h3 className="agree_mini">&bull; 이용약관 (필수)</h3>
                    <div className="agree_text">
                        <h4>제 1장 총직</h4>
                        <h4>제1조(목적)</h4>
                        "이 약관은 OO 회사(전자상거래 사업자)가 운영하는 OO 사이버 몰(이하 “몰”이라 한다)에서 제공하는 인터넷 관련 서비스(이하 “서비스”라 한다)를 이용함에 있어 사이버 몰과 이용자의 권리․의무 및 책임사항을 규정함을 목적으로 합니다. ※「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.」"
                        <h4>제2조(정의)</h4>
                        "① “몰”이란 OO 회사가 재화 또는 용역(이하 “재화 등”이라 함)을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다. ② “이용자”란 “몰”에 접속하여 이 약관에 따라 “몰”이 제공하는 서비스를 받는 회원 및 비회원을 말합니다. ③ ‘회원’이라 함은 “몰”에 회원등록을 한 자로서, 계속적으로 “몰”이 제공하는 서비스를 이용할 수 있는 자를 말합니다. ④ ‘비회원’이라 함은 회원에 가입하지 않고 “몰”이 제공하는 서비스를 이용하는 자를 말합니다."
                        <h4>제3조 (약관 등의 명시와 설명 및 개정)</h4>
                        "① “몰”은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호․모사전송번호․전자우편주소, 사업자등록번호, 통신판매업 신고번호, 개인정보관리책임자등을 이용자가 쉽게 알 수 있도록 00 사이버몰의 초기 서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다. ② “몰은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회․배송책임․환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다. ③ “몰”은 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」, 「전자문서 및 전자거래기본법」, 「전자금융거래법」, 「전자서명법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「방문판매 등에 관한 법률」, 「소비자기본법」 등 관련 법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다. ④ “몰”이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 "몰“은 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다. ⑤ “몰”이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정 전의 약관조항이 그대로 적용됩니다. 다만 이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제3항에 의한 개정약관의 공지기간 내에 “몰”에 송신하여 “몰”의 동의를 받은 경우에는 개정약관 조항이 적용됩니다. ⑥ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한 법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자 보호지침 및 관계법령 또는 상관례에 따릅니다."
                        <h4>제4조(서비스의 제공 및 변경)</h4>
                        "① “몰”은 다음과 같은 업무를 수행합니다. 1. 재화 또는 용역에 대한 정보 제공 및 구매계약의 체결 2. 구매계약이 체결된 재화 또는 용역의 배송 3. 기타 “몰”이 정하는 업무 ② “몰”은 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 또는 용역의 내용을 변경할 수 있습니다. 이 경우에는 변경된 재화 또는 용역의 내용 및 제공일자를 명시하여 현재의 재화 또는 용역의 내용을 게시한 곳에 즉시 공지합니다. ③ “몰”이 제공하기로 이용자와 계약을 체결한 서비스의 내용을 재화등의 품절 또는 기술적 사양의 변경 등의 사유로 변경할 경우에는 그 사유를 이용자에게 통지 가능한 주소로 즉시 통지합니다. ④ 전항의 경우 “몰”은 이로 인하여 이용자가 입은 손해를 배상합니다. 다만, “몰”이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다."
                        <h4>제5조(서비스의 중단)</h4>
                        "① “몰”은 컴퓨터 등 정보통신설비의 보수점검․교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다. ② “몰”은 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상합니다. 단, “몰”이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다. ③ 사업종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로 서비스를 제공할 수 없게 되는 경우에는 “몰”은 제8조에 정한 방법으로 이용자에게 통지하고 당초 “몰”에서 제시한 조건에 따라 소비자에게 보상합니다. 다만, “몰”이 보상기준 등을 고지하지 아니한 경우에는 이용자들의 마일리지 또는 적립금 등을 “몰”에서 통용되는 통화가치에 상응하는 현물 또는 현금으로 이용자에게 지급합니다."
                    </div>
                    <div className="agree_check">
                        <input type="checkbox" id="check_2" required /><label for="check_2">이용약관에 동의합니다.</label>
                    </div>
                    <h3 className="agree_mini">&bull; 고유식별정보 처리 (필수)</h3>
                    <div className="agree_text">
                        <h4>고유식별정보 처리 동의</h4>
                        "제1조(목적) 이 약관은 OO(이하 “회사”)가 제공하는 배송관련 서비스(이하 “서비스”)를 이용함에 있어 회사와 이용자 간의 권리·의무, 책임사항 및 절차 등을 규정함을 목적으로 합니다."
                        <h4>제2조(정의)</h4>
                        "이 약관에서 사용하는 용어의 정의는 다음과 같습니다. 1. “몰”은 회사가 이 약관에 의하여 서비스를 이용자에게 제공하기 위하여 정보통신설비와 정보통신망을 이용하여 서비스 등을 거래할 수 있도록 설정한 가상의 영업장을 의미하거나 “몰”을 운영하는 사업자를 의미합니다. 2. “이용자”라 함은 회사가 제공하는 서비스를 이용하는 자를 의미합니다. 3. “해외사업자”라 함은 대한민국 이외의 국적이거나 대한민국 이외의 국가에 사업자 등록, 법인, 영업소, 호스트서버 소재지 등을 가진 사업자를 의미합니다. 4. “배송대행”이라 함은 이용자가 해외사업자로부터 구매한 재화 등(이하 “운송물”)이 회사가 이용자에게 제공하는 고유의 배송대행지에 입고되면 회사가 국제 운송 및 수입통관을 거쳐 해당 운송물을 이용자가 지정한 국내 수령 장소까지 운송하는 서비스를 의미합니다. 5. “배송대행지”라 함은 이용자가 해외에서 운송물을 구매하고자 할 경우 현지의 운송물 수령 장소로 이용하는 회사 제공의 해외 주소지를 의미합니다. 6. “배송대행신청서”라 함은 배송대행 계약의 체결을 위하여 이용자가 운송물 및 국내 수령 장소 관련 정보 등을 기입하여 회사에 송신하는 문서를 의미합니다. 7. “검수”라 함은 이용자가 배송대행을 의뢰한 운송물의 누락, 하자, 파손 여부 등을 회사가 정한 기준에 따라 확인하는 서비스를 의미합니다."
                        <h4>제3조(서비스의 제공)</h4>
                        "회사는 다음과 같은 업무를 수행할 수 있습니다. 1. 서비스 등에 대한 정보제공 2. 이용자가 해외에서 구매한 운송물의 수령, 보관, 검수, 인도 3. 이용자가 해외에서 구매한 운송물에 대한 운송계약의 체결 4. 수입 및 통관 관련 업무 5. 반품, 교환, 환불 등 국제반송 관련 업무 6. 기타 회사가 정하는 업무"
                        <h4>제4조(서비스 이용 제한)</h4>
                        "① 회사는 이용자의 서비스 이용 요청이 다음 각 호의 어느 하나에 해당하는 경우 서비스 제공을 거절하거나, 이용자의 동의를 구하고(다만, 이용자에게 동의를 구할 수 없는 사정이 있는 경우에는 통지 후) 해당 운송물을 폐기하거나 이용자의 비용 부담으로 해외사업자에게 반송할 수 있습니다. 1. 신청내용에 허위, 기재누락, 오기가 있는 경우 2. 이용자가 요청한 서비스의 제공이 회사의 경영상 또는 기술상의 이유로 현저히 곤란한 경우 3. 이용자가 불법 또는 부당한 목적을 위해 서비스를 이용하는 것으로 판단되는 경우 4. 운송물이 동물, 금·은괴, 화폐, 의약품, 무기류, 인체의 일부, 포르노그래피, 정밀금속, 석재류, 냉장보관물품, 냉동 또는 냉장을 요하는 물품 및 폭발물, 가연성 위험물 등인 경우 5. 운송물이 통과국을 포함한 수출입국의 법령에 의하여 수출입이 금지되는 물품인 경우 6. 운송물이 운송 사업자의 운송 약관상 운송이 금지된 물품인 경우 ② 전항에 따라 서비스 제공을 거절하는 경우, 회사는 이용자에게 거절의 사유 및 근거를 통지하여야 합니다. ③ 이용자가 제1항 각 호에 해당하는 서비스 이용 요청을 하였음에도 불구하고 배송대행신청서에 허위 정보를 기재하여 회사가 과태료, 벌금 등의 손해를 입은 경우, 이용자는 회사의 손해를 배상하여야 합니다."
                        <h4>제5조(배송대행신청서)</h4>
                        "① 이용자는 배송대행 계약을 체결하는 때에 다음 각 호의 사항을 기재한 배송대행신청서를 작성하여야 합니다. 1. 운송물 수령을 위한 배송대행지 2. 운송물을 구매한 해외 구매처(매장 내지 해외 전자상거래 사이트 등)에 관한 정보 3. 해당 해외 전자상거래 사이트에서 발행한 주문번호와 배송추적번호 4. 상품명, 브랜드, 해외사업자, 품목, 구매가격, 수량, 색상, 사이즈 5. 해외 세금, 해외 배송비, 할인금액 6. 재포장, 추가포장 관련 선택사항, 운송물의 개봉 및 검수에 관한 선택사항 7. 운송물의 국내 수령 장소, 이름(또는 상호) 및 연락처 8. 개인통관고유부호 9. 기타 배송대행에 필요한 사항 ② 회사는 배송대행계약을 체결하는 때에 이용자에게 다음 각 호의 사항을 설명하여야 합니다. 1. 이용자가 배송대행신청서에 기재한 운송물의 가액이 채무불이행으로 인한 회사의 손해배상책임을 정할 때 손해배상액 산정기준이 된다는 점 2. 운송물의 가액에 따라 할증요금 또는 보험 등이 있는 경우 이에 따라 손해배상한도액에 차이가 있다는 점 3. 운송물 구매계약의 청약철회, 해지 또는 해제(이하 “청약철회 등”)는 이용자가 구매계약을 체결한 해외사업자에게 직접 해야 한다는 점"
                        <h4>제6조(계약의 성립)</h4>
                        "① 회사는 이용자의 배송대행신청이 있는 경우 이용자에게 수신확인통지를 하여야 합니다. 수신확인통지에는 배송대행신청 정보와 신청의 정정, 취소 등에 관한 정보 등을 포함하여야 합니다. ② 배송대행 계약은 이용자의 배송대행신청에 대하여 회사의 수신확인통지가 이용자에게 도달한 때에 성립됩니다. ③ 수신확인통지를 받은 이용자는 의사표시의 불일치 등이 있는 경우 지체 없이 회사에 배송대행신청 변경 또는 취소를 요청할 수 있으며, 회사는 지체 없이 그 요청에 따라 처리하여야 합니다. 다만, 이미 요금을 지급한 경우에는 제13조의 청약철회 등에 관한 규정에 따릅니다. ④ 배송대행 계약이 성립하고 이용자가 배송대행을 신청한 운송물이 회사의 배송대행지에 입고되면 회사는 계약에 따른 서비스의 제공을 개시합니다. 제7조(배송대행요금 청구와 보관료) ① 이용자는 회사의 배송대행지에 운송물이 도착하기 전까지 “몰”에 배송대행신청서를 송신해야 할 의무가 있습니다. ② 배송대행계약이 체결되고 해당 운송물이 회사의 배송대행지에 입고되면 회사는 이용자에게 배송대행요금의 지급을 청구하고 이용자는 지급 청구가 있은 날로부터 7일 이내에 해당 요금을 지급하여야 합니다. 추가 운송료가 발생할 시에는 회사는 이용자에게 사유와 금액을 통지해야 합니다. ③ 제2항에 따른 기일까지 배송대행요금이 지급되지 않을 경우 회사는 해당 운송물을 배송하지 않습니다. 이 경우 지급 요청 기간 경과 후부터 이용자가 요금을 지급한 날까지의 기간에 대하여 보관료가 추가로 부과됩니다. 회사는 추가 보관료 부과 사유 및 부과 기준을 사전에 홈페이지 등에 게시하고, 제2항에 따른 배송대행요금 지급청구 시에 이용자에게 구체적으로 명시해야 합니다."
                    </div>
                    <div className="agree_check">
                        <input type="checkbox" id="check_3" required /><label for="check_3">고유식별정보 처리에 동의합니다.</label>
                    </div>
                    <div className="join_btn">
                        <button className="out_btn3" type="submit" name="finish" value="회원가입 완료" >가입완료</button>
                    </div>
                </div>

            </form>

        </div>

    );

};

export default Join;