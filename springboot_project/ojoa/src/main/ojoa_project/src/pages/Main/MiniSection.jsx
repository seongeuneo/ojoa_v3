import '../../pages/Main/Main.css';
import React from 'react';
import { useState } from 'react';
import MiniItems from './MiniItems';
import { Link } from 'react-router-dom';
import { useProductList } from '../ProductList/useProductList'
import { useSortProducts } from '../ProductList/useSortProducts';

const MiniSection = () => {
    // Spring Boot 연결
    const data = useProductList();

    // "BEST" 카테고리에 속하는 상품들을 필터링
    const bestProducts = data.filter((product) => parseFloat(product.prod_grade) >= 4.2);

    const [sortKey, setSortKey] = useState("Best"); // "Best" 카테고리를 기본 정렬 기준으로 설정

    const sortedList = useSortProducts(bestProducts, sortKey); // "Best" 카테고리에 대한 상품들을 정렬


    const miniLi = sortedList.slice(0, 6).map((content) => {
        // ... (ProductListItem 렌더링 코드)

        return (
            <div className="drgn">
                <li key={content.prod_num}><MiniItems content={content} />
                </li>
            </div>
        );
    });

    return (
        // main_col -> MiniSection
        <div className="MiniSection">
            {miniLi}
        </div>

    );
};

export default MiniSection;