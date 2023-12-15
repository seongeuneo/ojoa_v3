import React from 'react';
import './PaymentConfirmation.css';
import { useLocation } from 'react-router-dom';
import Cart from '../Cart/Cart';

const PaymentConfirmation = () => {
    const location = useLocation();
    const { orderData, cart } = location.state || {};

    return (
        <div className="PaymentConfirmation">
            <h2>결제 완료</h2>
            <p>결제가 성공적으로 완료되었습니다.</p>

            {/* <h1>주문번호: {orderData.orders_num_confirm}</h1> */}

            <h3>주문 내역</h3>
            {/* <ul>
                {cart.map((item, index) => (
                    <li key={item.prod_num}>
                        {index + 1}. {item.prod_name} - {item.productPriceFormatted * item.quantity}원
                    </li>
                ))}
            </ul> */}
{/* 
            <h3>총 결제 금액</h3>
            <p>{orderData.orders_price}원</p> */}

            <p>감사합니다!</p>
        </div>
    );
};

export default PaymentConfirmation;