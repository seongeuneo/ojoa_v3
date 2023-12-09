import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import React, { useState, useEffect } from "react";
import axios from 'axios';
import UserHeader from './components/Header/UserHeader';
import LoginHeader from './components/Header/LoginHeader';
import Footer from './components/Footer/Footer';
import TopButton from './components/TopButton';
import Main from './pages/Main/Main';
import MyPage from './pages/MyPage/MyPage';
import Store from './pages/Store/Store';
import Order from './pages/Order/Order';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import { Chair, Bed, Sofa, Closet, Bookshelf, Lighting, Best, New } from './pages/ProductList/ProductList';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Member/Login';
import Cart from './pages/Cart/Cart';
import Join from './pages/Member/Join';
//import Agree from './pages/Member/Join';
//import Popup from './pages/Join/Popup';
import Qna from './pages/Qna/Qna';
import Mileage from './pages/MyPage/MyShop/Mileage';
import Modify from './pages/Member/Modify';
import productList from './pages/ProductList/ProductList';
import ScrollTop from './components/ScrollToTop';
import Checkout from "./pages/Checkout/Checkout";
import Wish from "./pages/MyPage/MyShop/Wish";

import ProductCategory from "./pages/ProductList/ProductCategory";
// import NewList from './pages/ProductList/NewList';
// import ProductList from './pages/ProductList'

import PaymentConfirmation from './pages/Checkout/PaymentConfirmation';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 추적
  const [isAdmin, setIsAdmin] = useState(false); // 관리자 여부를 추적


  //장바구니
  const [cart, setCart] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(true);

  // 장바구니에 상품 추가
  const handleCart = () => {
    // setCart((prevCart) => [...prevCart, cartItem]);
  };

  // 장바구니 상품 가격 쉼표
  // const convertPrice = (productPriceFormatted) => {
  //   return productPriceFormatted;
  //   //.toString()
  //   //.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // };

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setIsLoggedIn(true);

      // 만약 관리자로 로그인한 경우에 isAdmin 상태를 true로 설정합니다.
      if (loggedInUser === 'admin') {
        setIsAdmin(true);
      }
    }
  }, []); // 컴포넌트가 마운트될 때만 실행되도록 빈 배열을 전달합니다.

  return (
    <div className="App">
      <BrowserRouter>

        <ScrollTop />
        {isLoggedIn && isAdmin && (
          <a href="http://localhost:8080/home">관리자 페이지</a>
        )}

        {isLoggedIn ? (
          <UserHeader setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <LoginHeader setIsLoggedIn={setIsLoggedIn} />
        )}
        <Routes>
          <Route path="/mypage/*" element={<MyPage />} />
          <Route path="/member/*" element={<Modify />} />
          <Route path="/mypage/mileage/*" element={<Mileage />} />
          <Route path="/mypage/wish/*" element={<Wish />} />
          <Route path="/store/*" element={<Store />} />
          <Route path="/order/*" element={<Order />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/member/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/" element={<Main />} />
          <Route path="/productDetail/:prod_num/*" element={<ProductDetail cart={cart} setCart={setCart} handleCart={handleCart} />} />
          <Route path="/productList/New/*" element={<New cart={cart} setCart={setCart} handleCart={handleCart} />} />
          <Route path="/productList/Best/*" element={<Best cart={cart} setCart={setCart} handleCart={handleCart} />} />
          <Route path="/productList/Chair/*" element={<Chair cart={cart} setCart={setCart} handleCart={handleCart} />} />
          <Route path="/productList/Sofa/*" element={<Sofa cart={cart} setCart={setCart} handleCart={handleCart} />} />
          <Route path="/productList/Bed/*" element={<Bed cart={cart} setCart={setCart} handleCart={handleCart} />} />
          <Route path="/productList/Bookshelf/*" element={<Bookshelf cart={cart} setCart={setCart} handleCart={handleCart} />} />
          <Route path="/productList/Closet/*" element={<Closet cart={cart} setCart={setCart} handleCart={handleCart} />} />
          <Route path="/productList/Lighting/*" element={<Lighting cart={cart} setCart={setCart} handleCart={handleCart} />} />

          {/* <Route path="/ProductList/ProductCategory/*" element={<ProductCategory cart={cart} setCart={setCart} handleCart={handleCart} />} /> */}


          <Route path="/cart/*" element={<Cart cart={cart} handleCart={handleCart}
            setCart={setCart} isAllChecked={isAllChecked} setIsAllChecked={setIsAllChecked} />} />
          <Route path="/member/join" element={<Join />} />
          {/* <Route path="/login/info/agree" element={<Agree />} />
          <Route path="/login/info/agree/popup" element={<Popup />} /> */}
          <Route path="/qna" element={<Qna />} />
          <Route path="/checkout" element={<Checkout cart={cart} />} />
          <Route path="/paymentconfirmation" element={<PaymentConfirmation cart={cart} />} />
        </Routes>
        <Footer />
        <TopButton />
      </BrowserRouter>
    </div>
  );
}

export default App;

