import '../MyShop/Mileage.css';
import React, { useState } from 'react';
import Pagination from '../../../components/Pagination/Pagination';

// class MileageHistoryListInfo {
//     constructor(date, mileage, order, info) {  //생성자
//         this.date = date;
//         this.mileage = mileage;
//         this.order = order;
//         this.info = info;
//     }
// }

// export const mileageHistoryList = [
//     new MileageHistoryListInfo("2023-05-04 : ", "1,000원", " ", "신규회원 적립금"),
//     new MileageHistoryListInfo("2023-05-04 : ", ",원", " ", "신규회원 적립금"),
//     new MileageHistoryListInfo("2023-05-04 : ", ",원", " ", "신규회원 적립금"),
//     new MileageHistoryListInfo("2023-05-04 : ", ",원", " ", "신규회원 적립금"),
// ];

function MileageHistoryList() {

    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 상태 추가

    // 페이지 변경 핸들러
    const handlePageChange = (page) => {
        // 페이지 변경 시 현재 페이지 업데이트
        setCurrentPage(page);
    };

    return (
        <div className='MileageHistoryList'>
            <div id='wrap'>
                <div id='container'>
                    <div id='contents'>

                        <div className='HistoryList_inside'>
                            <div className='Base_Table_TypeList'>
                                <table border="1" summary>
                                    <thead><tr>
                                        <th scope="col">주문날짜</th>
                                        <th scope="col">적립금</th>
                                        <th scope="col">관련 주문</th>
                                        <th scope="col">내용</th>
                                    </tr>
                                    </thead>
                                    <tbody className=" center">
                                        <tr className="ec-base-table">
                                            <td>2023-06-05</td>
                                            <td className="right">1,000원</td>
                                            <td>-</td>
                                            <td className="left">신규회원 적립금</td>
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
    );
};

export default MileageHistoryList;