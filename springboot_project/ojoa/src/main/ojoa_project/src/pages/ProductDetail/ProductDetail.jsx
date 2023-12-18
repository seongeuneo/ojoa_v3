import React, { useState, useEffect, useLayoutEffect } from "react";
import "./ProductDetail.css";
import { Routes, Route, Link, useLocation, useParams, useNavigate } from "react-router-dom"
import DetailInfo01 from './DetailInfo01';
import OrderReview02 from './OrderReview02';
import ProdQna03 from './ProdQna03';
import PurGuide04 from './PurGuide04';
import Modal from 'react-modal';
import AddCart from './Modal/AddCart';
import axios from "axios";


function ProductDetail({ setCart}) {
    
    const location = useLocation();
    const { prod_num } = useParams();
    const productData = location.state ? location.state.productData : null;
    const recentItems = location.state ? location.state.recentItems : null;
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태에 따른 nav바 변경

    useEffect(() => {
     const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
     const loginID = loggedInUser.id;
    
    axios
    .get(`/api/recent/recentList?loginID=${loginID}`)
    .then((response) => {
        alert(`전송성공 : `, response.data);
    }).catch((error) => {
        alert(`최근 본 상품 실패`, error.message);
    })
}, []);
        
    
    // 세션 정보를 확인하여 로그인 상태를 설정하는 로직 추가
        useEffect(() => {
            const storedSessionInfo = sessionStorage.getItem('loggedInUser'); // 세션에서 로그인 정보 가져오기
            setIsLoggedIn(!!storedSessionInfo); // 세션 정보가 있으면 true, 없으면 false로 설정
        }, []);
    //======================================
    // 수량 변경한 만큼 가격에 계산
    const [count, setCount] = useState(1);
    
    //============================= 여기서부터 워니의 코드 =================================

    // 장바구니 아이콘을 누르면 해당 상품이 장바구니에 추가 -----------------------------
    function AddToCart() {
        //const prodData = { prod_num: productData.prod_num};
        const prodata = { prod_num: productData.prod_num, quantity: count }; // 바로 구매시 수량은 1

        axios.post('/api/cart/saveCart', prodata) // POST 요청으로 수정 및 상품 정보 전달
            .then(response => {
                // 요청 성공 시 처리할 작업
                //console.log("장바구니 담기" + response.data);
                const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
                const loginID = loggedInUser.id;
                
                axios
                .get(`/api/cart/allCartList?loginID=${loginID}`)
                .then((response) => {
                    setCart(response.data);
                    //window.location.reload();
                })
                .catch((error) => {
                    console.error("Error: ", error);
                });
                
                //alert('장바구니에 추가되었습니다!');
            })
            .catch(error => {
                // 요청 실패 시 처리할 작업
                console.error('장바구니 추가 중 오류:', error);
                //alert('상품을 장바구니에 추가하는데 문제가 발생했습니다.');
            });
    }


    // 모달 열기 함수
    const checkLogin = () => {

        if (isLoggedIn === true) {
            CartOpenModal();
        } else {
            alert('로그인이 필요합니다.');
        }
    };


    const AddOrder = () => {
        if (isLoggedIn === true) {
        navigate('/checkout', {
            state: {
                selectedCartItems: [{
                    imgNo: prod_image1,
                    prod_num: productData.prod_num,
                    prod_name: productData.prod_name,
                    quantity: count,
                    productPriceFormatted: productData.prod_price1
                }]
            }
        });
    } else {
        alert('로그인이 필요합니다.');
    }
    };

    //====================================== 여기까지 ========================================



    // // 장바구니 추가 모달창 띄우기
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    function CartOpenModal() {
        openModal();
    }

    //======================================
    // 수량 변경한 만큼 가격에 계산
    const onDecrease = () => {
        if (count >= 2) {
            setCount(count - 1);
        }
    }

    const onIncrease = () => {
        if (count >= 1) {

            setCount(count + 1);
        }
    }


    // 1000단위 끊기
    // const sellPrice = Array.isArray(productData) && productData.length > 0
    //     ? parseInt(productData[0].prod_price1.toString().replace(/,/g, ''))
    //     : 0;

    // const sellPrice1 = productData.prod_price1.toLocaleString();
    // const sum = sellPrice1 * sellPrice;
    var sellPrice = parseInt(productData.prod_price1.toString().replace(/,/g, ''));
    const sellPrice1 = sellPrice.toLocaleString();
    const sum = count * sellPrice;
    const result = sum.toLocaleString();

    console.log(sellPrice.type);
    //======================================
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('/api/prod_image/allProd_imageList')
            .then((response) => {
                setData(response.data);
                // console.log("서버연결성공 => ", response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    console.log(productData);

    // 해당하는 상품의 리뷰 필터링
    const matchingReviews = data.filter((image) => image.prod_num === productData.prod_num);
    // console.log("matchingReviews => " + JSON.stringify(matchingReviews));
    const prod_image1 = matchingReviews.map((test) => test.prod_image1);
    const prod_image2 = matchingReviews.map((test) => test.prod_image2);
    const prod_image3 = matchingReviews.map((test) => test.prod_image3);
    const prod_image4 = matchingReviews.map((test) => test.prod_image4);

    //======================================
    // 대표 썸네일 이미지 클릭시 변경
    const [mainImg, setMainImg] = useState(`/thumbs/${prod_image1}`);
    useEffect(() => {
        setMainImg(`/thumbs/${prod_image1}`);
    }, [`/thumbs/${prod_image1}`]);
    //======================================
    // 대표 썸네일 이미지 클릭시 변경
    const imgChange = (e) => {
        // 해당하는 이미지 배열의 첫 번째 요소를 가져와 mainImg를 변경합니다.
        setMainImg(e);
    };

    // 배송비 
    const deliveryCharge = sum > 100000 ? '무료배송' : '3000원';
    const totalSum = sum + (deliveryCharge === '3000원' ? 3000 : 0);

    //======================================
    return (
        <div className="ProductDetail">
            <div className="path">
                <span>현재 위치</span>
                <ol>
                    <li><Link to="/">홈</Link></li>
                    {/* <li><Link to="/ProductList">&gt; &nbsp;&nbsp;의자</Link></li> */}
                    <li title="현재 위치">&gt; &nbsp;&nbsp;현재 위치</li>
                </ol>
            </div>

            {/* <!-- main product detail --> */}
            {/* <!-- product detail dt 로 요약 --> */}
            <div className="product_view">
                <h2>{productData.prod_name}</h2>
                <table>
                    <caption>
                        <details className="hide">
                            <summary>상품정보</summary>
                            판매가&#44; 상품코드&#44; 옵션 및 결제금액 안내
                        </details>
                    </caption>

                    <tbody>
                        <tr>
                            <th>판매가</th>
                            <td className="price">{productData.prod_price1}원</td>
                        </tr>
                        <tr>
                            <th>상품코드</th>
                            <td>{productData.prod_num}</td>
                        </tr>
                        {/* 일단 kepp */}
                        {/* <tr>
                            <th>제조사/공급사</th>
                            <td>OJOA &#47; 오조아생활연구소</td>
                        </tr> */}
                        <tr>
                            <th>구매수량</th>
                            <td>
                                <div className="pd_length">
                                    <button onClick={onDecrease}>-</button>
                                    <input type="number" min="1" value={count} />
                                    <button onClick={onIncrease}>+</button>
                                </div>
                            </td>
                        </tr>
                        {/* 일단 kepp */}
                        {/* <tr>
                            <th>사용가능쿠폰</th>
                            <td>
                                <select>
                                    <option>-</option>
                                     <option>신규가입쿠폰 5%</option> 
                                </select>
                            </td>
                        </tr> */}
                        {/* <tr>
                            <th>옵션선택</th>
                            <td>
                                <select>
                                    <option>기본&#40; &#43;0  &#41;</option>
                                </select>
                            </td>
                        </tr> */}
                        <tr>
                            <th>배송비</th>
                            <td>{deliveryCharge}</td>
                        </tr>
                        <tr>
                            <th>결제금액</th>
                            <td className="total"><strong>{totalSum}</strong>원</td>
                        </tr>
                    </tbody>
                </table>

                <div className="pd_img">
                    <img src={mainImg} alt="" id="mainImg" />
                    <ul>
                        <li><img onClick={() => imgChange(`/thumbs/${prod_image1}`)} src={`/thumbs/${prod_image1}`} alt="" id="thumb1" /></li>
                        <li><img onClick={() => imgChange(`/thumbs/${prod_image2}`)} src={`/thumbs/${prod_image2}`} alt="" id="thumb2" /></li>
                        <li><img onClick={() => imgChange(`/thumbs/${prod_image3}`)} src={`/thumbs/${prod_image3}`} alt="" id="thumb3" /></li>
                        <li><img onClick={() => imgChange(`/thumbs/${prod_image4}`)} src={`/thumbs/${prod_image4}`} alt="" id="thumb4" /></li>
                    </ul>
                </div>

                <div className="pd_btns">
                    <a onClick={()=> {checkLogin();  }} className="pd_btn1">장바구니</a>
                    <Modal className="ModalContent"  isOpen={modalIsOpen} onRequestClose={closeModal}>
                        <AddCart closeModal={closeModal} AddToCart={AddToCart} />
                    </Modal>
                    <a className="pd_btn2" onClick={AddOrder}>구매하기</a>
                </div>
            </div>
            <div className="PdIndex00">
                <div className="pd_section">
                    <a><Link to={`/productDetail/${productData.prod_num}/DetailInfo01`}
                        state={{ productData: productData }} activeClassName="active" exact>
                        <strong>상품상세정보</strong></Link></a>
                    <a><Link to={`/productDetail/${productData.prod_num}/OrderReview02`}
                        state={{ productData: productData }} activeClassName="active" >
                        <strong>상품구매후기</strong></Link></a>
                    <a><Link to={`/productDetail/${productData.prod_num}/ProdQna03`}
                        state={{ productDat처a: productData }} activeClassName="active" >
                        <strong>상품 Q&amp;A</strong></Link></a>
                    <a><Link to={`/productDetail/${productData.prod_num}/PurGuide04`}
                        state={{ productData: productData }} activeClassName="active" >
                        <strong>상품구매안내</strong></Link></a>
                </div>
            </div>

            <Routes>
                <Route path="/*" element={<DetailInfo01 />} />
                <Route path="/OrderReview02/*" element={<OrderReview02 />} />
                <Route path="/ProdQna03/*" element={<ProdQna03 />} />
                <Route path="/PurGuide04/*" element={<PurGuide04 />} />
            </Routes>
        </div >

    )
};

export default ProductDetail;