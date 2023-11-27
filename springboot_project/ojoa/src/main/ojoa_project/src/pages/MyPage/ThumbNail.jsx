import "../MyPage/MyPage.css";
import React from 'react';
import { Link } from 'react-router-dom';

const ThumbNail = () => {

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
                    <span>저희 쇼핑몰을 이용해 주셔서 감사합니다. <span><strong>켄드릭 라마</strong></span> 님은 <strong>[<span>킹쿤타
                        회원</span>]</strong> 회원이십니다.</span>
                </div>
            </div>
        </div>
    );
};
export default ThumbNail;