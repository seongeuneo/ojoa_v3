// import './RecentList.css';
// import React, { useState, useEffect } from 'react';
// import RecentListItem from './RecentListItem';
// import { Link } from "react-router-dom";
// import axios from 'axios';



// const RecentList = ({ recentItems, setRecentItems}) => {
//     const [fetchData, setFetchData] = useState(false);

//     useEffect(() => {
//         const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
//         if (loggedInUser) {
//             const loginID = loggedInUser.id;
    
//             axios
//                 .get(`/api/recent/recentList?loginID=${loginID}`)
//                 .then((response) => {
//                     setRecentItems(response.data);
                    
//                 })
//                 .catch((error) => {
//                     console.error("Error: ", error);
//                 });
//         }
//     }, []); 

//     useEffect(() => {
//         if (recentItems.length > 0) {
//             setFetchData(prevState => !prevState);
//         }
//     }, [recentItems]);

// const recentListItems = recentItems.map((item) => (
//     <RecentListItem
//         id={item.prod_num}
//         mainimage={item.recent_image}
//     />
// ));

// console.log(recentItems);

//     return (
//         <div className="RecentList">
//             <div className="RecentTitle">최근 본 상품</div>

//             {recentListItems}
        
//         </div>
    
//     );

//     };
// export default RecentList;