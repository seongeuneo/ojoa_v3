import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom"
import "./ProductListItem.css";
import { Chair, Bed, Sofa, Closet, Bookshelf, Lighting, Best, New } from '../../data/ItemsData'

const ProductListItem = ({ content, onSelect, handleCart }) => {
    // Spring Boot 연결
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('/api/productList')
            .then((response) => {
                setData(response.data);
                console.log("서버연결성공 => ", response.data);
            }).catch((error) => {
                console.log(error)
            });
    }, []);

    const productPrice = content.productPriceFormatted.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // 수량 변경한 만큼 가격에 계산
    const [count, setCount] = useState(1);

    // 관심상품 아이콘
    const [imageSrc, setImageSrc] = useState("/images/emptyheart.png"); // 초기 상태는 선택이 되지 않은 상태를 나타내기 위함
    const [isClicked, setIsClicked] = useState(false); // 클릭 여부를 state로 관리

    const handleClick = () => {
        if (isClicked) {
            setImageSrc("/images/emptyheart.png");
            setIsClicked(false); // 초기 상태 false 일 땐 초기 상태 이미지 src
        } else {
            setImageSrc("/images/fullheart.png");
            setIsClicked(true); // true일 땐 변경될 이미지 src
            alert("해당 상품이 관심상품에 추가되었습니다.")
        }
    };

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
    const handleAddToCart = () => {
        const cartItem = {
            id: content.id,
            imgNo: content.imgNo,
            productName: content.productName,
            productPriceFormatted: content.productPriceFormatted,
            productPromotion: content.productPromotion,
            productInfo: content.productInfo,
            productReview: content.productReview,
            productGrade: content.productGrade,
            quantity: content.count,
        };
        handleCart(cartItem);
    };

    function handleAddToCartAndhandleCartClick() {
        handleAddToCart();
        handleCartClick();
    }


    return (
        <div className="ProductListItem" onClick={onSelect}>
            <section className="pl_section">
                <ul className="prodItems">
                    <li className="pl_thumb_img">
                        <a>
                            {data.map((item) =>
                                item.prod_name)}
                            <Link to={{
                                key: content.id,
                                pathname: `/ProductDetail/${content.id}`,
                                state: { productData: content } // 선택한 상품 정보를 state로 전달
                            }}>
                                <img src={`/thumbs/${content.imgNo}_1.jpg`} alt={`Product ${content.productName}`} />
                            </Link>
                            <div className="pl_icon">
                                <a className="pd_cart">
                                    <img src={cartSrc}
                                        onClick={handleAddToCartAndhandleCartClick}
                                        alt="관심상품"
                                    />
                                </a>
                                <a className="pd_heart">
                                    <img
                                        src={imageSrc}
                                        onClick={handleClick}
                                        alt="관심상품" />
                                </a>
                            </div>
                        </a>
                    </li>

                    <li className="pl_a"><a><Link to={{
                        key: content.id,
                        pathname: `/ProductDetail/${content.id}`,
                        state: { productData: content }
                    }}>{content.productName}</Link></a></li>
                    <li className="pl_b"><a><Link to={{
                        key: content.id,
                        pathname: `/ProductDetail/${content.id}`,
                        state: { productData: content }
                    }}>{productPrice}원
                        <span> {content.productPromotion}%</span></Link></a></li>
                    <li className="pl_c"><a><Link to={{
                        key: content.id,
                        pathname: `/ProductDetail/${content.id}`,
                        state: { productData: content }
                    }}>{content.productInfo}</Link></a></li>
                    <li className="pl_d"><a><Link to={{
                        key: content.id,
                        pathname: `/ProductDetail/${content.id}`,
                        state: { productData: content }
                    }}>리뷰 <span>{content.productReview}</span> 평점 *
                        <span>{content.productGrade}/5</span></Link></a></li>
                </ul>
            </section>
        </div >
    )


}; //ProductList

export default ProductListItem;