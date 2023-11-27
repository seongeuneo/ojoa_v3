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
	<header class='header'>
                <a id="chat-channel-button" href="javascript:chatChannel()" class="mchannel"><img src="/src/main/ojoa_project/public/images/mchannel_icon.png" alt="카카오톡 채널 채팅하기 버튼" /></a>
                <div id="mheader">
                    <!-- header -->
                    <div>
                        <!-- 상단 로고 -->
                        <div>
                            <a href="/home"><img class="logo" src="/images/ojoa_logo_b.png" alt="logo"/></a>
                        </div>
                        <!-- 상단 네비 -->
                        <div class="navBar">
                            <ul>
                                <li><a href="/">상품관리 </a>&nbsp;<span>|</span></li>
                                <li><a href="/users/usersList">회원관리 </a>&nbsp;<span>|</span></li>
                               <!--  <li><a href="/admindeliever/admindelieverlist">배송관리 </a>&nbsp;<span>|</span></li> -->
                                <li><a href="/orders/ordersList">주문관리 </a></li>
                            </ul>
                        </div>
                    </div>
                    <br />
                </div>
            </header>
</body>
</html>