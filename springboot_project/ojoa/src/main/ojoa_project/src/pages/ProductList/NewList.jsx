// import React from "react";
// import mockList from '../../data/ItemsData'
// import { useState } from "react";
// import ProductListItem from "./ProductListItem";
// import { Link } from "react-router-dom";
// import PLFilter from "./PLFilter";
// import Pagination from "../../components/Pagination/Pagination";
// import "./NewList.css";


// function sortProducts(products, sortKey) {
//     switch (sortKey) {
//         case "신상품":
//             return products.slice().sort((a, b) => b.id - a.id);
//         case "상품명":
//             return products.slice().sort((a, b) => a.productName.localeCompare(b.productName));
//         case "낮은가격":
//             return products.slice().sort((a, b) => parseFloat(a.productPriceFormatted.replace(/,/g, "")) - parseFloat(b.productPriceFormatted.replace(/,/g, "")));
//         case "높은가격":
//             return products.slice().sort((a, b) => parseFloat(b.productPriceFormatted.replace(/,/g, "")) - parseFloat(a.productPriceFormatted.replace(/,/g, "")));
//         case "사용후기":
//             return products.slice().sort((a, b) => parseInt(b.productReview) - parseInt(a.productReview));
//         default:
//             return products.slice().sort((a, b) => a.id - b.id);
//     }
// }


// function NewList({ cart, setCart, handleCart }) {

//     const getMaxIdByType = (type) => {
//         const filteredItems = mockList.filter(item => item.type === type);
//         if (filteredItems.length === 0) {
//             return null; // 해당 타입의 아이템이 없는 경우
//         }

//         const maxIdItem = filteredItems.reduce((maxItem, currentItem) => {
//             return currentItem.id > maxItem.id ? currentItem : maxItem;
//         });

//         return maxIdItem;
//     };

//     // 'bed' 타입에서 id가 가장 큰 아이템 가져오기
//     const maxIdBed = getMaxIdByType('bed');
//     // 'sofa' 타입에서 id가 가장 큰 아이템 가져오기
//     const maxIdSofa = getMaxIdByType('sofa');
//     // 'bookself' 타입에서 id가 가장 큰 아이템 가져오기
//     const maxIdBookself = getMaxIdByType('bookself');
//     // 'closet' 타입에서 id가 가장 큰 아이템 가져오기
//     const maxIdCloset = getMaxIdByType('closet');
//     // 'chair' 타입에서 id가 가장 큰 아이템 가져오기
//     const maxIdChair = getMaxIdByType('chair');

//     const newProduct = [maxIdBed,maxIdSofa,maxIdBookself,maxIdCloset,maxIdChair]

//     // 이와 같은 방식으로 다른 타입에 대해서도 최대 id 값을 가진 아이템을 가져올 수 있습니다.


//     const [sortKey, setSortKey] = useState(""); // 초기 정렬 기준: 신상품


//     const singleLi = newProduct.map((content) => (
//         <li key={content.id}>
//             <ProductListItem content={content} cart={cart} setCart={setCart}>
//                 <Link className="productLink" to={`/products/detail/${content.id}`} key={content.id}>
//                     {content.productName}
//                 </Link>
//             </ProductListItem>
//         </li>
//     ));






//     return (
//         <div className="NewList">
//             <div className="path">
//                 <span>현재 위치</span>
//                 <ol>
//                     <li><Link to="/">홈</Link></li>
//                     <li title="현재 위치">&gt; &nbsp;&nbsp;신상품</li>
//                 </ol>
//             </div>
//             <div className="pageTlt">
//                 <h2>NEW</h2>
//                 <div className="txt_01">신상품</div>
//             </div>
//             <PLFilter numOfList={newProduct.length} />

//             <ul className="pl_items">{singleLi}</ul>

//             <Pagination />
//         </div>
//     )
// };

// export default NewList;
