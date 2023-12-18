import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import React, { useState, useEffect } from "react";
import axios from 'axios';
import UserHeader from './components/Header/UserHeader';
import LoginHeader from './components/Header/LoginHeader';
import Footer from './components/Footer/Footer';
import TopButton from './components/TopButton';
import Post from './components/Post';
import Main from './pages/Main/Main';
import MyPage from './pages/MyPage/MyPage';
import Store from './pages/Store/Store';
import Order from './pages/Order/Order';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import { Chair, Bed, Sofa, Closet, Bookshelf, Lighting, Best, New } from './pages/ProductList/ProductList';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Member/Login';
import FindLoginId from './pages/Member/FindLoginId';
import FindLoginPw from './pages/Member/FindLoginPw';
import Cart from './pages/Cart/Cart';
import Join from './pages/Member/Join';
//import Agree from './pages/Member/Join';
//import Popup from './pages/Join/Popup';
import Qna from './pages/Qna/Qna';
import Mileage from './pages/MyPage/MyShop/Mileage';
import Modify from './pages/Member/Modify';
import PUpdateForm from './pages/Member/PUpdateForm';
import productList from './pages/ProductList/ProductList';
import ScrollTop from './components/ScrollToTop';
import Checkout from "./pages/Checkout/Checkout";
import Wish from "./pages/MyPage/MyShop/Wish";
import LoginHandeler from "./pages/Member/LoginHandeler";
import RecentList from './components/RecentList';

import ProductCategory from "./pages/ProductList/ProductCategory";
// import NewList from './pages/ProductList/NewList';
// import ProductList from './pages/ProductList'

import PaymentConfirmation from './pages/Checkout/PaymentConfirmation';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 추적
  const [recentItems, setRecentItems] = useState([]); // 최근 본 상품

  //장바구니
  const [cart, setCart] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(true);

  useEffect(() => {
    console.log("현재 isLoggedIn 상태 출력" + isLoggedIn); // 현재 isLoggedIn 상태 출력

    // 페이지 로딩 시 세션 스토리지에서 로그인 정보 확인
    const sessionInfo = sessionStorage.getItem('loggedInUser');
    setIsLoggedIn(!!sessionInfo); // 세션 정보가 있으면 true, 없으면 false
  }, [isLoggedIn]); // isLoggedIn 상태 변화 감지

  const handleLogout = () => {
    // ... 로그아웃 로직
    sessionStorage.removeItem('loggedInUser');
    setIsLoggedIn(false); // 로그아웃 시 로그인 상태 변경
  };


  return (
    <div className="App">
      <BrowserRouter>

        <ScrollTop />

        {isLoggedIn ? (
          <UserHeader setIsLoggedIn={setIsLoggedIn} handleLogout={handleLogout} />
        ) : (
          <LoginHeader setIsLoggedIn={setIsLoggedIn} />
        )}
        <Routes>
          <Route path="/kakaoLogin/*" //redirect_url
            element={<LoginHandeler />} //당신이 redirect_url에 맞춰 꾸밀 컴포넌트
          />
          <Route path="/mypage/*" element={<MyPage />} />
          <Route path="/member/*" element={<Modify setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/mypage/mileage/*" element={<Mileage />} />
          <Route path="/mypage/wish/*" element={<Wish />} />
          <Route path="/store/*" element={<Store />} />
          <Route path="/order/*" element={<Order />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/member/rlogin" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/member/rlogin/FindLoginId" element={<FindLoginId />} />
          <Route path="/member/rlogin/FindLoginPw" element={<FindLoginPw />} />
          <Route path="/member/modify/PUpdateForm" element={<PUpdateForm />} />
          <Route path="/" element={<Main />} />
          <Route path="/productDetail/:prod_num/*" element={<ProductDetail cart={cart} setCart={setCart} />} />
          <Route path="/productList/New/*" element={<New cart={cart} setCart={setCart} recentItems={recentItems} setRecentItems={setRecentItems}/>} />
          <Route path="/productList/Best/*" element={<Best cart={cart} setCart={setCart} recentItems={recentItems} setRecentItems={setRecentItems}/>} />
          <Route path="/productList/Chair/*" element={<Chair cart={cart} setCart={setCart} recentItems={recentItems} setRecentItems={setRecentItems} />} />
          <Route path="/productList/Sofa/*" element={<Sofa cart={cart} setCart={setCart} recentItems={recentItems} setRecentItems={setRecentItems} />} />
          <Route path="/productList/Bed/*" element={<Bed cart={cart} setCart={setCart} recentItems={recentItems} setRecentItems={setRecentItems} />} />
          <Route path="/productList/Bookshelf/*" element={<Bookshelf cart={cart} setCart={setCart} recentItems={recentItems} setRecentItems={setRecentItems} />} />
          <Route path="/productList/Closet/*" element={<Closet cart={cart} setCart={setCart} recentItems={recentItems} setRecentItems={setRecentItems} />} />
          <Route path="/productList/Lighting/*" element={<Lighting cart={cart} setCart={setCart} recentItems={recentItems} setRecentItems={setRecentItems} />} />

          {/* <Route path="/ProductList/ProductCategory/*" element={<ProductCategory cart={cart} setCart={setCart} handleCart={handleCart} />} /> */}


          <Route path="/cart/*" element={<Cart cart={cart} 
            setCart={setCart} isAllChecked={isAllChecked} setIsAllChecked={setIsAllChecked} />} />
          <Route path="/member/rjoin" element={<Join />} />
          {/* <Route path="/login/info/agree" element={<Agree />} />
          <Route path="/login/info/agree/popup" element={<Popup />} /> */}
          <Route path="/qna" element={<Qna />} />
          <Route path="/checkout" element={<Checkout cart={cart} />} />
          <Route path="/paymentconfirmation" element={<PaymentConfirmation cart={cart} />} />
        </Routes>
        <Footer />
        <TopButton />
        <RecentList recentItems={recentItems} setRecentItems={setRecentItems} />
      </BrowserRouter>
    </div>
  );
}

export default App;
