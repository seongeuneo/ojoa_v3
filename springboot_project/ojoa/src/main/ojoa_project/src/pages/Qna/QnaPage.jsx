import './Qna.css';
import React from 'react';
import { Link } from 'react-router-dom';

const QnaPage = () => {

    return (
        <div className="qna_title_container">
            <div className="qna_path">
                <span>현재 위치</span>
                <ol>
                    <li><Link to="/">홈</Link></li>
                    <li title="현재 위치">&gt; &nbsp;&nbsp;QnA</li>
                </ol>
            </div>
            <div className="qna_title">
                <h2>QnA</h2>
                <div className="txt_01">Ojoa 문의게시판입니다.</div>
            </div>
        </div>
    );
};
export default QnaPage;