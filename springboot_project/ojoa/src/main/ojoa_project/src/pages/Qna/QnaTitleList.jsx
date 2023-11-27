// import { table } from 'console';
import './Qna.css';
import React, { useState } from "react";

function QnaTitleList() {

    return (
        <thead className="qna_TitleList_container">
            <tr className='qna_Tboard_st'>
                <td className='qna_board_name'>번호</td>
                <td className='qna_board_name'>상품정보</td>
                <td className='qna_board_name'>카테고리</td>
                <td className='qna_board_name'>제목</td>
                <td className='qna_board_name'>작성자</td>
                <td className='qna_board_name'>작성일</td>
            </tr>
        </thead>
    )
}

export default QnaTitleList;