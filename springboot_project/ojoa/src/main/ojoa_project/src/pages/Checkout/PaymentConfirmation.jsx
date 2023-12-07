import React from 'react';
import './PaymentConfirmation.css';

const PaymentConfirmation = ({ totalCheckoutPrice, cart }) => {
    return (
        <div className="PaymentConfirmation">
            <h2>결제 완료</h2>
            <p>결제가 성공적으로 완료되었습니다.</p>

            <h3>주문 내역</h3>
            <ul>
                {cart.map((item, index) => (
                    <li key={item.id}>
                        {index + 1}. {item.productName} - {item.displayedTotalPrice}원
                    </li>
                ))}
            </ul>

            <h3>총 결제 금액</h3>
            <p>{totalCheckoutPrice}원</p>

            <p>감사합니다!</p>
        </div>
    );
};

export default PaymentConfirmation;