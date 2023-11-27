import React from "react";
import "./PLFilter.css";

function PLFilter({ numOfList, setSortKey }) {
    const handleSortClick = (sortKey) => {
        setSortKey(sortKey);
    };

    return (
        <div className="PLFilter">
            <div className="product_function">
                <p className="product_count">등록제품 : {numOfList} 개</p>
                <ul className="product_compare">
                    <li onClick={() => handleSortClick("신상품")}>신상품</li>
                    <li onClick={() => handleSortClick("상품명")}>상품명</li>
                    <li onClick={() => handleSortClick("낮은가격")}>낮은가격</li>
                    <li onClick={() => handleSortClick("높은가격")}>높은가격</li>
                    <li onClick={() => handleSortClick("제조사")}>제조사</li>
                    <li onClick={() => handleSortClick("사용후기")}>사용후기</li>
                </ul>
            </div>
        </div>
    )
};

export default PLFilter;