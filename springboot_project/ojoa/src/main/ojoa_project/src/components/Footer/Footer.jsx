import React from 'react';
import { Link } from 'react-router-dom';
import '../../components/Footer/Footer.css';

function Footer() {

    const handleLinkClick = () => {
        alert('해당 페이지는 현재 준비중 입니다.');
    };

    return (
        <>
            <footer>
                <div id="mfooter">
                    <div className="footer_left">
                        <div className="ft_info01">
                            {/* 전화번호 */}
                            <div className="numb">
                                <strong>031 3456 7890</strong>
                            </div>
                            {/* 운영시간 */}
                            <div className="csqa">
                                통화량이 많을 때는 Q&A 게시판을 이용해주세요.<br />
                                MON-FRI 11:00~20:00, LUNCH 13:00~14:00 / SAT-SUN·HOLIDAY OFF<br />
                                예금주:(주)오조아가구연구소 기업은행 1002-000-000000
                            </div>
                        </div>
                        {/* 회사정보 */}
                        <div className="ojoa2"><b>주식회사오조아가구연구소</b>
                            <br />
                            경기도 성남시 분당구 돌마로 46, 3층 5호 오조아
                            <span> / </span>
                            사업자번호 : 000-00-00000 [사업자정보확인]
                            <span> / </span>
                            통신판매업신고 : 2023-경기성남-1355
                            <br />
                            CEO : 오좋아
                            <span> / </span>
                            CPO : 오조아
                            <span> / </span>
                            MAIL : ojoa@gmail.com
                            <br />
                            CALL CENTER : 02-3456-7890
                            <span> / </span>
                            FAX : 02-345-6789<br /><br /><b>오조아 온라인 고객센터</b>
                            <br />
                            03000 경기도 성남시 분당구 돌마로 46, 3층 5호 오조아
                            <span> / </span>
                            CALL CENTER : 012-3456-7890
                            <br />
                            <b>입점문의 : ojoa@gmail.com</b>
                        </div>
                        {/* 카피라이트 */}
                        <div className="ojoa3">
                            ⓒ 오조아 온라인 ALL RIGHTS RESERVED. HOSTING BY JK.
                        </div>
                        {/* 회사소개 */}
                        <div className="ft_menu">
                            <ul>
                                <li><Link to="#" onClick={handleLinkClick}>회사소개</Link></li>
                                <li><Link to="#" onClick={handleLinkClick}>이용약관</Link></li>
                                <li><Link to="#" onClick={handleLinkClick}>개인정보처리방침</Link></li>
                                <li><Link to="#" onClick={handleLinkClick}>이용안내</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer_right">
                        <div className="ft_comm">
                            <ul>
                                <li><b>Community</b></li>
                                <li><Link to="./qna">NOTICE</Link></li>
                                <li><Link to="#" onClick={handleLinkClick}>REVIEW</Link></li>
                                <li><Link to="./qna">QNA</Link></li>
                                <li><Link to="./store">OFFLINE STORE</Link></li>
                                <li><Link to="#" onClick={handleLinkClick}>MEMBERSHIP</Link></li>
                            </ul>
                        </div>
                        <div className="ft_quick">
                            <ul>
                                <li><b>Shopping Quick</b></li>
                                <li><Link to="./MyPage">MY PAGE</Link></li>
                                <li><Link to="./order">ORDER</Link></li>
                                <li><Link to="./cart">WISH LIST</Link></li>
                            </ul>
                        </div>
                        <div className="ft_sns">
                            <ul>
                                <li><Link to="https://www.instagram.com" target="_blank"><img src="/images/ft_sns01.gif" alt="인스타" /></Link></li>
                                <li><Link to="https://www.facebook.com" target="_blank"><img src="/images/ft_sns02.gif" alt="페북" /></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;