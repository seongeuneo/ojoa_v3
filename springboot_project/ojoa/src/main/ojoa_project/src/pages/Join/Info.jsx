import './Info.css';
import { Link } from 'react-router-dom';
import React, { useState, useRef } from 'react';

const Info = () => {

    // 엔터키 누르면 아래로
    const handleKeyDown = (event, nextInputRef) => {
        if (event.key === "Enter") {
            event.preventDefault(); // 기본 엔터키 동작 방지
            nextInputRef.current.focus(); // 다음 입력 필드로 포커스 이동
        }
    };

    // Ref 객체 추가
    const idInputRef = useRef(null); // 아이디 입력 필드의 Ref 객체
    const idckbtnInputRef = useRef(null); // 아이디 중복확인 버튼의 Ref 객체
    const passwordInputRef = useRef(null);
    const pwdckInputRef = useRef(null);
    const postcodeInputRef = useRef(null);
    const postbtnInputRef = useRef(null);
    const addressInputRef = useRef(null);
    const addressdetailInputRef = useRef(null);
    const cell1InputRef = useRef(null);
    const cell2InputRef = useRef(null);
    const emailidInputRef = useRef(null);
    const emailInputRef = useRef(null);



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

        // 아이디 입력시 5자~15 입력했는지
        if (newId.length < 5 || newId.length > 15) {
            setIdError("아이디는 5~15자 이내이여야 합니다.");
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
        const isValidPassword = newPassword.length >= 5 &&
            newPassword.length <= 15 &&
            /[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(newPassword);

        if (!isValidPassword) {
            setPasswordError("비밀번호는 5~15자 이내이며, 최소 1개의 특수문자를 포함해야 합니다.");
        } else {
            setPasswordError("");
        }
    };

    // 비밀번호 확인
    const [pwdck, setPwdck] = useState("");
    const [pwdckError, setPwdckError] = useState(""); // 비밀번호 확인 오류 메세지

    const handlePwdckChange = (event) => {
        const newPwdck = event.target.value;
        setPwdck(newPwdck);

        // 비밀번호 확인 입력값 비교
        if (newPwdck !== password) {
            setPwdckError("비밀번호가 일치하지 않습니다.");
        } else {
            setPwdckError("");
        }
    };


    // 우편번호 확인
    const [postcode, setPostcode] = useState("");
    const [postcodeError, setPostcodeError] = useState("");
    const handlePostcodeChange = (event) => {
        const newPostcode = event.target.value;

        // 우편번호 입력값이 숫자와 "-"만으로 구성되어 있는지 확인
        if (!/^[0-9-]*$/.test(newPostcode)) {
            setPostcodeError("우편번호는 숫자와 기호 '-'만 가능합니다.");
        }else {
            // 숫자와 "-"만으로 구성된 경우에만 우편번호 변경 및 오류 초기화
            setPostcode(newPostcode);
            setPostcodeError("");
        }
    };

    

    // 취소 버튼 클릭 시 -> 입력된거 초기화
    const handleCancelClick = () => {
        setName("");
        setId("");
        setPassword("");
        setPwdck("");

    };


    return (
        <div className="Info">
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

            <form action="/login/info/agree" name="personalInfo">
                <table className="personal_info">
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
                                maxlength="7"
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
                                minlength="5"
                                maxlength="15"
                                id="userid"
                                value={id}
                                onChange={handleidChange}
                                ref={idInputRef} // Ref 객체 연결
                                onKeyDown={(e) => handleKeyDown(e, idckbtnInputRef)} // 다음 입력창의 Ref 객체 전달
                                required />
                            <input className="inside_btn"
                                type="submit"
                                name="overlap"
                                value="중복확인"
                                ref={idckbtnInputRef} // Ref 객체 연결
                                onKeyDown={(e) => handleKeyDown(e, passwordInputRef)}
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
                                name="pwd"
                                minlength="5"
                                maxlength="15"
                                id="pw"
                                value={password}
                                onChange={handlePasswordChange}
                                ref={passwordInputRef} // Ref 객체 연결
                                onKeyDown={(e) => handleKeyDown(e, pwdckInputRef)} // 다음 입력창의 Ref 객체 전달
                                required
                            />
                            {passwordError && (
                                <span className="input_error">{passwordError}</span>)}
                        </td>
                    </tr>

                    <tr>
                        <th>
                            <label for="pwdcheck"><span>&#42;</span>비밀번호 확인</label>
                        </th>
                        <td>
                            <input type="password"
                                name="pwdcheck"
                                maxlength="15"
                                id="pwdcheck"
                                value={pwdck}
                                onChange={handlePwdckChange}
                                ref={pwdckInputRef} // Ref 객체 연결
                                onKeyDown={(e) => handleKeyDown(e, postcodeInputRef)} // 다음 입력창의 Ref 객체 전달
                                required />
                            {pwdckError && (
                                <span className="input_error">{pwdckError}</span>)}
                        </td>
                    </tr>

                    <tr>
                        <th>
                            <label for="address"><span>&#42;</span>주소</label>
                        </th>
                        <td>
                            <div className="input_address">
                                <input type="text"
                                    name="post_code"
                                    maxlength="7"
                                    placeholder="우편번호입력"
                                    id="address"
                                    value={postcode}
                                    onChange={handlePostcodeChange}
                                    ref={postcodeInputRef} // Ref 객체 연결
                                    onKeyDown={(e) => handleKeyDown(e, postbtnInputRef)}
                                    required/>

                                <form action="https://www.epost.kr/search.RetrieveIntegrationNewZipCdList.comm"
                                    target="_blank">
                                
                                    <input
                                        className="inside_btn"
                                        type="submit"
                                        name="find_postcode"
                                        value="우편번호찾기"
                                        ref={postbtnInputRef}
                                        onKeyDown={(e) => handleKeyDown(e, addressInputRef)}/>
                                        {postcodeError && (
                                            <span className="input_error">{postcodeError}</span>
                                        )}
                                    
                                    
                                </form>
                            </div>
                            <div>
                                <input type="text"
                                    name="address"
                                    // value={address}
                                    ref={addressInputRef} // Ref 객체 연결
                                    onKeyDown={(e) => handleKeyDown(e, addressdetailInputRef)}
                                    required />
                                <input type="text"
                                    name="address_detail"
                                    placeholder="상세주소"
                                    ref={addressdetailInputRef} // Ref 객체 연결
                                    onKeyDown={(e) => handleKeyDown(e, cell1InputRef)} />
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
                                    name="first_phone_number"
                                    value="010"
                                    size="1"
                                    readonly />
                                &ndash;

                                <input type="tel"
                                    name="second_phone_number"
                                    minlength="3"
                                    maxlength="4"
                                    size="1"
                                    id="cellphone"
                                    ref={cell1InputRef} // Ref 객체 연결
                                    onKeyDown={(e) => handleKeyDown(e, cell2InputRef)}
                                    required />
                                &ndash;

                                <input type="tel"
                                    name="last_phone_number"
                                    minlength="4"
                                    maxlength="4"
                                    size="1"
                                    ref={cell2InputRef} // Ref 객체 연결
                                    onKeyDown={(e) => handleKeyDown(e, emailidInputRef)}
                                    required />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <label for="emailid">이메일</label>
                        </th>
                        <td>
                            <input type="text"
                                name="emailid"
                                id="emailid"
                                ref={emailidInputRef} // Ref 객체 연결
                                onKeyDown={(e) => handleKeyDown(e, emailInputRef)} />
                            @
                            <input type="text"
                                name="mail"
                                placeholder="직접 입력"
                                ref={emailInputRef} />
                            <select name="email_domain">
                                <option value="self">선택</option>
                                <option value="naver">naver.com</option>
                                <option value="daum">hanmail.net</option>
                                <option value="gmail">gmail.com</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <th>마케팅 수신 동의</th>
                        <td>
                            <div className="agree_check">
                                <input type="radio" name="agree" id="agree_1" />
                                <label for="agree_1">이메일</label>
                                <input type="radio" name="agree" id="agree_2" />
                                <label for="agree_2">SMS</label>
                                <input type="radio" name="agree" id="agree_3" checked /><label for="agree_3">수신받지않음</label>
                                <span>마케팅 수신에 동의하실 경우, Ojoa의 소식을 빠르게 받아보실 수 있습니다.</span>
                            </div>
                        </td>
                    </tr>

                </table>

                <div className="input_warn">* 는 필수 입력사항입니다.</div>


                <div className="join_btn">
                    <input className="out_btn2" type="reset" name="cancel" value="취소하기" onClick={handleCancelClick} />
                    <Link to="/login/info/agree">
                        <input className="out_btn3" type="submit" name="finish" value="작성완료" />
                    </Link>
                </div>
            </form>

        </div>

    );

};

export default Info;