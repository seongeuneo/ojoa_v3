import React, { useState, useEffect } from "react";
import "./Order.css";
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Order() {
    const location = useLocation();
    const { orderData, orderNumber } = location.state || {};
    const [orderList, setOrderList] = useState([]);

    const [searchConditions, setSearchConditions] = useState({
        startDate: '',
        endDate: '',
        orderNumber: orderNumber
    });

    function formatDate(originalDate) {
        const dateObject = new Date(originalDate);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        const hours = String(dateObject.getHours()).padStart(2, '0');
        const minutes = String(dateObject.getMinutes()).padStart(2, '0');

        return `${year}.${month}.${day} ${hours}:${minutes}`;
    }

    function orderResultConvert(orderResult) {
        let result = "";
        if (orderResult === 'B') {
            result = "배송 준비 중";
        } else if (orderResult === 'C') {
            result = "배송 중";
        }

        return result;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchConditions({ ...searchConditions, [name]: value });
    };

    const allOrderList = () => {
        axios
            .get("/api/order/orderList")
            .then((response) => {
                setOrderList(response.data);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    };

    const searchOrderList = () => {
        const reqData = {
            startDate: searchConditions.startDate,
            endDate: searchConditions.endDate,
            orderNumber: searchConditions.orderNumber
        };

        axios
            .get("/api/order/orderList", { params: reqData })
            .then((response) => {
                setOrderList(response.data);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    };

    useEffect(() => {
        if (orderData == null || orderData === '') {
            allOrderList();
        } else {
            setOrderList(orderData);
        }
    }, []);
    return (
        <div className="Order">
            <div className="path">
                <span>현재 위치</span>
                <ol>
                    <li><Link to="/">홈</Link></li>
                    <li title="현재 위치">&gt; &nbsp;&nbsp;Order</li>
                </ol>
            </div>
            <div className="pageTlt">
                <h2>ORDER</h2>
                <div className="txt_01">주문내역조회</div>
            </div>
            {/*  주문조회페이지/order페이지  */}
            <div className="container">
                {/*  order = od로 요약  */}
                <div id="od_backbody">
                    <div id="od_frame">
                        <form>
                            <br />
                            <div id="od_search">
                                <div>
                                    {/* <select>
                                        <option>전체 주문처리상태</option>
                                        <option>입금전</option>
                                        <option>배송준비중</option>
                                        <option>배송중</option>
                                        <option>배송완료</option>
                                        <option>취소</option>
                                        <option>교환</option>
                                        <option>반품</option>
                                    </select>&nbsp; */}
                                    {!orderNumber ? (
                                        <>
                                            <input type="date" name="startDate" onChange={handleInputChange} /> ~ <input type="date" name="endDate" onChange={handleInputChange} />&nbsp;
                                            <button type="button" onClick={searchOrderList}>조회</button>
                                        </>
                                    ) : (
                                        <>
                                        </>
                                    )}

                                </div>

                                <ol>
                                    <li>기본적으로 최근 3개월간의 자료가 조회되며, 기간 검색시 지난 주문내역을 조회하실 수 있습니다.</li>
                                    <li>주문번호를 클릭하시면 해당 주문에 대한 상세내역을 확인하실 수 있습니다.</li>
                                    <li>취소/교환/반품 신청은 주문완료일 기준 30일까지 가능합니다.</li>
                                </ol>
                            </div>

                            <br /><br />

                            <span>주문 상품 정보</span>
                            <table id="od_productInfo">
                                <thead>
                                    <tr>
                                        <th className="od_number">주문일자<br />[주문번호]</th>
                                        <th>이미지</th>
                                        <th>상품정보</th>
                                        <th className="od_amount">수량</th>
                                        <th>상품구매금액</th>
                                        <th>주문처리상태</th>
                                        <th>취소/교환/반품</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orderList.length > 0 ? (
                                        orderList.map((item, i) => (
                                            <React.Fragment key={i}>
                                                {
                                                    <tr>
                                                        <td>
                                                            <div>{formatDate(item.orders_indate)}</div>
                                                            <div>[{item.orders_num_confirm}]</div>
                                                        </td>
                                                        <td>
                                                            <div><img src={`../thumbs/${item.prod_mainimage}_1.jpg`} alt='상품' /></div>
                                                        </td>
                                                        <td>{item.prod_name}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{item.ordersdt_totalprice}</td>
                                                        <td>{orderResultConvert(item.ordersdt_result)}</td>
                                                        <td></td>
                                                    </tr>
                                                }
                                            </React.Fragment>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="od_no_content" colSpan={7}>
                                                주문 내역이 없습니다.
                                            </td>
                                        </tr>)}
                                </tbody>
                            </table>



                        </form>
                    </div>
                </div>

            </div>

        </div>

    )
};

export default Order;