import '../MyShop/Mileage.css';
import React, { useState } from 'react';
import Pagination from '../../../components/Pagination/Pagination';

function MileageCouponList() {

    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 상태 추가

    // 페이지 변경 핸들러
    const handlePageChange = (page) => {
        // 페이지 변경 시 현재 페이지 업데이트
        setCurrentPage(page);
    };

    return (
        <div className='MileageCouponList'>
            <div id='wrap'>
                <div id='container'>
                    <div id='contents'>

                        <div className='CouponList_inside'>
                            <div className='Base_Table_TypeList'>
                                <table border="1" summary>
                                    <thead><tr>
                                        <th scope="col">주문날짜</th>
                                        <th scope="col">미가용 쿠폰</th>
                                        <th scope="col">관련 주문</th>
                                        <th scope="col">사용가능 예정일</th>
                                        <th scope="col">내용</th>
                                    </tr>
                                    </thead>
                                    <tbody className=" center">
                                        <tr className="ec-base-table">
                                            <td>2023-06-07</td>
                                            <td className="right">5,000원</td>
                                            <td>철의 왕좌</td>
                                            <td className="left">2023-09-08</td>
                                            <td className="left">킹쿤타 회원 (VIP)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <Pagination currentPage={currentPage} totalPages={1} onPageChange={handlePageChange} />
                </div>
            </div>
        </div>
    )
}

export default MileageCouponList;