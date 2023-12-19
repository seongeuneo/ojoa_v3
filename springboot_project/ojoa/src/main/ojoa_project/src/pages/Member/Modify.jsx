import "../Member/Modify.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Post from "../../components/Post";

function Modify({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const [memberInfo, setMemberInfo] = useState({
        address: '', // State에서 사용자 정보 관리
        zipcode: '',
        id: '',
        name: '',
        // password: '',
        // password2: '',
        addressdetail: '',
        phone1: '',
        phone2: '',
        phone3: '',
        email1: '',
        email2: '',
        marketing_sms: '',
        marketing_email: '',
    });

    // 컴포넌트가 마운트되면 기존 회원 정보를 가져와서 입력 필드에 채우는 로직
    useEffect(() => {
        // API 호출로 기존 회원 정보 가져오기
        const fetchMemberInfo = async () => {
            try {
                // 여기에 기존 회원 정보를 가져오는 API 호출하는 코드 작성
                const response = await axios.get('/member/rinfo'); // 예시 API 호출

                // API로부터 받은 회원 정보를 상태에 설정하여 입력 필드에 채우기
                setMemberInfo(response.data); // 받아온 회원 정보

            } catch (error) {
                console.error('Error fetching member information:', error.message);
                // 에러 처리 로직 추가
            }
        };

        fetchMemberInfo(); // 컴포넌트가 마운트되면 기존 회원 정보를 가져오도록 호출
    }, []);

    // 수정된 정보를 서버로 전송하는 함수
    const handleUpdate = async () => {
        try {
            const response = await axios.post('/member/rUpdate', memberInfo); // memberInfo를 직접 전송
            console.log("*****" + response.data); // 성공적으로 업데이트됐을 때의 응답 확인
            alert("회원 정보가 업데이트되었습니다.");
            // 여기에 필요한 추가 작업 수행 (예: 성공 시 화면 전환)
        } catch (error) {
            console.error('Error updating user information:', error.message);
            // 에러 처리 로직 추가
        }
    };

    const handleInput = (e) => { // 입력값 변경 시 State 업데이트
        setMemberInfo({
            ...memberInfo,
            [e.target.name]: e.target.value,
        })
    }
    const handleDelete = async () => {
        try {
            const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
            if (loggedInUser && loggedInUser.id) {
                const userId = loggedInUser.id;
                const response = await axios.delete(`/member/rmemberdelete?id=${userId}`);
                alert("회원 탈퇴 성공");
                //console.log(response.data); // 성공적으로 삭제되었을 때의 응답 확인

                setIsLoggedIn(false); // 로그아웃 시 로그인 상태 변경
                // 탈퇴 성공 후 세션 무효화
                sessionStorage.removeItem('loggedInUser');
                //navigate('/'); // 회원 탈퇴 후 메인 홈으로 이동
                window.location.replace('/'); // 또는 다른 목적지 URL
            } else {
                console.error('사용자 정보를 찾을 수 없습니다.');
                alert('사용자 정보를 찾을 수 없습니다.');
            }
        } catch (error) {
            if (error.response && error.response.status === 502) {
                alert("삭제 오류: " + error.response.data);
            } else {
                console.error('Error deleting user:', error.message);
                alert("삭제 오류: " + error.message);
            }
        }
    };

    return (
        <div className="Modify">
            <div className="container">
                <div className="path">
                    <span>현재 위치</span>
                    <ol>
                        <li><Link to="/">홈</Link></li>
                        <li title="현재 위치"> &gt; &nbsp; 회원 정보 수정</li>
                    </ol>
                </div>
                <div className="pageTlt">

                    <div className="txt_01"><h3>회원 정보 수정</h3></div>
                </div>
                <div className="base-box">
                    <p className="thumbnail">
                        <img src="../images/img_member_default.gif" alt="썸네일" /></p>
                    <div className="description">
                        <span>저희 쇼핑몰을 이용해 주셔서 감사합니다. <span><strong>[{memberInfo.name}]</strong></span> 님은 <strong>[<span>일반
                        </span>]</strong> 회원이십니다.</span>
                    </div>
                </div>


                <form id="personalInfo">
                    <table className="personal_modify">

                        <caption>
                        </caption>

                        <tr>
                            <th>
                                <label htmlFor="id"><span></span>아이디</label>
                            </th>
                            <td>
                                <input type="text"
                                    name="id"
                                    id="id"
                                    readOnly
                                    value={memberInfo.id}
                                    onChange={handleInput}
                                />
                                <span className="input_error"></span>
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label htmlFor="name"><span></span>이름</label>
                            </th>
                            <td>
                                <input type="text"
                                    name="name"
                                    id="name"
                                    readOnly
                                    value={memberInfo.name}
                                    onChange={handleInput}
                                />
                                <span className="input_error"></span>
                            </td>
                        </tr>

                        {/* <tr>
                            <th>
                                <label htmlFor="password">비밀번호</label>
                            </th>
                            <td>
                                <input type="password"
                                    name="password"
                                    id="password"
                                //readOnly


                                />
                                <span className="input_error"></span>
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label htmlFor="password2">비밀번호 확인</label>
                            </th>
                            <td>
                                <input type="password"
                                    name="password2"
                                    id="password2"
                                //readOnly
                                />

                                <span className="input_error"></span>
                            </td>
                        </tr> */}

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
                                        value={memberInfo.zipcode}
                                        onChange={handleInput}
                                    //readOnly 
                                    />&nbsp;
                                    {/* <button className="address_search">
                                        <Post company={setMemberInfo} setcompany={setEnroll_company}></Post></button> */}
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
                                        value={memberInfo.address}

                                    //readOnly
                                    />&nbsp;
                                    <input type="text"
                                        name="addressdetail"
                                        id="addressdetail"
                                        placeholder="상세주소"
                                        value={memberInfo.addressdetail}
                                        onChange={handleInput}
                                    />
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label htmlFor="cellphone"><span>&#42;</span>휴대폰 번호</label>
                            </th>
                            <td>
                                <div>
                                    <input type="tel"
                                        name="phone1"
                                        id="phone1"
                                        size="1"
                                        value={memberInfo.phone1}
                                        onChange={handleInput}
                                    />

                                    &nbsp;&ndash;&nbsp;
                                    <input type="tel"
                                        name="phone2"
                                        size="1"
                                        id="phone2"
                                        value={memberInfo.phone2}
                                        onChange={handleInput}
                                    />

                                    &nbsp;&ndash;&nbsp;
                                    <input type="tel"
                                        name="phone3"
                                        id="phone3"
                                        size="1"
                                        value={memberInfo.phone3}
                                        onChange={handleInput}
                                    />
                                </div>
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
                                    value={memberInfo.email1}
                                    onChange={handleInput}
                                />

                                &nbsp;@&nbsp;

                                <input type="text"
                                    name="email2"
                                    id="email2"
                                    placeholder="직접 입력"
                                    value={memberInfo.email2}
                                    onChange={handleInput}
                                />

                            </td>
                        </tr>

                        <tr><th><span>&#42;</span>마케팅 수신 동의 ( SMS )</th>
                            <td>
                                <div className="agree_check">
                                    <label htmlFor="marketing_sms"><input type="radio" name="marketing_sms" id="marketing_sms" value="y" checked={memberInfo.marketing_sms === 'y'}
                                        onChange={handleInput} />SMS</label>
                                    <label htmlFor="marketing_smsNone"><input type="radio" name="marketing_sms" id="marketing_smsNone" value="n" checked={memberInfo.marketing_sms === 'n'}
                                        onChange={handleInput} />수신받지않음</label>
                                    <span>마케팅 수신에 동의하실 경우, Ojoa의 소식을 SMS로 받아보실 수 있습니다.</span>
                                </div>
                            </td>
                        </tr>

                        <tr><th><span>&#42;</span>마케팅 수신 동의 ( 이메일 )</th>
                            <td>
                                <div className="agree_check">
                                    <label htmlFor="marketing_email"><input type="radio" name="marketing_email" id="marketing_email" value="y" checked={memberInfo.marketing_email === 'y'}
                                        onChange={handleInput} />이메일</label>
                                    <label htmlFor="marketing_emailNone"><input type="radio" name="marketing_email" id="marketing_emailNone" value="n" checked={memberInfo.marketing_email === 'n'}
                                        onChange={handleInput} />수신받지않음</label>
                                    <span>마케팅 수신에 동의하실 경우, Ojoa의 소식을 이메일로 받아보실 수 있습니다.</span>
                                </div>
                            </td>
                        </tr>

                    </table>

                    <div className="input_warn">* 는 필수 입력사항입니다.</div>

                    <div className="join_btn">
                        {/* <a href="" className="out_btn2">취소하기</a> */}
                        <button onClick={handleUpdate} type="submit" className="out_btn3">수정완료</button>
                        <button className="out_btn2"><Link to="/member/modify/pUpdateForm">비밀번호변경</Link></button>
                        <button className="out_btn4" onClick={handleDelete}>회원탈퇴</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modify;