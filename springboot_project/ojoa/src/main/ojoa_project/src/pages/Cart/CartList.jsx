import '../../pages/Cart/Cart.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
// import { NavLink, Routes, Route, useParams, Link } from "react-router-dom"


const CartList = ({ cart, selectedItems, setSelectedItems }) => {
    
    useEffect(() => {
        const cartIds = cart.map(item => item.prod_num);
        setSelectedItems(cartIds);
    }, [cart, setSelectedItems]);
    
    
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
    // 상품 삭제 함수

 function Remove(itemId) {

    const productData = { prod_num: itemId};

    axios.delete('/api/cdelete/', productData)
        .then((response) => {
            // 삭제 요청이 성공하면 성공 메시지 출력 혹은 다른 작업 수행
            console.log("삭제 요청 성공:", response);
            alert('삭제 성공!');
            // 성공했을 때 필요한 작업 수행
            window.location.reload();
        })
        .catch((error) => {
            // 삭제 요청이 실패한 경우 에러 메시지 출력
            console.error("삭제 요청 실패:", error);
            alert('삭제 중 문제가 발생했습니다!');
        });
};


//=========================================================
const [quantity , setQuantity] = useState(cart.quantity);

function onIncrease(itemId) {
    const updatedCart = cart.map(item => {
        if (item.prod_num === itemId) {
            return { ...item, quantity: item.quantity + 1 };
        }
        return item;
    });

    setQuantity(updatedCart); // 'quantity' 상태 업데이트

    const productData = { prod_num: itemId, quantity: 1 }; // 변경된 수량 데이터
    axios.post('/api/cartUp', productData)
        .then(response => {
            alert('상품 수량이 증가되었습니다!');
            // 성공 시 수행할 작업 추가
        })
        .catch(error => {
            alert('장바구니 수량 변경 중 문제가 발생했습니다!');
        });
}



function onDecrease(itemId) {
    const updatedCart = cart.map(item => {
        if (item.prod_num === itemId && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
        }
        return item;
    });

    setQuantity(updatedCart); // 'quantity' 상태 업데이트

    // 만약 상품의 수량이 1 이상일 때만 서버에 변경된 수량을 보내도록 설정합니다.
    const itemToDecrease = updatedCart.find(item => item.prod_num === itemId);
    if (itemToDecrease && itemToDecrease.quantity !== cart.find(item => item.prod_num === itemId).quantity) {
        const productData = { prod_num: itemId, quantity: 1 }; // 변경된 수량 데이터
        axios.post('/api/cartDown', productData)
            .then(response => {
                alert('상품 수량이 감소되었습니다!');
                // 성공 시 수행할 작업 추가
            })
            .catch(error => {
                alert('장바구니 수량 변경 중 문제가 발생했습니다!');
            });
    } else {
        alert('더 줄일 수 없는 수량입니다.');
    }
}


//=========================================================

    return (
        <div className="CartListAll">
            {/* 장바구니에 있는 각 상품을 매핑하며 표시 */}
            {cart.map((item) => (
                <div className="CartList" key={item.prod_num}>
                    <table className="list_detail">
                        <tbody>
                            <tr key={item.prod_num}>
                                <td>

                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item.prod_num)}
                                        onChange={() => handleCheckboxChange(item.prod_num)}
                                    />

                                </td>

                                <td><img className="cart_img" src={`/thumbs/${item.imgNo}_1.jpg`} alt={`Product ${item.productName}`} /></td>
                                <td>
                                    <div className="cart_mininame" name="prod_content">[{item.prod_content}]</div>
                                    <td><a className="cart_mainname" name="prod_name" href="#">{item.prod_name}</a></td>
                                </td>
                                <td className="cart_saleprice">
                                    <sup>{item.productPromotion}&#37;&#8595;</sup>
                                    <div className="cart_li_price">{item.productPriceFormatted}원</div>
                                </td>
                                <td>
                                    <div className="cart_product_count">
                                        {/* <img
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
                                        /> */}
                                    <div className="pd_length">
                                        {/* <button onClick={() => onDecrease(item.prod_num, item.quantity)}>-</button> */}
                                        <button onClick={() => onDecrease(item.prod_num)}>-</button>
                                        <input name="quantity" type="number" min="1" value={item.quantity}/>
                                        <button onClick={() => onIncrease(item.prod_num)}>+</button>
                                        {/* <button onClick={onIncrease}>+</button> */}
                                    </div>
                                    </div>
                                </td>
                                <td>무료배송</td>
                                <td className="final_price">
                                    {(item.productPriceFormatted) * item.quantity}원
                                    <img
                                        src={"/images/cancel.png"}
                                        alt="delete"
                                        onClick={() => Remove(item.prod_num)}
                                        //onClick={Remove}
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