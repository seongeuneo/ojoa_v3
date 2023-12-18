"use strict"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom"
import "./ProductListItem.css";

const ProductListItem = ({ content, onSelect, handleCart }) => {
    const sessionInfo = JSON.parse(sessionStorage.getItem('loggedInUser')); // 세션에서 로그인 정보 가져오기

    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태에 따른 nav바 변경

    // 세션 정보를 확인하여 로그인 상태를 설정하는 로직 추가
    useEffect(() => {
        const storedSessionInfo = sessionStorage.getItem('loggedInUser'); // 세션에서 로그인 정보 가져오기
        setIsLoggedIn(!!storedSessionInfo); // 세션 정보가 있으면 true, 없으면 false로 설정
    }, []);

    // 수량 변경한 만큼 가격에 계산
    const [count, setCount] = useState(1);

    // 관심상품 아이콘
    const [imageSrc, setImageSrc] = useState("/images/emptyheart.png"); // 초기 상태는 선택이 되지 않은 상태를 나타내기 위함
    const [isClicked, setIsClicked] = useState(false); // 클릭 여부를 state로 관리

    // 관심상품 아이콘
    const [wishSrc, setWishSrc] = useState("/images/emptyheart.png"); // 초기 상태는 선택이 되지 않은 상태를 나타내기 위함
    const [isWishClicked, setIsWishClicked] = useState(false); // 클릭 여부를 state로 관리

    const handleWishClick = () => {
        if (isWishClicked) {
            setWishSrc("/images/emptyheart.png");
            setIsWishClicked(false); // 초기 상태 false 일 땐 초기 상태 이미지 src
        } else {
            setWishSrc("/images/fullheart.png");
            setIsWishClicked(true); // true일 땐 변경될 이미지 src
            alert("해당 상품이 관심상품에 추가되었습니다.")
        }
    };


    // 1000단위 끊기
    const sellPrice = parseInt(content.prod_price1.toString().replace(/,/g, ''));
    const result = sellPrice.toLocaleString();

    /// ====================================================================================== 
    function AddWishIcon() {
        // 관심상품 이미지 클릭 시 실행되는 함수

        const productData = { prod_num: content.prod_num }; // 상품 정보를 담은 객체

        axios.post('/api/wish/saveWish', productData) // POST 요청으로 수정 및 상품 정보 전달
            .then(response => {
                // 요청 성공 시 처리할 작업
                console.log("관심상품 담기" + response.data);
                // const currentWishlist = response.data; // 현재 관심 상품 목록
                const currentWishlist = Array.isArray(response.data) ? response.data : [];
                const isProductExists = currentWishlist.some(item => item.prod_num == productData.prod_num);

                if (isProductExists) {
                    // 이미 관심목록에 있는 상품이라면 alert 창 띄우기
                    alert("이미 관심목록에 있는 상품입니다.");
                } else {
                    // prod_num이 중복되지 않는다면 상태 업데이트
                    console.log("서버연결성공 => ", currentWishlist);
                    alert("해당 상품이 관심상품에 추가되었습니다.");
                    handleWishClick();
                }
            })
            .catch(error => {
                // 요청 실패 시 처리할 작업
                console.error('관심상품 추가 중 오류:', error);
                // 에러 상태 코드에 따라 처리
                if (error.response && error.response.status === 400) {
                    alert("이미 관심목록에 있는 상품입니다.");
                } else {
                    // alert("상품을 관심목록에 추가하는데 문제가 발생했습니다.");
                }
            });

    };

    // 로그인 상태에 따라 AddWishIcon 함수 실행 여부 결정
    const handleWishIconClick = () => {
        if (isLoggedIn) {
            AddWishIcon(); // 로그인 상태라면 AddWishIcon 함수 실행
        } else {
            // 로그인되지 않은 상태에서는 원하는 동작을 수행하거나 에러를 처리할 수 있습니다.
            // 예를 들어, 로그인 팝업을 보여줄 수도 있습니다.
            // 에러 처리나 예외 처리를 하는 등의 작업을 수행하면 됩니다.
            console.log("사용자가 로그인되지 않았습니다. 관심 상품을 추가하려면 로그인하세요.");
        }
    };

    //============================= 여기서부터 워니의 코드 =================================


    // 장바구니 아이콘을 누르면 해당 상품이 장바구니에 추가 -----------------------------
    function AddToCart() {
        //const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        //const loginID = loggedInUser.id;
        //const productData = { prod_num: content.prod_num};
        //const productData = { prod_num: content.prod_num, quantity: 1, loginID: loginID }; 
        const productData = { prod_num: content.prod_num, quantity: 1 }; // 바로 구매시 수량은 1

        axios.post('/api/cart/saveCart', productData) // POST 요청으로 수정 및 상품 정보 전달
            .then(response => {
                // 요청 성공 시 처리할 작업
                console.log("장바구니 담기" + response.data);
                alert('장바구니에 추가되었습니다!');
                // 추가 작업이 필요하다면 여기에 작성
            })
            .catch(error => {
                // 요청 실패 시 처리할 작업
                console.error('장바구니 추가 중 오류:', error);
                alert('로그인 후 이용해 주세요.');
            });
    }

    //====================================== 여기까지 ========================================


    // 장바구니 아이콘
    const [cartSrc, setCartSrc] = useState("/images/cartEmpty.png"); // 초기 상태는 선택이 되지 않은 상태를 나타내기 위함
    const [isCartClicked, setIsCartClicked] = useState(false); // 클릭 여부를 state로 관리

    const handleCartClick = () => {
        if (isCartClicked) {
            setCartSrc("/images/cartEmpty.png");
            setIsCartClicked(false); // 초기 상태 false 일 땐 초기 상태 이미지 src
        } else {
            setCartSrc("/images/cartIFull.png");
            setIsCartClicked(true); // true일 땐 변경될 이미지 src
            alert("해당 상품이 장바구니에 추가되었습니다.")
        }
    };
    console.log("content.prod_mainimage => " + content.prod_mainimage);

    return (
        <div className="ProductListItem" onClick={onSelect}>
            <section className="pl_section">
                <ul className="prodItems">
                    <li className="pl_thumb_img">
                        <a>
                            <Link to={`/ProductDetail/${content.prod_num}/DetailInfo01`}
                                state={{ productData: content }} >
                                {/* 선택한 상품정보를 state로 값전달  */}
                                <img src={`${process.env.PUBLIC_URL}/thumbs/${encodeURIComponent(content.prod_mainimage)}`} alt={`Product ${content.prod_num}`} />
                            </Link>
                            <div className="pl_icon">
                                <a className="pd_cart">
                                    <img src={cartSrc}
                                        onClick={AddToCart}
                                        alt="장바구니"
                                    />
                                </a>
                                <a className="pd_heart">
                                    <img
                                        src={imageSrc}
                                        onClick={handleWishIconClick}
                                        alt="관심상품" />
                                </a>
                            </div>
                        </a>
                    </li>

                    <li className="pl_a"><a><Link to={`/ProductDetail/${content.prod_num}/DetailInfo01`}
                        state={{ productData: content }}>{content.prod_name}</Link></a></li>
                    <li className="pl_b"><a><Link to={`/ProductDetail/${content.prod_num}/DetailInfo01`}
                        state={{ productData: content }}>
                        {result}원
                        <span> {content.prod_discount}%</span>
                    </Link></a></li>
                    <li className="pl_c"><a><Link to={`/ProductDetail/${content.prod_num}/DetailInfo01`}
                        state={{ productData: content }}>{content.prod_content}</Link></a></li>
                    <li className="pl_d"><a><Link to={`/ProductDetail/${content.prod_num}/DetailInfo01`}
                        state={{ productData: content }}>리뷰 <span>{content.prod_grade}</span> 평점 *
                        <span>{content.prod_grade}/5</span></Link></a></li>
                </ul>
            </section >
        </div >
    )
}; //ProductList

export default ProductListItem;