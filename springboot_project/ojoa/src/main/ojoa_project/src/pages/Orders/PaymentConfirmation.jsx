import React from 'react';
import { Link } from 'react-router-dom';
import './PaymentConfirmation.css';

const PaymentConfirmation = ({ totalCheckoutPrice, cart }) => {
    return (
        <div className="PaymentConfirmation">
            <h2>결제 완료</h2>
            <p>결제가 성공적으로 완료되었습니다.</p>

            <h3>주문 번호</h3>
            {/* 주문번호 생성해야하는데 어떻게 해야하지??? */}

            <h3>주문 내역</h3>
            {/* 주문정보, 배송지정보 */}
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

            <div className="payment_button_container">
                <div className="payment_btn_cart">
                    <Link to="/cart" className="go_cartlist_button">
                        장바구니로 돌아가기
                    </Link>
                </div>
                <div className="payment_btn_home">
                    <Link to="/" className="go_home_button">
                        홈으로 가기
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default PaymentConfirmation;