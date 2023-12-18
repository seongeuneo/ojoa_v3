import './RecentList.css';
import React from 'react';
import { Link } from "react-router-dom";

const RecentListItem = ({id, mainimage}) => {

    return (
        <div className="RecentListItem">
                <div key={id} className="RecentItem">
                    <Link to={`/ProductDetail/${id}/DetailInfo01`} state={{ productData: id}}>
                        <img src={`${process.env.PUBLIC_URL}/thumbs/${(mainimage)}`} alt={`Product ${id}`} />
                    </Link>
                </div>
        </div>
    );
};

export default RecentListItem;
