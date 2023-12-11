import React, { useState } from "react";
import "./ProductDetail.css";
import { Routes, Route, Link, useLocation } from "react-router-dom"
import DetailInfo01 from './DetailInfo01';
import OrderReview02 from './OrderReview02';
import ProdQna03 from './ProdQna03';
import PurGuide04 from './PurGuide04';
import Modal from 'react-modal';
import AddCart from './Modal/AddCart';
import axios from "axios";


function ProductDetailFromMain({ handleCart }) {
    // ProductListItem에서 데이터 받아오기 
    // 상품목록(ProductListItem)에서 오는 state값
    const location = useLocation();
    // const productData1 = location.state.productData1;
    const productData = location.state.productData;
    // 메인페이지(MiniItems)에서 오는 state값
    // const location2 = useLocation();
    // const productData2 = location2.state.productData2;

    // let productData = null;

    // if (productData1 === null) {
    //     productData = productData2;
    // } else if (productData2 === null) {
    //     productData = productData1;
    // }

    // else if (productData !== null && productData2 !== null) {
    //     // 두 데이터 모두 존재하는 경우 (우선순위를 정할 수도 있습니다)
    //     productData = {
    //         // dataA와 dataC를 필요에 따라 조합하여 dataB를 구성
    //     };
    // }

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
                alert('장바구니에 추가되었습니다!');
                // 추가 작업이 필요하다면 여기에 작성
            })
            .catch(error => {
                // 요청 실패 시 처리할 작업
                console.error('장바구니 추가 중 오류:', error);
                //alert('상품을 장바구니에 추가하는데 문제가 발생했습니다.');
            });
    }

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
    const sellPrice = parseInt(productData.prod_price1.toString().replace(/,/g, ''));
    const sum = count * sellPrice;
    const result = sum.toLocaleString();



    //======================================
    // 대표 썸네일 이미지 클릭시 변경
    const [mainImg, setMainImg] = useState(`${productData.prod_mainimage}`);
    //======================================
    // 대표 썸네일 이미지 클릭시 변경
    const imgChange = (e) => {
        setMainImg(e)
    };

    //======================================
    return (
        <div className="ProductDetail">
            <div className="path">
                <span>현재 위치</span>
                <ol>
                    <li><Link to="/">홈</Link></li>
                    <li><Link to="/ProductList">&gt; &nbsp;&nbsp;의자</Link></li>
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
                            <td className="price">{sellPrice}원</td>
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
                        <tr>
                            <th>옵션선택</th>
                            <td>
                                <select>
                                    <option>기본&#40; &#43;0  &#41;</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>배송비</th>
                            <td>무료배송</td>
                        </tr>
                        <tr>
                            <th>결제금액</th>
                            <td className="total"><strong>{result}</strong>원</td>
                        </tr>
                    </tbody>
                </table>

                <div className="pd_img">
                    <img src={productData.prod_mainimage} alt="" id="mainImg" />
                    <ul>
                        <li><img onClick={() => imgChange(`{productData.prod_mainimage}`)} src={`${productData.prod_mainimage}`} alt="" id="thumb1" /></li>
                        <li><img onClick={() => imgChange(`{productData.prod_mainimage}`)} src={`${productData.prod_mainimage}`} alt="" id="thumb2" /></li>
                        <li><img onClick={() => imgChange(`{productData.prod_mainimage}`)} src={`${productData.prod_mainimage}`} alt="" id="thumb3" /></li>
                        <li><img onClick={() => imgChange(`{productData.prod_mainimage}`)} src={`${productData.prod_mainimage}`} alt="" id="thumb4" /></li>
                    </ul>
                </div>

                <div className="pd_btns">
                    <a onClick={CartOpenModal} className="pd_btn1">장바구니</a>
                    <Modal className="ModalContent" handleCart={handleCart} isOpen={modalIsOpen} onRequestClose={closeModal}>
                        <AddCart closeModal={closeModal} AddToCart={AddToCart} />
                    </Modal>
                    <Link to='../Cart/Cart' className="pd_btn2" onClick={AddToCart}>구매하기</Link>
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
                        state={{ productData: productData }} activeClassName="active" >
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

export default ProductDetailFromMain;