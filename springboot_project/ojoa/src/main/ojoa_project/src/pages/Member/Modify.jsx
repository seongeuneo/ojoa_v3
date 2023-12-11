import "../Member/Modify.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Post from "../../components/Post";

function Modify() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [enroll_company, setEnroll_company] = useState({
        address: '',
        zipcode: '',
        id: '',
        name: '',
        password: '',
        password2: '',
        addressdetail: '',
        phone1: '',
        phone2: '',
        phone3: '',
        email1: '',
        email2: '',
        marketing_sms: '',
        marketing_email: '',
    });

    const handleInput = (e) => {
        setEnroll_company({
            ...enroll_company,
            [e.target.name]: e.target.value,
        })
    }

    const handleDelete = async () => {
        console.log(enroll_company.id);
        try {
            const response = await axios.delete(`/member/rmemberdelete?id=${enroll_company.id}`);
            console.log(response.data); // 성공적으로 삭제되었을 때의 응답 확인
            // 삭제 후에 필요한 작업 수행
            // 예를 들어, 회원 탈퇴 후 로그인 페이지로 이동 등
        } catch (error) {
            console.error('Error deleting user:', error);
            // 에러 처리 로직 추가
        }
    };

    useEffect(() => {
        // const loggedInUser = sessionStorage.getItem('loggedInUser');
        // if (loggedInUser) {
        //     const user = JSON.parse(loggedInUser);
        //     // 사용자 이름 설정
        //     setUserName(user.name); // 세션에 저장된 사용자 정보에서 이름 가져와 설정

        // 사용자 정보를 불러오는 API 엔드포인트로 GET 요청을 보냅니다.
        const fetchUserData = async () => {
            try {
                const response = await axios.put('/member/rmemberUpdate'); // API 엔드포인트에 맞게 수정하세요
                const user = response.data;


                // 사용자 정보 설정
                setEnroll_company({
                    ...enroll_company,
                    id: user.id, // 로그인한 사용자의 아이디 설정
                    name: user.name,
                    password: user.password,
                    password2: user.password2,
                    zipcode: user.zipcode,
                    address: user.address,
                    addressdetail: user.addressdetail,
                    phone1: user.phone1,
                    phone2: user.phone2,
                    phone3: user.phone3,
                    email1: user.email1,
                    email2: user.email2,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData(); // 사용자 정보 불러오기
    }, []); // 컴포넌트 마운트 시 한 번만 실행

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 백엔드로 POST 요청을 보냄
            const response = await axios.put('/member/rmemberUpdate', enroll_company);
            // 업데이트된 데이터 전달

            console.log(response.data); // 요청 결과 확인
            // 필요 시 상태 업데이트나 페이지 이동 등 추가 작업 수행
        } catch (error) {
            console.error('Error modifying user information:', error);
            // 에러 처리 로직 추가
        }
    }

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
                        <span>저희 쇼핑몰을 이용해 주셔서 감사합니다. <span><strong>[{userName}]</strong></span> 님은 <strong>[<span>일반
                        </span>]</strong> 회원이십니다.</span>
                    </div>
                </div>


                <form onSubmit={handleSubmit} name="personalInfo">
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
                                    //readOnly
                                    autocomplete="username"
                                    
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
                                    //readOnly
                                    autocomplete="username"
                                    
                                />
                                <span className="input_error"></span>
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label htmlFor="password">비밀번호</label>
                            </th>
                            <td>
                                <input type="password"
                                    name="password"
                                    id="password"
                                    //readOnly
                                    autocomplete="new-password"
                                    
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
                                    autocomplete="new-password"
                                    
                                />

                                <span className="input_error"></span>
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
                                    //readOnly 
                                    />&nbsp;
                                    <button className="address_search"><Post company={enroll_company} setcompany={setEnroll_company}></Post></button>
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
                                    //readOnly
                                    />&nbsp;
                                    <input type="text"
                                        name="addressdetail"
                                        id="addressdetail"
                                        placeholder="상세주소"
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
                                    //readOnly
                                    />
                                    &nbsp;&ndash;&nbsp;
                                    <input type="tel"
                                        name="phone2"
                                        size="1"
                                        id="phone2"

                                        required
                                    />
                                    &nbsp;&ndash;&nbsp;
                                    <input type="tel"
                                        name="phone3"
                                        id="phone3"
                                        size="1"

                                        required
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
                                    
                                />
                                &nbsp;@&nbsp;
                                <input type="text"
                                    name="email2"
                                    id="email2"
                                    placeholder="직접 입력"
                                    
                                />
                            </td>
                        </tr>

                        <tr><th><span>&#42;</span>마케팅 수신 동의 ( SMS )</th>
                            <td>
                                <div className="agree_check">
                                    <label htmlFor="marketing_sms"><input type="radio" name="marketing_sms" id="marketing_sms" value="y" />SMS</label>
                                    <label htmlFor="marketing_smsNone"><input type="radio" name="marketing_sms" id="marketing_smsNone" value="n" checked />수신받지않음</label>
                                    <span>마케팅 수신에 동의하실 경우, Ojoa의 소식을 SMS로 받아보실 수 있습니다.</span>
                                </div>
                            </td>
                        </tr>

                        <tr><th><span>&#42;</span>마케팅 수신 동의 ( 이메일 )</th>
                            <td>
                                <div className="agree_check">
                                    <label htmlFor="marketing_email"><input type="radio" name="marketing_email" id="marketing_email" value="y" />이메일</label>
                                    <label htmlFor="marketing_emailNone"><input type="radio" name="marketing_email" id="marketing_emailNone" value="n" checked />수신받지않음</label>
                                    <span>마케팅 수신에 동의하실 경우, Ojoa의 소식을 이메일로 받아보실 수 있습니다.</span>
                                </div>
                            </td>
                        </tr>
                    </table>

                    <div className="input_warn">* 는 필수 입력사항입니다.</div>

                    <div className="join_btn">
                        {/* <a href="" className="out_btn2">취소하기</a> */}
                        <button type="submit" className="out_btn3">수정완료</button>
                        <button className="out_btn2"><Link to="./member/pUpdateForm">비밀번호변경</Link></button>
                        <button className="out_btn4" onClick={handleDelete}>회원탈퇴</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modify;