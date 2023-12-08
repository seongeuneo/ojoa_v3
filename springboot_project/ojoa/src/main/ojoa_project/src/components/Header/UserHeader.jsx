import { Link } from 'react-router-dom';
import '../../components/Header/UserHeader.css';
import Modal from '../Modal/Modal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserHeader({ setIsLoggedIn: setLoggedInProp }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 세션 정보를 확인하여 로그인 상태를 설정하는 로직 추가
    useEffect(() => {
        const sessionInfo = sessionStorage.getItem('loggedInUser'); // 세션에서 로그인 정보 가져오기
        setIsLoggedIn(!!sessionInfo); // 세션 정보가 있으면 true, 없으면 false로 설정
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.post('/member/rlogout'); // 서버의 로그아웃 처리 요청
            if (response.status === 200) {
                setIsLoggedIn(false); // 로그아웃 상태로 변경
                sessionStorage.removeItem('loggedInUser'); // 세션 정보 삭제
                window.location.href = '/'; // 로그아웃 후 홈으로 이동
            } else {
                // 에러 처리 로직
            }
        } catch (error) {
            // 에러 처리 로직
        }
    };

    const handleLinkClick = () => {
        alert('해당 페이지는 현재 준비중 입니다.');
    };

    const generateToLink = (category) => {
        const CATEGORY_PATHS = {
            'New': '/ProductList/New',
            'Best': '/ProductList/Best',
            '침대': '/ProductList/Bed',
            '소파': '/ProductList/Sofa',
            '책장': '/ProductList/Bookshelf',
            '옷장': '/ProductList/Closet',
            '조명': '/ProductList/Lighting',
            '의자': '/ProductList/Chair',
            // 나머지 카테고리에 대한 경로도 추가해주세요
        };
        return CATEGORY_PATHS[category] || '#';
    };

    return (
        <>
            <header className='header'>
                {/* <Link to="/qna" className="mtalk"><img src="/images/mtalk_icon.png" alt="mtalk" /></Link> */}
                <a id="chat-channel-button" href="javascript:chatChannel()" className="mchannel"><img src="/images/mchannel_icon.png" alt="카카오톡 채널 채팅하기 버튼" /></a>
                <div id="mheader">
                    {/*---------------------------------------------------------*/}
                    {/* header */}
                    <div>
                        {/* 상단 로고 */}
                        <div>
                            <Link to="/"><img className="logo" src="/images/ojoa_logo_b.png" alt="logo" /></Link>
                        </div>
                        <div className="search">
                            <Modal />
                        </div>
                        {/* 상단 네비 */}
                        <div className="navBar">
                            <ul>
                                <li onClick={handleLogout}><a>LOGOUT</a>&nbsp;<span>|</span></li>
                                <li><Link to="../MyPage">MYPAGE </Link>&nbsp;<span>|</span></li>
                                <li><Link to="../Order">ORDER </Link>&nbsp;<span>|</span></li>
                                <li><Link to="../Cart">CART </Link>&nbsp;<span>|</span></li>
                                <li><Link to="../Qna">QNA </Link>&nbsp;<span>|</span></li>
                                <li><Link to="../Store">STORE </Link></li>
                            </ul>
                        </div>
                    </div>
                    <br />
                </div>
            </header>
            {/*---------------------------------------------------------*/}
            {/* category_navi_drop_bar */}
            <div className="sticky" id="category_nav">
                <ul>
                    <li><Link to={generateToLink("Best")}>BEST</Link></li>
                    <li><Link to={generateToLink("New")}>NEW</Link></li>
                    {/* <li><Link to="/ProductList/NewList">NEW</Link></li> */}
                    <li><Link to='/ProductList/Bed'>침대</Link>
                        <ul>
                            <li><Link to="#" onClick={handleLinkClick}>싱글</Link></li>
                            <li><Link to="#" onClick={handleLinkClick}>더블</Link></li>
                        </ul>
                    </li>
                    <li><Link to={generateToLink("소파")}>소파</Link>
                        <ul>
                            <li><Link to="#" onClick={handleLinkClick}>2인</Link></li>
                            <li><Link to="#" onClick={handleLinkClick}>3인</Link></li>
                        </ul>
                    </li>
                    <li><Link to={generateToLink("책장")}>책장</Link>
                        <ul>
                            <li><Link to="#" onClick={handleLinkClick}>2단</Link></li>
                            <li><Link to="#" onClick={handleLinkClick}>3단</Link></li>
                        </ul>
                    </li>
                    <li><Link to={generateToLink("옷장")}>옷장</Link>
                        <ul>
                            <li><Link to="#" onClick={handleLinkClick}>2칸</Link></li>
                            <li><Link to="#" onClick={handleLinkClick}>3칸</Link></li>
                        </ul>
                    </li>
                    <li><Link to={generateToLink("조명")}>조명</Link>
                        <ul>
                            <li><Link to="#" onClick={handleLinkClick}>스탠드형</Link></li>
                            <li><Link to="#" onClick={handleLinkClick}>탈부착형</Link></li>
                        </ul>
                    </li>
                    <li><Link to={generateToLink("의자")}>의자</Link>
                        <ul>
                            <li><Link to="#" onClick={handleLinkClick}>탁상의자</Link></li>
                            <li><Link to="#" onClick={handleLinkClick}>주방의자</Link></li>
                        </ul>
                    </li>
                </ul>

            </div>

        </>
    );
};

export default UserHeader;