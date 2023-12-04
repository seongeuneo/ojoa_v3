import '../../pages/Cart/Cart.css';
import React, { useState, useEffect } from "react";
// import { NavLink, Routes, Route, useParams, Link } from "react-router-dom"




const CartList = ({ cart, onDecrease, onIncrease, handleRemove, convertPrice, selectedItems, setSelectedItems }) => {

    //handleCheckboxChange: 아이템의 체크박스 선택 상태를 관리하는 함수로, 
    //선택한 아이템을 selectedItems에 추가 또는 제거
    const CheckboxChange = (itemId) => {
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



    return (
        <div className="CartListAll" >
            {/* 장바구니에 있는 각 상품을 매핑하며 표시 */}
            {cart.map((item) => (
                <div className="CartList">
                    <table className="list_detail" name="cart">
                        <tbody>
                            <tr key={item.id} name="prod_num">
                                <td>

                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item.id)}
                                        onChange={() => CheckboxChange(item.id)}
                                    />

                                </td>

                                <td><img className="cart_img" name="prod_mainimage" src={`/thumbs/${item.imgNo}_1.jpg`} alt={`Product ${item.productName}`} /></td>
                                <td>
                                    <div className="cart_mininame" name="prod_content">[{item.productInfo}]</div>
                                    <td><a className="cart_mainname" name="prod_name" href="#">{item.productName}</a></td>
                                </td>
                                <td className="cart_saleprice" name="prod_discount">
                                    <sup>{item.productPromotion}&#37;&#8595;</sup>
                                    <div className="cart_li_price" name="prod_price1">{convertPrice(item.productPriceFormatted)}원</div>
                                </td>
                                <td>
                                    <div className="cart_product_count" name="quantity">
                                        <img
                                            className="minus"
                                            src={"../images/newminus.png"}
                                            alt="minus"
                                            onClick={() => onDecrease(item.id)}
                                        />
                                        <div className="count">
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
                                        onClick={() => handleRemove(item.id)}
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