"use strict"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom"
import "./ProductListItem.css";
import { Chair, Bed, Sofa, Closet, Bookshelf, Lighting, Best, New } from '../../data/ItemsData'

const ProductListItem = ({ content, onSelect, handleCart }) => {

    // 데이터 전달
    const navigate = useNavigate();

    //const productPrice = content.productPriceFormatted.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // 수량 변경한 만큼 가격에 계산
    const [count, setCount] = useState(1);

    // 관심상품 아이콘
    const [imageSrc, setImageSrc] = useState("/images/emptyheart.png"); // 초기 상태는 선택이 되지 않은 상태를 나타내기 위함
    const [isClicked, setIsClicked] = useState(false); // 클릭 여부를 state로 관리

    function AddWishIcon() {
        // 관심상품 이미지 클릭 시 실행되는 함수

        const productData = { prod_num: content.prod_num }; // 상품 정보를 담은 객체

        axios.post('/api/wish/saveWish', productData) // POST 요청으로 수정 및 상품 정보 전달
            .then(response => {
                // 요청 성공 시 처리할 작업
                console.log("관심상품 담기" + response.data);
                alert('관심상품에 추가되었습니다!!!');
                // 추가 작업이 필요하다면 여기에 작성
            })
            .catch(error => {
                // 요청 실패 시 처리할 작업
                console.error('관심상품 추가 중 오류:', error);
                alert('상품을 관심상품에 추가하는데 문제가 발생했습니다.');
            });

    };

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
            alert("해당 상품이 장바구니에 추가되었습니다.")
        }
    };


    //============================= 여기서부터 워니의 코드 =================================


    // 장바구니 아이콘을 누르면 해당 상품이 장바구니에 추가 -----------------------------
    function AddCartIcon() {
        const productData = { prod_num: content.prod_num }; // 상품 정보를 담은 객체

        axios.post('/api/cart/saveCart', productData) // POST 요청으로 수정 및 상품 정보 전달
            .then(response => {
                // 요청 성공 시 처리할 작업
                console.log("장바구니 담기" + response.data);
                alert('장바구니에 추가되었습니다!!!');
                // 추가 작업이 필요하다면 여기에 작성
            })
            .catch(error => {
                // 요청 실패 시 처리할 작업
                console.error('장바구니 추가 중 오류:', error);
                alert('상품을 장바구니에 추가하는데 문제가 발생했습니다.');
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

    // 장바구니 기능
    // 장바구니에 물건
    // const handleAddToCart = () => {
    //     const cartItem = {
    //         id: content.id,
    //         imgNo: content.imgNo,
    //         productName: content.productName,
    //         //productPriceFormatted: content.productPriceFormatted,
    //         productPromotion: content.productPromotion,
    //         productInfo: content.productInfo,
    //         productReview: content.productReview,
    //         productGrade: content.productGrade,
    //         quantity: content.count,
    //     };
    //     handleCart(cartItem);
    // };

    // function handleAddToCartAndhandleCartClickOld() {
    //     handleAddToCart();
    //     handleCartClick();
    // }

    return (
        <div className="ProductListItem" onClick={onSelect}>
            <section className="pl_section">
                <ul className="prodItems">
                    <li className="pl_thumb_img">
                        <a>
                            <Link to={`/ProductDetail/${content.prod_num}`}
                                state={{ productData: content }} >
                                {/* 선택한 상품정보를 state로 값전달  */}
                                <img src={`/thumbs/${content.prod_mainimage}_1.jpg`} alt={`Product ${content.prod_num}`} />
                            </Link>
                            <div className="pl_icon">
                                <a className="pd_cart">
                                    <img src={cartSrc}
                                        onClick={AddCartIcon}
                                        alt="장바구니"
                                    />
                                </a>
                                <a className="pd_heart">
                                    <img
                                        src={imageSrc}
                                        onClick={AddWishIcon}
                                        alt="관심상품" />
                                </a>
                            </div>
                        </a>
                    </li>

                    <li className="pl_a"><a><Link to={`/ProductDetail/${content.prod_num}`}
                        state={{ productData: content }}>{content.prod_name}</Link></a></li>
                    <li className="pl_b"><a><Link to={`/ProductDetail/${content.prod_num}`}
                        state={{ productData: content }}>
                        {content.prod_price1}원
                        <span> {content.prod_discount}%</span>
                    </Link></a></li>
                    <li className="pl_c"><a><Link to={`/ProductDetail/${content.prod_num}`}
                        state={{ productData: content }}>{content.prod_content}</Link></a></li>
                    <li className="pl_d"><a><Link to={`/ProductDetail/${content.prod_num}`}
                        state={{ productData: content }}>리뷰 <span>{content.prod_grade}</span> 평점 *
                        <span>{content.prod_grade}/5</span></Link></a></li>
                </ul>
            </section >
        </div >
    )


}; //ProductList

export default ProductListItem;