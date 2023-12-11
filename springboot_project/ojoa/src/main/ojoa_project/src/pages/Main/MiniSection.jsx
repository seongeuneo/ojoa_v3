import '../../pages/Main/Main.css';
import React from 'react';
import { useState } from 'react';
import MiniItems from './MiniItems';
import { Link } from 'react-router-dom';
import { useProductList } from '../ProductList/useProductList'

const MiniSection = () => {
    const data = useProductList();

    const miniLi = data.map((content) => {
        // ... (ProductListItem 렌더링 코드)

        return (
            <div className="drgn">
                <li key={content.prod_num}><MiniItems prod_num={content.prod_num} imgNo={content.prod_mainimage} proname={content.prod_name}
                    blacklabel={content.prod_discount} mini_1={content.prod_kind} mini_2={content.prod_grade}
                    proprice={content.prod_price1}
                    // sale={content.sale}
                    castle={`/ProductDetailFromMain/${content.prod_num}/DetailInfo01`}
                />
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