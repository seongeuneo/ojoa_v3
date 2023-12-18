// import './RecentList.css';
// import React, { useState, useEffect } from 'react';
// import RecentListItem from './RecentListItem';
// import { Link } from "react-router-dom";

// const RecentList = () => {
//     const [recentItems, setRecentItems] = useState([]);

    
//     // ProductListItem에서 호출되는 함수로 최근 본 상품 목록에 상품 정보 추가
//     const addToRecent = (clickedItem) => {
//         setRecentItems([clickedItem, ...recentItems.filter(item => item.prod_num !== clickedItem.prod_num)].slice(0, 5));
//         localStorage.setItem('recentItems', JSON.stringify(recentItems)); // 로컬 스토리지에 최근 상품 정보 저장
//     };;


      
//     // 컴포넌트가 마운트될 때 localStorage에서 최근 본 상품 정보 가져오기
//     useEffect(() => {
//         const recentItemsFromStorage = JSON.parse(localStorage.getItem('recentItems')) || [];
//         setRecentItems(recentItemsFromStorage);
//     }, []);
      
//     // 최근 본 상품 정보 업데이트 시 호출하는 함수 (예: 상품을 클릭할 때)
//     // 상품을 클릭할 때 호출되는 함수
//     const handleItemClick = (clickedItem) => {
//         // 최근 클릭한 상품의 prod_num을 받아와서 상품 목록에 추가
//         setRecentItems([clickedItem, ...recentItems.filter(item => item !== clickedItem)].slice(0, 5));
//     };

//     return (
//         <div className="RecentList">
//             <div className="RecentTitle">최근 본 상품</div>
//             {/* 최근 본 상품들의 이미지를 RecentListItem으로 전달 */}
//             <RecentListItem content={recentItems} />
//         </div>
//     );
// };

// export default RecentList;