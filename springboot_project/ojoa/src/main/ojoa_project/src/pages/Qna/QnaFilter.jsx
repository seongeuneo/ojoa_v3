import './Qna.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const QnaFilter = ({ setFilters, onFilterChange }) => {
    const [searchConditions, setSearchConditions] = useState({
        board_category: '',
        search_date: '',
        search_key: 'subject',
        search_query: '',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchConditions({ ...searchConditions, [name]: value });

        if (name === 'board_category') {
            console.log(value); // 선택된 board_category 값을 출력하거나 다른 처리를 수행합니다.
        }
    };

    const handleSearch = () => {
        onFilterChange(searchConditions);
    };


    return (
        <div className="qna_filter_container">
            <div className="qna_board_sort">
                <div className="qna_board_find_l">
                    <select name="board_category" id="board_category" onChange={handleInputChange}>
                        <option value="">전체</option>
                        <option value="상품문의">상품문의</option>
                        <option value="배송문의">배송문의</option>
                        <option value="주문/결제">주문/결제</option>
                        <option value="취소문의">취소문의</option>
                        <option value="반품/교환">반품/교환</option>
                        <option value="환불문의">환불문의</option>
                        <option value="재입고문의">재입고문의</option>
                        <option value="기타문의">기타문의</option>
                    </select>
                </div>
                <div className="qna_board_find">
                    <fieldset>
                        <legend>게시물 검색</legend>
                        <select name="search_date" id="search_date" onChange={handleInputChange}>
                            <option value="">모든 기간</option>
                            <option value="week">일주일</option>
                            <option value="month">한달</option>
                            <option value="month3">세달</option>
                        </select>
                        <select name="search_key" id="search_key" onChange={handleInputChange}>
                            <option value="subject">제목</option>
                            <option value="content">내용</option>
                            <option value="writer_name">작성자</option>
                            <option value="product">상품정보</option>
                        </select>
                        <input type="text" name="search_query" id="search_query" value={searchConditions.search_query} onChange={(e) => setSearchConditions({ ...searchConditions, search_query: e.target.value })} /><button className="qna_board_find_btn" onClick={handleSearch}>찾기</button>
                    </fieldset>
                </div>
            </div>
        </div>
    );
};
export default QnaFilter;