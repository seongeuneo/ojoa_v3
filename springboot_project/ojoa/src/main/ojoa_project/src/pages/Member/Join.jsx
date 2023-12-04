import './Join.css';
import { Link } from 'react-router-dom';
import React, { useState, useRef } from 'react';
//import { ownerDocument } from '@mui/material';

const Join = () => {

    // 엔터키 누르면 아래로
    const handleKeyDown = (event, nextInputRef) => {
        if (event.key === "Enter") {
            event.preventDefault(); // 기본 엔터키 동작 방지
            nextInputRef.current.focus(); // 다음 입력 필드로 포커스 이동
        }
    };

    // 주소 관련 상태
    const [address, setAddress] = useState("");
    const [addressError, setAddressError] = useState("");
    const [addressdetail, setAddressdetail] = useState("");
    const [addressdetailError, setAddressdetailError] = useState("");

    // 연락처 관련 상태
    const [phone2, setPhone2] = useState("");
    const [phone2Error, setPhone2Error] = useState("");
    const [phone3, setPhone3] = useState("");
    const [phone3Error, setPhone3Error] = useState("");

    // Ref 객체 추가
    const idInputRef = useRef(null); // 아이디 입력 필드의 Ref 객체
    // const idckbtnInputRef = useRef(null); // 아이디 중복확인 버튼의 Ref 객체
    const passwordInputRef = useRef(null);
    const password2InputRef = useRef(null);
    const zipcodeInputRef = useRef(null);
    const addressInputRef = useRef(null);
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
            setIdError("아이디는 4~10자 입니다.");
        } else if (!/^[a-zA-Z0-9]+$/.test(newId)) { // 영문과 숫자만 입력되었는지 확인하는 정규식
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
        const isValidPassword = newPassword.length >= 4 &&
            newPassword.length <= 10 &&
            /[!@#$%^&*()+\-=[\]{};':"\\|,.<>/?]+/.test(newPassword);

        if (!isValidPassword) {
            setPasswordError("비밀번호는 4~10자 이내이며, 최소 1개의 특수문자를 포함해야 합니다.");
        } else {
            setPasswordError("");
        }
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


    // 우편번호 확인
    const [zipcode, setZipcode] = useState("");
    const [zipcodeError, setZipcodeError] = useState("");
    const handleZipcodeChange = (event) => {
        const newZipcode = event.target.value;

        // 우편번호 입력값이 숫자와 "-"만으로 구성되어 있는지 확인
        if (!/^[0-9-]*$/.test(newZipcode)) {
            setZipcodeError("우편번호는 숫자와 기호 '-'만 가능합니다.");
        } else {
            // 숫자와 "-"만으로 구성된 경우에만 우편번호 변경 및 오류 초기화
            setZipcode(newZipcode);
            setZipcodeError("");
        }
    };

    // 주소 확인
    const handleAddressChange = (event) => {
        const newAddress = event.target.value;

        // 주소 입력값이 4글자 이상으로 구성되엉 있는지 확인
        if (newAddress.length < 0 || newAddress.length > 40) {
            setAddressError("주소는 4글자 이상 40글자 이하여야 합니다.");
        } else {
            setAddress(newAddress);
            setAddressError("");
        }
    };

    // 상세주소 확인
    const handleAddressdetailChange = (event) => {
        const newAddressdetail = event.target.value;

        // 상세주소 입력값이 2글자 이상으로 구성되엉 있는지 확인
        if (newAddressdetail.length < 0 || newAddressdetail.length > 20) {
            setAddressdetailError("상세주소는 2글자 이상이어야 합니다.");
        } else {
            setAddressdetail(newAddressdetail);
            setAddressdetailError("");
        }
    };

    // 연락처2 확인
    const handlePhone2Change = (event) => {
        const newPhone2 = event.target.value;

        // 연락처2 입력값이 숫자 4자리로 구성되어 있는지 확인
        if (!/^[0-9]{4}$/.test(newPhone2)) {
            setPhone2Error("연락처 중간번호는 숫자 4자리만 가능합니다.");
        } else {
            setPhone2(newPhone2);
            setPhone2Error("");
        }
    };

    // 연락처3 확인
    const handlePhone3Change = (event) => {
        const newPhone3 = event.target.value;

        // 연락처3 입력값이 숫자 4자리로 구성되어 있는지 확인
        if (!/^[0-9]{4}$/.test(newPhone3)) {
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

        // 이메일1 입력값이 알파벳과 숫자 만으로 구성되어 있는지 확인
        if (!/^[a-zA-Z0-9]*$/.test(newEmail1)) {
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

        // 이메일2 입력값이 최소 3글자 이상의 알파벳과 숫자, 그리고 점('.')으로만 구성되어 있는지 확인
        if (!/^[a-zA-Z0-9.]$/.test(newEmail2)) {
            setEmail2Error("이메일은 최소 3글자의 알파벳, 숫자, '.'으로만 입력 가능합니다.");
        } else {
            // 알파벳과 숫자, 그리고 점('.')으로만 구성된 경우에만 이메일2 변경 및 오류 초기화
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

            <form action="/member/join" name="personalJoin">
                <table className="personal_join">
                    <caption>
                        <h3>회원정보</h3>
                    </caption>

                    <tr>
                        <th>
                            <label for="name">이름</label>
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
                            <label for="userid">아이디</label>
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
                                name="overlap"
                                id="idDup"
                                value="중복확인"
                            // ref={idDupCheck()} // Ref 객체 연결
                            // onKeyDown={(e) => handleKeyDown(e, password2InputRef)}
                            />
                            {idError && (
                                <span className="input_error">{idError}</span>)}
                        </td>
                    </tr>

                    <tr>
                        <th>
                            <label for="pw">비밀번호</label>
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
                            <label for="passwordcheck">비밀번호 확인</label>
                        </th>
                        <td>
                            <input type="password"
                                name="password2"
                                maxlength="10"
                                id="password2"
                                value={password2}
                                onChange={handlePassword2Change}
                                ref={password2InputRef} // Ref 객체 연결
                                onKeyDown={(e) => handleKeyDown(e, zipcodeInputRef)} // 다음 입력창의 Ref 객체 전달
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
                                    //placeholder="우편번호입력"
                                    id="zipcode"
                                    value={zipcode}
                                    onChange={handleZipcodeChange}
                                    ref={zipcodeInputRef} // Ref 객체 연결
                                    onKeyDown={(e) => handleKeyDown(e, addressInputRef)}
                                    required />&nbsp;

                                <input
                                    className="inside_btn"
                                    type="submit"
                                    name="find_postcode"
                                    value="우편번호찾기"
                                // ref={postbtnInputRef}
                                />{zipcodeError && (
                                    <span className="input_error">{zipcodeError}</span>)}
                            </div>

                            <div>
                                <input type="text"
                                    name="address"
                                    id="address"
                                    value={address}
                                    onChange={handleAddressChange}
                                    ref={addressInputRef} // Ref 객체 연결
                                    onKeyDown={(e) => handleKeyDown(e, addressdetailInputRef)}
                                    required />&nbsp;

                                <input type="text"
                                    name="addressdetail"
                                    id="addressdetail"
                                    value={addressdetail}
                                    onChange={handleAddressdetailChange}
                                    placeholder="상세주소"
                                    ref={addressdetailInputRef} // Ref 객체 연결
                                    onKeyDown={(e) => handleKeyDown(e, phone2InputRef)}
                                    required />
                                {addressError && (
                                    <span className="input_error">{addressError}</span>)}
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
                                <label htmlFor="agrmarketing_emailee_1">이메일</label>
                                <input type="radio" name="marketing_email" id="marketing_emailNone" value="n" checked />
                                <label for="marketing_emailNone">수신받지않음</label>
                                <span>마케팅 수신에 동의하실 경우, Ojoa의 소식을 이메일 로 받아보실 수 있습니다.</span>
                            </div>
                        </td>
                    </tr>

                </table>

                <div className="input_warn">* 는 필수 입력사항입니다.</div>



                <div className="Agree" />
                <div className="agree_total">
                    {/* <!-- <h3 className="gree_mini">약관의 동의</h3> --> */}
                    {/* <!----------------------약관사항 넣기----------------------> */}
                    <h3 className="agree_mini">&bull; 개인정보처리방침 (필수)</h3>
                    <div className="agree_text">
                        <h4>개인정보의 수집 및 이용목적</h4>

                        <h4>제 1 장 총칙</h4>

                        <h4>제 1 조 (목적)</h4>

                    </div>
                    <div className="agree_check">
                        <input type="checkbox" id="check_1" required /><label for="check_1">개인정보 처리방침에 동의합니다.</label>
                    </div>

                    <h3 className="agree_mini">&bull; 이용약관 (필수)</h3>

                    <div className="agree_text">
                        <h4>제 1장 총직</h4>


                    </div>
                    <div className="agree_check">
                        <input type="checkbox" id="check_2" required /><label for="check_2">이용약관에 동의합니다.</label>
                    </div>

                    <h3 className="agree_mini">&bull; 고유식별정보 처리 (필수)</h3>
                    <div className="agree_text">

                        <h4>고유식별정보 처리 동의</h4>
                        제1조(목적) 이 약관은 OO(이하 “회사”)가 제공하는 배송관련 서비스(이하 “서비스”)를 이용함에 있어 회사와 이용자 간의 권리·의무, 책임사항 및 절차 등을
                        규정함을 목적으로 합니다.


                        <h4>제6조(계약의 성립)</h4>
                        ① 회사는 이용자의 배송대행신청이 있는 경우 이용자에게 수신확인통지를 하여야 합니다. 수신확인통지에는 배송대행신청 정보와 신청의 정정, 취소 등에 관한 정보 등을
                        포함하여야 합니다.
                        `
                    </div>
                    <div className="agree_check">
                        <input type="checkbox" id="check_3" required /><label for="check_3">고유식별정보 처리에 동의합니다.</label>
                    </div>

                    <div className="join_btn">
                        <input className="out_btn3" type="submit" name="finish" value="회원가입 완료" />
                    </div>
                </div>

            </form>

        </div>

    );

};

export default Join;