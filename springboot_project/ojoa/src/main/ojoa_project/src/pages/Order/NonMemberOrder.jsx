import '../Order/NonMemberOrder.css';
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NonMemberOrder = () => {
    const navigate = useNavigate(); // useNavigate  훅 사용

    const [orderNumber, setOrderNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleNonMemeberOrder = () => {
        const loginData = {
            orderNumber: orderNumber,
            password: password
        };

        axios
            .get("/api/order/nonMemberOrder", { params: loginData })
            .then((response) => {
                console.log(response);
                let orderData = response.data;
                if (orderData != null && orderData !== "") {
                    navigate('/order/Order', { state: { orderData, orderNumber } });
                } else {
                    alert('주문 내역이 없습니다.');
                }
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    };

    return (
        <div>

            <div className="member_path">
                <span>현재 위치</span>
                <ol>
                    <li><Link to="/">홈</Link></li>
                    <li title="현재 위치"> &gt; 비회원 주문 조회</li>
                </ol>
            </div>
            <div className="member_title">
                <h2>비회원 주문 조회</h2>
                <div className="txt_01">주문 번호와 주문 비밀번호를 입력하세요.</div>
            </div>
            <main className="member_page">
                <div className="member_container">
                    <form>
                        <div className="member_content">
                            <div className="login">
                                <fieldset className="member_fieldset">
                                    <legend>비회원 주문 조회</legend>
                                    <label className="member_id">
                                        <span><img src="../images/check.png" alt="주문번호" />
                                        </span>
                                        <input type="text"
                                            placeholder="주문번호"
                                            minLength="3"
                                            value={orderNumber}
                                            onChange={(e) => setOrderNumber(e.target.value)}
                                        />
                                    </label>
                                    <label className="member_password">
                                        <span><img src="../images/password.png" alt="비밀번호" /></span>
                                        <input type="password"
                                            placeholder="비밀번호"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </label>
                                    <div className="member_btn">
                                        <button type="button" onClick={handleNonMemeberOrder}>주문 확인</button>
                                    </div>
                                    <div className="member_cboth"></div>
                                </fieldset>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
            <hr className="layout" />
        </div>
    ); //return
}

export default NonMemberOrder;