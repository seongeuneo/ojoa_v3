import "../MyPage/MyPage.css";
//import { Link } from 'react-router-dom';
import React from "react";
import { mileageInfoList } from "./MyShop/Mileage";

const AsyncBankBook = () => {

    // const handleLinkClick = () => {
    //     alert('해당 페이지는 현재 준비중 입니다.');
    // };

    const availableMileageInfo = mileageInfoList.find(info => info.title === '사용가능 적립금 : ');
    const totalMileageInfo = mileageInfoList.find(info => info.title === '총 적립금 : ');
    const usedMileageInfo = mileageInfoList.find(info => info.title === '사용된 적립금 : ');
    const depositInfo = mileageInfoList.find(info => info.title === '미가용 적립금 : ');

    return (
        <div className="container">
            <div className="myshop_asyncbankbook">
                <div className="sub_title">
                    <h2 id="h2_p">MY <span>PAGE</span></h2>
                    <p id="h2_p">마이페이지</p>
                </div>
                <ul>
                    <li>
                        <strong className="title">가용적립금</strong>
                        <strong className="data">{availableMileageInfo.bank}</strong>
                        {/* <Link to='/MyPAge/Mileage'><button className="btnNormal">조회</button></Link> */}
                    </li>
                    <li>
                        <strong className="title">총적립금</strong>
                        <strong className="data">{totalMileageInfo.bank}</strong>
                    </li>
                    <li>
                        <strong className="title">사용적립금</strong>
                        <strong className="data">{usedMileageInfo.bank}</strong>
                    </li>
                    {/* <li>
                        <strong className="title">예치금</strong>
                        <strong className="data">{depositInfo.bank}</strong>
                        <button onClick={handleLinkClick} className="btnNormal" >조회</button>
                    </li> */}
                    <li>
                        <strong className="title">총주문</strong>
                        <strong className="data">0원 (0회)</strong>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default AsyncBankBook;

