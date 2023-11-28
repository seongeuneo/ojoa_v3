// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function ProductCategory({ cart, setCart, handleCart }) {
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         // axios를 사용하여 데이터를 가져오는 요청
//         axios.get("/api/productData")
//             .then((response) => {
//                 setData(response.data); // 데이터를 받아와서 상태에 저장
//             })
//             .catch((error) => {
//                 console.error("Error fetching data:", error);
//             });
//     }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

//     if (!data) {
//         return <div>Loading...</div>; // 데이터가 아직 없을 때 로딩 표시
//     }

//     let ProductComponent;

//     if (data.prod_kind === "chair") {
//         ProductComponent = () => {
//             const chair_filter = data.products.filter((chair) => chair.type === 'chair');
//             const [sortKey, setSortKey] = useState(""); // 초기 정렬 기준: 신상품
//         const [currentPage, setCurrentPage] = useState(1);

//         const itemsPerPage = 8; // 여기에 itemsPerPage를 정의합니다.

//         const sortedList = sortProducts(chair_filter, sortKey);

//         // 현재 페이지에 해당하는 상품들을 가져옴
//         const displayedItems = sortedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//         const singleLi = displayedItems.map((content) => (
//             <li key={content.id}>
//                 <ProductListItem content={content} cart={cart} setCart={setCart} handleCart={handleCart}>
//                     <Link className="productLink" to={`/products/detail/${content.id}`} key={content.id}>
//                         {content.productName}
//                     </Link>
//                 </ProductListItem>
//             </li>
//         ));

//         const totalPages = Math.ceil(sortedList.length / itemsPerPage);
//             return (
//                 <div className="ProductList">
//                 <div className="path">
//                     <span>현재 위치</span>
//                     <ol>
//                         <li><Link to="/">홈</Link></li>
//                         <li title="현재 위치">&gt; &nbsp;&nbsp;의자</li>
//                     </ol>
//                 </div>
//                 <div className="pageTlt">
//                     <h2>CHAIR</h2>
//                     <div className="txt_01">의자 전체 상품</div>
//                 </div>
//                 <PLFilter numOfList={sortedList.length} setSortKey={setSortKey} />
    
//                 <ul className="pl_items">{singleLi}</ul>
    
//                 <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
//             </div>
//       ); // Chair
//         };
//     } else if (data.prod_kind === "bed") {
//         ProductComponent = () => {
//             const bed_filter = data.products.filter((bed) => bed.type === 'bed');
//             const [sortKey, setSortKey] = useState(""); // 초기 정렬 기준: 신상품
//             const [currentPage, setCurrentPage] = useState(1);

//             const itemsPerPage = 8; // 여기에 itemsPerPage를 정의합니다.

//             const sortedList = sortProducts(bed_filter, sortKey);

//             // 현재 페이지에 해당하는 상품들을 가져옴
//             const displayedItems = sortedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//             const singleLi = displayedItems.map((content) => (
//                 <li key={content.id}>
//                     <ProductListItem content={content} cart={cart} setCart={setCart} handleCart={handleCart}>
//                         <Link className="productLink" to={`/products/detail/${content.id}`} key={content.id}>
//                             {content.productName}
//                         </Link>
//                     </ProductListItem>
//                 </li>
//             ));

//             const totalPages = Math.ceil(sortedList.length / itemsPerPage);
//             return (
//                 <div className="ProductList">
//                 <div className="path">
//                     <span>현재 위치</span>
//                     <ol>
//                         <li><Link to="/">홈</Link></li>
//                         <li title="현재 위치">&gt; &nbsp;&nbsp;침대</li>
//                     </ol>
//                 </div>
//                 <div className="pageTlt">
//                     <h2>BED</h2>
//                     <div className="txt_01">침대 전체 상품</div>
//                 </div>
//                 <PLFilter numOfList={sortedList.length} setSortKey={setSortKey} />
    
//                 <ul className="pl_items">{singleLi}</ul>
    
//                 <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
//             </div>
//       );
//         };
//     }

//     return (
//         <div className="ProductList">
//             {/* 선택된 컴포넌트 렌더링 */}
//             <ProductListItem cart={cart} setCart={setCart} handleCart={handleCart} />
//         </div>
//     );
// }
// export default ProductCategory;
