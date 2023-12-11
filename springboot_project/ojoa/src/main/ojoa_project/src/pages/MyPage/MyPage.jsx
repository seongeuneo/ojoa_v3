import React from 'react';
import '../../pages/MyPage/MyPage.css';
import ThumbNail from '../../pages/MyPage/ThumbNail';
import AsyncBankBook from '../../pages/MyPage/AsyncBankBook';
import OrderState from '../../pages/MyPage/OrderState';
import MyshopMain from '../../pages/MyPage/MyshopMain';

function MyPage() {

    return (
        <div className="MyPage">
            <ThumbNail />
            <AsyncBankBook />
            <OrderState />
            <MyshopMain />
        </div>
    );
};

export default MyPage;