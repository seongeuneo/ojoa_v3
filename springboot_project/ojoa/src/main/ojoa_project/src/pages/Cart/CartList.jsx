import '../../pages/Cart/Cart.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
// import { NavLink, Routes, Route, useParams, Link } from "react-router-dom"




const CartList = ({ cart, onDecrease, onIncrease, convertPrice, selectedItems, setSelectedItems }) => {

    //handleCheckboxChange: 아이템의 체크박스 선택 상태를 관리하는 함수로, 
    //선택한 아이템을 selectedItems에 추가 또는 제거
    const handleCheckboxChange = (itemId) => {
        setSelectedItems(prevSelectedItems => {
            if (prevSelectedItems.includes(itemId)) {
                // 이미 선택되었던 아이템을 선택 해제
                return prevSelectedItems.filter(id => id !== itemId);
            } else {
                // 새로운 아이템을 선택
                return [...prevSelectedItems, itemId];
            }
        });
    };

// 장바구니 삭제 코드 ==============

 // axios를 사용하여 DELETE 요청 보내기
 function Remove(prod_num) {

    let url = '/api/cdelete/' + prod_num;

    axios.delete(url)
        .then((response) => {
            // 삭제 요청이 성공하면 성공 메시지 출력 혹은 다른 작업 수행
            console.log("삭제 요청 성공:", response);
            // 성공했을 때 필요한 작업 수행
            window.location.reload();
        })
        .catch((error) => {
            // 삭제 요청이 실패한 경우 에러 메시지 출력
            console.error("삭제 요청 실패:", error);
        });
};


//================================



    return (
        <div className="CartListAll">
            {/* 장바구니에 있는 각 상품을 매핑하며 표시 */}
            {cart.map((item) => (
                <div className="CartList">
                    <table className="list_detail">
                        <tbody>
                            <tr key={item.id}>
                                <td>

                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item.id)}
                                        onChange={() => handleCheckboxChange(item.id)}
                                    />

                                </td>

                                <td><img className="cart_img" src={`/thumbs/${item.imgNo}_1.jpg`} alt={`Product ${item.productName}`} /></td>
                                <td>
                                    <div className="cart_mininame" name="prod_content">[{item.prod_content}]</div>
                                    <td><a className="cart_mainname" name="prod_name" href="#">{item.prod_name}</a></td>
                                </td>
                                <td className="cart_saleprice">
                                    <sup>{item.productPromotion}&#37;&#8595;</sup>
                                    <div className="cart_li_price">{convertPrice(item.productPriceFormatted)}원</div>
                                </td>
                                <td>
                                    <div className="cart_product_count">
                                        <img
                                            className="minus"
                                            src={"../images/newminus.png"}
                                            alt="minus"
                                            onClick={() => onDecrease(item.id)}
                                        />
                                        <div className="count" name="quantity">
                                            <span>{item.quantity}</span>
                                        </div>
                                        <img
                                            className="plus"
                                            src={"../images/newplus.png"}
                                            alt="plus"
                                            onClick={() => onIncrease(item.id)}
                                        />
                                    </div>
                                </td>
                                <td>무료배송</td>
                                <td className="final_price">
                                    {convertPrice((item.productPriceFormatted) * item.quantity)}원
                                    <img
                                        src={"/images/cancel.png"}
                                        alt="delete"
                                        onClick={() => Remove(item.id)}
                                        className="product_remove"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default CartList;