import './RecentList.css';
import React from 'react';
import { Link } from "react-router-dom";

const RecentListItem = ({ content }) => {
    const recentItemsToShow = content.slice(0, 2); // 두 개의 항목만 보여줄 수 있도록 제한

    return (
        <div className="RecentListItem">
            {recentItemsToShow.map((item) => (
                <div key={item.prod_num} className="RecentItem">
                    <Link to={`/ProductDetail/${item.prod_num}/DetailInfo01`} state={{ productData: item.prod_num }}>
                        <img src={`${process.env.PUBLIC_URL}/thumbs/${encodeURIComponent(item.prod_mainimage)}`} alt={`Product ${item.prod_num}`} />
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default RecentListItem;
