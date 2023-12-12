import "../Member/Modify.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const PUpdateForm = () => {
    const navigate = useNavigate();

    const [loggedInUserID, setLoggedInUserID] = useState('');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');


    // 비밀번호 변경 함수 등록
    const handlePasswordInputChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordInputChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (newPassword.length < 4) {
            setError("비밀번호를 4글자 이상 입력하세요.");
            return;
        }

        try {
            const response = await axios.post("/member/rpasswordUpdate", {
                id: loggedInUserID, // 로그인된 사용자의 ID
                password: newPassword // 새로운 비밀번호를 전송
            });

            if (response.status === 200) {
                console.log('Password 변경 완료 :', response.data);
                navigate('/Member/rLogin');
            } else {
                setError("비밀번호 변경에 실패했습니다.");
            }
        } catch (error) {
            console.error('Password 변경 오류 :', error);
            setError("서버 오류가 발생했습니다.");
        }
    };

    return (
        <div className="Modify">
            <div className="container">
                <div className="path">
                    <span>현재 위치</span>
                    <ol>
                        <li><Link to="/">홈</Link></li>
                        <li title="현재 위치"> &gt; &nbsp; 회원 비밀번호 수정</li>
                    </ol>
                </div>
                <div className="pageTlt">

                    <div className="txt_01"><h3>회원 비밀번호 수정</h3></div>
                </div>
                <div className="base-box">
                    <p className="thumbnail">
                        <img src="../../images/img_member_default.gif" alt="썸네일" /></p>
                    <div className="description">
                        <span>저희 쇼핑몰을 이용해 주셔서 감사합니다. <span><strong></strong></span> 님은 <strong>[<span>일반
                        </span>]</strong> 회원이십니다.</span>
                    </div>
                </div>

                <form onSubmit={handlePasswordChange} name="personalInfo">
                    <table className="personal_modify">

                        <caption>
                        </caption>

                        <tr>
                            <th>
                                <label htmlFor="oldPassword">새로운 비밀번호</label>
                            </th>
                            <td>
                                <input
                                    type="password"
                                    name="oldPassword"
                                    id="oldPassword"
                                    value={newPassword}
                                    onChange={handlePasswordInputChange}
                                />
                                <span className="input_error"></span>
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label htmlFor="password2">비밀번호 재확인</label>
                            </th>
                            <td>
                                <input
                                    type="password"
                                    name="password2"
                                    id="password2"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordInputChange}
                                />

                                <span className="input_error"></span>
                            </td>
                        </tr>

                    </table>

                    {error && <div className="error_message">{error}</div>}

                    <div className="join_btn">
                        <button type="submit" className="out_btn5">수정완료</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PUpdateForm;