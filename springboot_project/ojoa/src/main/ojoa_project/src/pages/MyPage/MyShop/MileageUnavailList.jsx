import '../MyShop/Mileage.css';
import React, { useState } from 'react';
import Pagination from '../../../components/Pagination/Pagination';

function MileageUnavailList() {

    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 상태 추가

    // 페이지 변경 핸들러
    const handlePageChange = (page) => {
        // 페이지 변경 시 현재 페이지 업데이트
        setCurrentPage(page);
    };

    return (
        <div className='MileageUnavailList'>
            <div id='wrap'>
                <div id='container'>
                    <div id='contents'>

                        <div className='UnavailList_inside'>
                            <div className='Base_Table_TypeList'>
                                <table border="1" summary>
                                    <thead><tr>
                                        <th scope="col">주문날짜</th>
                                        <th scope="col">적립금</th>
                                        <th scope="col">관련 주문</th>
                                        <th scope="col">사용가능 예정일</th>
                                        <th scope="col">내용</th>
                                    </tr>
                                    </thead>
                                    <tbody className=" center">
                                        <tr className="ec-base-table">
                                            <td>-</td>
                                            <td className="right">-</td>
                                            <td>-</td>
                                            <td className="left">-</td>
                                            <td className="left">-</td>
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

export default MileageUnavailList;