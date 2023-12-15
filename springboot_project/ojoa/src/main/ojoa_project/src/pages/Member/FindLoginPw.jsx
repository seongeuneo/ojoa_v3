import './FindLoginPw.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';

const FindLoginPw = (e) => {
    const navigate = useNavigate();
    e.preventDefault();

    const [id, setId] = useState('');
    const [user_name, setUser_name] = useState('');
    const [email1, setEmail1] = useState('');

    axios.post('/member/uFindPW', {
        id: id,
        name: user_name,
        email1: email1,
    }).then((response) => {
        console.log(response.data);

        if (response.data !== null) {
            alert(response.data);
            navigate('/Member/rLogin');
        } else {
            alert(response.data);
        }

    }).catch((err) => {
        alert(`[checkdata 서버연결 실패] => ${err.message}`);
    })



    //const navigate = useNavigate(); // useNavigate  훅 사용

    // Ref 객체 추가
    //const idInputRef = useRef(null); // 아이디 입력 필드의 Ref 객체
    //const passwordInputRef = useRef(null);

    // 엔터키 누르면 아래로
    // const handleEnterPress = (event) => {
    //     if (event.key === "Enter") {
    //         if (event.target.name === "name") {
    //             passwordInputRef.current.focus();
    //         } else if (event.target.name === "email1") {
    //             handleLogin();
    //         }
    //     }
    // };

    return (
        <div className="FindLoginId">
            <div className="path">
                <span>현재 위치</span>
                <ol>
                    <li><Link to="/">홈</Link></li>
                    <li title="현재 위치"> &gt; 비밀번호 찾기</li>
                </ol>
            </div>
            <div className="title">
                <h2>비밀번호 찾기</h2>
                <div className="txt_01">가입 당시 [ 아이디 / 이름 / 이메일 ] 을 입력하세요</div>
            </div>
            <main className="FindLoginId_page">
                <div className="FindLoginId_container">
                    <form>
                        <div className="FindLoginId_content">
                            <div className="FindLoginId">
                                <fieldset className="FindLoginId_fieldset">
                                    <table className="personal_FindLoginId">

                                        <tr>
                                            <th>
                                                <label for="name"><span>&#42;</span>아이디</label>
                                            </th>
                                            <td>
                                                <input type="text"
                                                    name="id"
                                                    id="id"
                                                    value={id}
                                                    onChange={(e) => setId(e.target.value)}
                                                    required
                                                />
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>
                                                <label for="name"><span>&#42;</span>이름</label>
                                            </th>
                                            <td>
                                                <input type="text"
                                                    name="name"
                                                    minlength="2"
                                                    id="name"
                                                    value={user_name}
                                                    onChange={(e) => setUser_name(e.target.value)}
                                                    required
                                                />
                                            </td>
                                        </tr>

                                        {/* <tr>
                                            <th>
                                                <label for="cellphone"><span>&#42;</span>휴대폰 번호</label>
                                            </th>
                                            <td>
                                                <div>
                                                    <input type="tel"
                                                        name="phone1"
                                                        value={phone1} // 휴대폰 번호 상태와 연결
                                                        size="1"
                                                        id="phone1"
                                                        onChange={(event) => setPhone1(event.target.value)}
                                                        readonly
                                                    />
                                                    &nbsp;&ndash;&nbsp;
                                                    <input type="tel"
                                                        name="phone2"
                                                        size="1"
                                                        id="phone2"
                                                        minlength="4"
                                                        maxlength="4"
                                                        value={phone2}
                                                        onChange={(event) => setPhone2(event.target.value)}
                                                        required
                                                    />
                                                    &nbsp;&ndash;&nbsp;
                                                    <input type="tel"
                                                        name="phone3"
                                                        size="1"
                                                        id="phone3"
                                                        minlength="4"
                                                        maxlength="4"
                                                        value={phone3}
                                                        onChange={(event) => setPhone3(event.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </td>
                                        </tr> */}

                                        <tr>
                                            <th>
                                                <label for="email1"><span>&#42;</span>이메일</label>
                                            </th>
                                            <td>
                                                <input type="text"
                                                    name="email1"
                                                    id="email1"
                                                    value={email1}
                                                    onChange={(e) => setEmail1(e.target.value)}
                                                />
                                                &nbsp;@&nbsp;
                                                <input type="text"
                                                    name="email2"
                                                    id="email2"
                                                    placeholder="도메인 입력"
                                                />
                                            </td>
                                        </tr>

                                    </table>

                                    <div className="IdPw_find">
                                        <ul>
                                            <li>
                                                <button type="button" ><Link to="/member/rlogin/findLoginId">아이디찾기</Link></button>
                                            </li>
                                            <li>&nbsp;|&nbsp;</li>
                                            <li>
                                                <button type="button" >비밀번호찾기</button>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* {error && <div className="error-message">{error}</div>} Display error message */}
                                    <div className="input_warn">* 는 필수 입력사항입니다.</div>

                                    <div className="FindLoginId_btn">
                                        <button className="out_btn3" type="submit" name="finish" value="비밀번호 찾기">비밀번호 찾기</button>
                                    </div>

                                </fieldset>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
            <hr className="layout" />
        </div>
    ); //return

} //FindLoginId

export default FindLoginPw;