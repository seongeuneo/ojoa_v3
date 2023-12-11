import React, { useEffect } from 'react';
import '../MyShop/Mileage.css';
import { NavLink, Routes, Route, useParams, Link } from 'react-router-dom';
import MileageHistoryList from './MileageHistoryList';
import MileageUnavailList from './MileageUnavailList';
//import MileageCouponList from './MileageCouponList';
import MileageHelp from './MileageHelp';

class MileageInfo {
    constructor(title, bank) {  //생성자
        this.title = title;
        this.bank = bank;
    }
}

export const mileageInfoList = [
    new MileageInfo("총 적립금 : ", "0원"),
    new MileageInfo("사용가능 적립금 : ", "0원"),
    new MileageInfo("사용된 적립금 : ", "0원"),
    new MileageInfo("미가용 적립금 : ", "0원"),
    new MileageInfo("환불예정 적립금 : ", "0원"),
];

function Mileage() {

    return (
        <div className='Mileage'>
            <div id='wrap'>
                <div id='container'>
                    <div id='contents'>
                        <div className="path">
                            <span></span>
                            <ol>
                                <li><Link to="/">홈</Link></li>
                                <li><Link to="/MyPage">&gt; &nbsp;&nbsp;마이쇼핑</Link></li>
                                <li title="현재 위치">&gt; &nbsp;&nbsp;적립금</li>
                            </ol>
                        </div>
                        <div>
                            <div className='headTltleArea'>
                                <h2>적립금</h2>
                            </div>
                            <div className='BaseBox'>
                                <ul>
                                    {mileageInfoList.map((mileageInfo, index) => (
                                        <li key={index}>
                                            <strong className='title'>{mileageInfo.title}</strong>
                                            <span className='data'>
                                                <span>&nbsp;{mileageInfo.bank}</span>
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='ec-base-tab'>
                <ul className='menu'>
                    <li><a><NavLink to="./pages/MyPage/MyShop/MileageHistoryList">적립내역보기</NavLink></a></li>
                    <li className='selected'><a><NavLink to="./pages/MyPage/MyShop/MileageUnavailList">미가용적립내역보기</NavLink></a></li>
                    {/* <li><a><NavLink to="./pages/MyPage/MyShop/MileageCouponList">미가용쿠폰/회원등급적립내역</NavLink></a></li> */}
                </ul >
            </div >
            

            <Routes>
                <Route path="/pages/mypage/myshop/mileagehistorylist" element={<MileageHistoryList />} />
                <Route path="/pages/mypage/myshop/mileageunavaillist" element={<MileageUnavailList />} />
                {/* <Route path="/pages/mypage/myshop/mileagecouponlist" element={<MileageCouponList />} /> */}
            </Routes>

            <MileageHelp />
        </div >
    );
};

export default Mileage;