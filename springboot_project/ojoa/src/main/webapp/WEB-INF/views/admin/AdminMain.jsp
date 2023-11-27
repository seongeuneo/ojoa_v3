<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Admin Page</title>
<link rel="stylesheet" type="text/css" href="/resources/myLib/Header.css">
</head>
<body>
	<h1>OJOA 관리자용 페이지</h1>
	<header className='header'>
                <a id="chat-channel-button" href="javascript:chatChannel()" className="mchannel"><img src="/images/mchannel_icon.png" alt="카카오톡 채널 채팅하기 버튼" /></a>
                <div id="mheader">
                    <!-- header -->
                    <div>
                        <!-- 상단 로고 -->
                        <div>
                            <Link to="/"><img className="logo" src="/images/ojoa_logo_b.png" alt="logo"/></Link>
                        </div>
                        <div className="search">
                            <Modal />
                        </div>
                        <!-- 상단 네비 -->
                        <div className="navBar">
                            <ul>
                                <li><Link to="/">상품관리 </Link>&nbsp;<span>|</span></li>
                                <li><Link to="/">회원관리 </Link>&nbsp;<span>|</span></li>
                                <li><Link to="/">배송관리 </Link>&nbsp;<span>|</span></li>
                                <li><Link to="/">상품관리 </Link></li>
                            </ul>
                        </div>
                    </div>
                    <br />
                </div>
            </header>
</body>
</html>