import './RecentList.css';
import React, { useState, useEffect } from 'react';
import RecentListItem from './RecentListItem';
import { Link } from "react-router-dom";
import axios from 'axios';



const RecentList = ({ recentItems, setRecentItems}) => {


//    useEffect(() => {
//     const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
//     const loginID = loggedInUser.id;

//     axios
//         .get(`/api/recent/recentList?loginID=${loginID}`)
//         .then((response) => {
//             setRecentItems(response.data);
//         })
//         .catch((error) => {
//             console.error("Error: ", error);
//         });
// }, []);


const recentListItems = recentItems.map((item) => (
    <RecentListItem
        id={item.prod_num}
        mainimage={item.imgNo}
    />
));


    return (
        <div className="RecentList">
            <div className="RecentTitle">최근 본 상품</div>

            {recentListItems}
        
        </div>
    
    );

    };
export default RecentList;