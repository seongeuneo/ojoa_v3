import React from 'react';
import './PaymentConfirmation.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Cart from '../Cart/Cart';

const PaymentConfirmation = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const displayedCartList = location.state.displayedCartList;
    const orderInfo = location.state.orderInfo;
    const orders = location.state.Orders;
    let totalQuantity = 0
    // const { orderInfo, cart } = location.state || {};


    // 전체 수량
    displayedCartList.map((item) => {
        totalQuantity += item.quantity
    })

    const formatNumber = (num) => {
        return Intl.NumberFormat().format(num)
    }


    return (
        <div className="PaymentConfirmation">
            <h2>결제 완료</h2>
            <p>결제가 성공적으로 완료되었습니다.</p>

            {/* <h1>주문번호: {orderInfo.orders_num}</h1> */}

            <h3>주문 내역</h3>
            <table className='table orders'>
                <tr>
                    <td style={{ width: '100px' }}>주문번호</td>
                    {/* <td></td> */}
                    <td style={{ width: '100px', textAlign: 'center' }}>{orderInfo.orders_num}</td>
                </tr>
            </table>
            <table className='table orders'>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>단가</th>
                        <th>가격</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedCartList.map((item, index) => (

                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.prod_name}</td>
                            <td>{item.quantity}</td>
                            <td>₩ {item.dispalyedPrice}</td>
                            <td>₩ {item.displayedTotalPrice}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td>total</td>
                        <td></td>
                        <td>{totalQuantity}</td>
                        <td>총 결제 금액 : </td>
                        <td>₩ {formatNumber(orderInfo.orders_price)}</td>
                    </tr>
                </tfoot>
            </table>


            <h3>배송지 정보</h3>

            <table className='table orders'>
                <thead>
                    <tr>
                        <th>받는사람</th>
                        <td>{orderInfo?.shipping_name}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>전화번호</th>
                        <td>{orderInfo?.shipping_phone}</td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td>
                            ({orderInfo?.shipping_zipcode})
                            {orderInfo?.shipping_address} {orderInfo?.shipping_addressdetail}
                        </td>
                    </tr>
                </tbody>
            </table>

            <p>
                고객님의 주문이 성공적으로 처리되었습니다.  <br />
                추가 문의 사항이나 궁금한 사항이 있으시면 언제든지 고객 센터로 문의해 주세요.
            </p>

            <div className="btn-box">
                <div className="item">
                    <button className='btn' onClick={() => navigate("/Order")}>주문 상세 보기</button>
                </div>
                <div className="item">
                    <button className='btn btn-pt' onClick={() => navigate("/")}>쇼핑 계속 하기</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentConfirmation;