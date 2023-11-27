import './Qna.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const QnaFilter = ({ setFilters }) => {
    function handleCategoryChange(e) {
        let category = e.target.value;

        setFilters((filters) => ({ ...filters, category }));
    }
    function handleSubmit(e) {
        e.preventDefault();
        const {
            search_date: { value: date },
            search_key: { value: key },
            search_query: { value: query },
        } = e.target.elements;

        setFilters((filters) => ({ ...filters, date, key, query }));
    }

    return (
        <div className="qna_filter_container">
            <div className="qna_board_sort">
                <select name="board_category" id="board_category" onChange={handleCategoryChange}>
                    <option value="">전체</option>
                    <option>상품문의</option>
                    <option>배송문의</option>
                    <option>주문/결제</option>
                    <option>취소문의</option>
                    <option>반품/교환</option>
                    <option>환불문의</option>
                    <option>재입고문의</option>
                    <option>기타문의</option>
                </select>
                <form className="qna_board_find" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>게시물 검색</legend>
                        <select name="search_date" id="search_date">
                            <option value="">모든 기간</option>
                            <option value="week">일주일</option>
                            <option value="month">한달</option>
                            <option value="month3">세달</option>
                        </select>
                        <select name="search_key" id="search_key">
                            <option value="subject">제목</option>
                            <option value="content">내용</option>
                            <option value="writer_name">작성자</option>
                            <option value="product">상품정보</option>
                        </select>
                        <input type="text" name="search_query" /><button className="qna_board_find_btn">찾기</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};
export default QnaFilter;