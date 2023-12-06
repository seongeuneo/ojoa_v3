import '../Member/Login.css';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const [loggedInUsername, setLoggedInUsername] = useState('');

    useEffect(() => {
        // 세션 스토리지에서 유저 이름을 가져옴
        const storedUsername = sessionStorage.getItem('username');
        if (storedUsername) {
            setLoggedInUsername(storedUsername);
        }
    }, []);

    const handleLogin = async () => {
        const loginData = {
            id: id,
            password: password
        };

        console.log('로그인 데이터:', loginData); // 로그인 데이터 콘솔 출력

        try {
            const response = await axios.post("http://localhost:8080/member/rlogin", loginData);
            if (response.status === 200) {
                if (response.data.includes('성공')) {
                    setMessage('로그인 성공');
                    // 로그인 성공 시 유저 이름 세션 스토리지에 저장
                    const loggedInUsername = response.data.username; // 예시: response.data.username
                    sessionStorage.setItem('username', loggedInUsername);
                    setLoggedInUsername(loggedInUsername);
                    // 로그인이 성공했을 때 원하는 작업 수행
                } else {
                    // 실패 메시지를 추출하여 표시
                    const errorMessage = extractErrorMessage(response.data);
                    setMessage('로그인 실패: ' + errorMessage);
                }
            } else {
                setMessage('서버 오류');
            }
        } catch (error) {
            if (error.response) {
                setMessage('로그인 실패: ' + error.response.data);
            } else {
                setMessage('로그인 중 에러 발생');
            }
        }

        // 실패 메시지 추출 함수
        function extractErrorMessage(htmlResponse) {
            // HTML 응답에서 실패 메시지를 추출하는 로직 작성
            // 예를 들어, 특정 태그 내의 텍스트 또는 정규표현식을 사용하여 메시지 추출
            // 실패 메시지를 가공하여 반환
        }
    };


    return (
        <div>
            {/* {findIdModalVisible && <FindIdModal setModalVisible={setFindIdModalVisible} />}
            {findPasswordModalVisible && <FindPasswordModal setModalVisible={setFindPasswordModalVisible} />}

            <script type="text/javascript" src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js" charset="utf-8"></script>
            {/* 로그인 성공 시 유저 이름 표시 */}
            {loggedInUsername && <p>로그인된 유저: {loggedInUsername}</p>}

            <div className="login_path">
                <span>현재 위치</span>
                <ol>
                    <li><Link to="/">홈</Link></li>
                    <li title="현재 위치"> &gt; Login</li>
                </ol>
            </div>
            <div className="login_title">
                <h2>LOGIN</h2>
                <div className="txt_01">회원만의 혜택을 경험하세요</div>
            </div>
            <main className="login_page">
                <div className="login_container">
                    <form>
                        <div className="login_content">
                            <div className="login">
                                <fieldset className="login_fieldset">
                                    <legend>회원로그인</legend>
                                    <label className="login_id">
                                        <span><img src="../images/account.png" alt="아이디" />
                                            {/* <Link to="https://nid.naver.com/nidlogin.login?mode=form&url=https://www.naver.com/"> </Link> */}
                                        </span>
                                        <input type="text"
                                            // name="userID"
                                            placeholder="아이디"
                                            minLength="3"
                                            value={id}
                                            // autoComplete="username"
                                            onChange={(e) => setId(e.target.value)} // 아이디 입력 값 업데이트
                                        />
                                    </label>
                                    <label className="login_password">
                                        <span><img src="../images/password.png" alt="비밀번호" /></span>
                                        <input type="password"
                                            // name="userPSW"
                                            placeholder="비밀번호"
                                            minLength="3"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력 값 업데이트
                                        // autocomplete="current-password"
                                        />
                                    </label>
                                    <div className="login_btn">
                                        <button type="button" onClick={handleLogin}>로그인</button>
                                        {message && <p>{message}</p>}
                                    </div>
                                    <div className="login_security">
                                        <img src="../images/ico_access.gif" alt="보안접속" />
                                        &quot;보안접속&quot;
                                    </div>
                                    <div className="login_forget">
                                        <label>
                                            <input type="checkbox" />아이디 기억하기
                                        </label>
                                    </div>
                                    <div className="login_find">
                                        <ul>
                                            <li>
                                                <button type="button" >아이디찾기</button>
                                            </li>
                                            <li>&nbsp;|&nbsp;</li>
                                            <li>
                                                <button type="button" >비밀번호찾기</button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="login_cboth"></div>


                                    {/* <div onClick={handleNaverClick}><img src="../images/btn_naver_login.gif" alt='네이버로그인' /></div>
                                    <div id="naverIdLogin" style={{ display: "none" }} /> */}

                                    <div className="login_sns">
                                        <p className="sns">
                                            {/* <Link to="https://nid.naver.com/nidlogin.login?mode=form&url=https://www.naver.com/" target="_blank"><img src="../images/btn_naver_login.gif" alt='네이버로그인' /></Link> */}
                                        </p>
                                        <p className="sns">
                                            {/* <Link to="http://www.facebook.com/" target="_blank"><img src="../images/btn_facebook_login.gif" alt='페이스북로그인' /></Link> */}
                                        </p>
                                        <p className="sns">
                                            {/* <Link to="https://accounts.kakao.com/login/?continue=https%3A%2F%2Faccounts.kakao.com%2Fweblogin%2Faccount%2Finfo#login" target="_blank"><img src="../images/btn_kakao_login.gif" alt='카카오톡로그인' /></Link> */}
                                        </p>
                                    </div>
                                    <div className="login_cboth"></div>
                                </fieldset>
                            </div>
                            <div className="login_join">
                                <div className="login_join_area">
                                    <div className="login_join_title">회원가입</div>
                                    &quot;아직 회원이 아니십니까?&quot;
                                    <br />
                                    &quot;회원을 위한 다양한 혜택이 준비되어 있습니다.&quot;
                                </div>
                                <div className="login_join_btn">
                                    <Link to="/member/join">회원가입</Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
            <hr className="layout" />
        </div>
    ); //return
} //Login

export default Login;