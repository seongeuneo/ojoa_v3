import "../MyPage/MyPage.css";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ThumbNail = () => {

    const [userName, setUserName] = useState(""); // 사용자 이름 상태

    useEffect(() => {
        // 세션 스토리지에서 사용자 이름 가져오기
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            // 사용자 이름 설정
            setUserName(user.name); // 세션에 저장된 사용자 정보에서 이름 가져와 설정
        }
    }, []); // 컴포넌트 마운트 시 한 번만 실행

    return (
        <div className="container">
            <div className="path">
                <span>현재 위치</span>
                <ol>
                    <li><Link to="/">홈</Link></li>
                    <li title="현재 위치">&gt; &nbsp;&nbsp;My Page</li>
                </ol>
            </div>
            <div className="pageTlt">
                <h2>MY PAGE</h2>
                <div className="txt_01">포인트적립 및 배송확인 등</div>
            </div>
            <div className="base-box">
                <p className="thumbnail">
                    <img src="../images/img_member_default.gif" alt="썸네일" /></p>
                <div className="description">
                    <span>저희 쇼핑몰을 이용해 주셔서 감사합니다. <span><strong>[{userName}]</strong></span> 님은 <strong>[<span>일반
                    </span>]</strong> 회원이십니다.</span>
                </div>
            </div>
        </div>
    );
};
export default ThumbNail;