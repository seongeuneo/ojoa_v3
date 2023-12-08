import '../Member/Login.css';
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate(); // useNavigate  훅 사용

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        const loginData = {
            id: id,
            password: password
        };

        console.log('로그인 데이터:', loginData); // 로그인 데이터 콘솔 출력 -> 성공시 페이지 이동으로 안보임

        try {
            const response = await axios.post("/member/rlogin", loginData);

            if (response.status === 200) {
                if (response.data) {
                    setMessage('로그인 성공');
                    // 응답으로 받은 데이터를 세션 스토리지에 저장
                    const loggedInUser = response.data;
                    sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                    // 기존 코드에서는 username만을 받아온 형태이므로, 필요한 정보를 서버 응답에 맞게 변경하여 처리
                    // 다음과 같이 예시 데이터를 사용할 수 있습니다.
                    // 원하는 작업 수행
                    setIsLoggedIn(true); // 로그인 성공 시 isLoggedIn 상태를 true로 변경
                    console.log('isLoggedIn 상태:', isLoggedIn); // 여기에 추가
                    //window.location.href = "/";
                    navigate('/'); // 이 부분이 추가됨
                } else {
                    setMessage('로그인 실패');
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
        }
    };

    return (
        <div>
            {/* {findIdModalVisible && <FindIdModal setModalVisible={setFindIdModalVisible} />}
            {findPasswordModalVisible && <FindPasswordModal setModalVisible={setFindPasswordModalVisible} />}

            <script type="text/javascript" src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js" charset="utf-8"></script>
            */}

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

                                    <div className="login_sns">
                                        <p className="sns">
                                            <Link to="https://nid.naver.com/nidlogin.login?mode=form&url=https://www.naver.com/" target="_blank"><img src="../images/btn_naver_login.gif" alt='네이버로그인' /></Link>
                                        </p>
                                        <p className="sns">
                                            <Link to="http://www.facebook.com/" target="_blank"><img src="../images/btn_facebook_login.gif" alt='페이스북로그인' /></Link>
                                        </p>
                                        <p className="sns">
                                            <Link to="https://accounts.kakao.com/login/?continue=https%3A%2F%2Faccounts.kakao.com%2Fweblogin%2Faccount%2Finfo#login" target="_blank"><img src="../images/btn_kakao_login.gif" alt='카카오톡로그인' /></Link>
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