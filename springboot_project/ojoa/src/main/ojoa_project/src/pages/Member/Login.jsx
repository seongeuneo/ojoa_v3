import '../Member/Login.css';
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ isLoggedIn, setIsLoggedIn }) => {

    // 카카오 로그인 함수를 실행시키면 아래에 설정해 놓은 KAKAO_AUTH_URL 주소로 이동한다.
    // 이동 된 창에서 kakao 계정 로그인을 시도할 수 있으며 로그인 버튼 클릭 시 Redirect URI로 이동하면서 빈화면과 함께
    // 인가 코드가 발급된다.( 인가코드는 파라미터 값에 들어가 있다.)
    const REST_API_KEY = '2f9b2c7502a2208b4674aae7c158d54f';
    const REDIRECT_URI = 'http://localhost:3000/kakaoLogin';
    const KAKAO_AUTH_URL = `http://kauth.kakao.com/oauth/authorize?
    client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const loginHandler = () => {
        window.location.href = KAKAO_AUTH_URL;
    }

    const handleLinkClick = () => {
        alert('해당 페이지는 현재 준비중 입니다.');
    };

    const navigate = useNavigate(); // useNavigate  훅 사용

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [rememberId, setRememberId] = useState(false); // 아이디를 기억하는 상태 추가

    useEffect(() => {
        // 로컬 스토리지에서 저장된 아이디 가져오기
        const rememberedId = localStorage.getItem('rememberedId');
        if (rememberedId) {
            setId(rememberedId); // 가져온 아이디를 상태에 설정
            setRememberId(true); // 아이디를 기억하는 상태 업데이트
        }
    }, []);

    useEffect(() => {
        console.log('isLoggedIn 상태 변경:', isLoggedIn); // 상태 변경 시 로그 확인
    }, [isLoggedIn]); // isLoggedIn 상태가 변경될 때마다 실행

    const handleLogin = async () => {
        const loginData = {
            id: id,
            password: password
        };

        console.log('로그인 데이터:', loginData); // 로그인 데이터 콘솔 출력

        try {
            const response = await axios.post("/member/rlogin", loginData);

            if (response.status === 200) {
                if (response.data) {
                    setMessage('로그인 성공');
                    // 응답으로 받은 데이터를 세션 스토리지에 저장
                    const loggedInUser = response.data;
                    sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                    setIsLoggedIn(true); // 로그인 성공 시 isLoggedIn 상태를 true로 변경
                    //console.log('isLoggedIn 상태:', isLoggedIn); // 여기에 추가
                    //console.log('isLoggedIn 상태:', true);
                    navigate('/');
                } else {
                    setMessage('로그인 실패');
                }
            } else {
                setMessage('서버 오류');
            }
            //console.log('isLoggedIn 상태:', isLoggedIn);
        } catch (error) {
            if (error.response) {
                setMessage('로그인 실패: ID 혹은 Password 가 잘못되었습니다.' + error.response.data);
            } else {
                setMessage('로그인 중 에러 발생');
            }
        }

        // 아이디 기억하기 체크 여부에 따라 로컬 스토리지에 아이디 저장
        if (rememberId) {
            localStorage.setItem('rememberedId', id);
        } else {
            localStorage.removeItem('rememberedId');
        }

        // // 실패 메시지 추출 함수
        // function extractErrorMessage(htmlResponse) {
        // }

    };

    // Ref 객체 추가
    const idInputRef = useRef(null); // 아이디 입력 필드의 Ref 객체
    const passwordInputRef = useRef(null);

    // 엔터키 누르면 아래로
    const handleEnterPress = (event) => {
        if (event.key === "Enter") {
            if (event.target.name === "id") {
                passwordInputRef.current.focus();
            } else if (event.target.name === "password") {
                handleLogin();
            }
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
                                            name="id"
                                            id="id"
                                            placeholder="아이디"
                                            value={id}
                                            // autoComplete="username"
                                            ref={idInputRef}
                                            onKeyDown={handleEnterPress}
                                            onChange={(e) => setId(e.target.value)} // 아이디 입력 값 업데이트
                                        />
                                    </label>
                                    <label className="login_password">
                                        <span><img src="../images/password.png" alt="비밀번호" /></span>
                                        <input type="password"
                                            name="password"
                                            id="password"
                                            placeholder="비밀번호"
                                            value={password}
                                            ref={passwordInputRef}
                                            onKeyDown={handleEnterPress}
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
                                        <label for="idSet" class="sign_checkbox">
                                            <input
                                                type="checkbox"
                                                id="idSet"
                                                checked={rememberId}
                                                onChange={() => setRememberId(!rememberId)} // 체크 여부 반전
                                            />{""}
                                            <span class="cbx">
                                                <svg width="5px" height="15px" viewBox="0 0 15 15">
                                                </svg>
                                            </span>
                                            <span>아이디 기억하기</span>
                                        </label>
                                    </div>
                                    <div className="login_find">
                                        <ul>
                                            <li>
                                                <button type="button"><Link to="/member/rlogin/findLoginId">아이디찾기</Link></button>
                                            </li>
                                            <li>&nbsp;|&nbsp;</li>
                                            <li>
                                                <button type="button"><Link to="/member/rlogin/FindLoginPw">비밀번호찾기</Link></button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="login_cboth"></div>

                                    <div className="login_sns">
                                        <p className="sns">
                                            <img src="../images/btn_naver_login.gif" onClick={handleLinkClick} alt='네이버로그인' />
                                        </p>
                                        <p className="sns">
                                            <img src="../images/btn_facebook_login.gif" onClick={handleLinkClick} alt='페이스북로그인' />
                                        </p>
                                        <p className="sns">
                                            <React.Fragment>
                                                <img src="../images/btn_kakao_login.gif" alt='카카오톡로그인' type="button" onClick={loginHandler} />
                                            </React.Fragment>
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
                                    <Link to="/member/rjoin">회원가입</Link>
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