import React, { useEffect, createContext, useReducer, useRef, useState } from "react";
import ProductListItem from "./ProductListItem";
import "./ProductList.css";
import Pagination from "../../components/Pagination/Pagination";
import PLFilter from "./PLFilter";
import { Link } from "react-router-dom";
import mockList from '../../data/ItemsData'
import axios from "axios";
import Modal from 'react-modal';
import { parse } from "qs";
// import AddCart from './Modal/AddCart';




function sortProducts(products, sortKey) {
    switch (sortKey) {
        case "신상품":
            return products.slice().sort((a, b) => b.id - a.id);
        case "상품명":
            return products.slice().sort((a, b) => a.productName.localeCompare(b.productName));
        case "낮은가격":
            return products.slice().sort((a, b) => parseFloat(a.productPriceFormatted.replace(/,/g, "")) - parseFloat(b.productPriceFormatted.replace(/,/g, "")));
        case "높은가격":
            return products.slice().sort((a, b) => parseFloat(b.productPriceFormatted.replace(/,/g, "")) - parseFloat(a.productPriceFormatted.replace(/,/g, "")));
        case "사용후기":
            return products.slice().sort((a, b) => parseInt(b.productReview) - parseInt(a.productReview));
        case "Best": // 새로 추가한 BEST 카테고리 정렬 (별점높은순)
            return products.slice().sort((a, b) => parseFloat(b.productGrade) - parseFloat(a.productGrade));
        case "New": // 새로 추가한 New 카테고리 정렬 (각 타입별 id의 숫자가 높은 순으로 - 2개)
            return products.slice().sort((a, b) => parseFloat(b.productGrade) - parseFloat(a.productGrade));
        default:
            return products.slice().sort((a, b) => a.id - b.id);
    }
}


//카테고리 : 의자
function Chair({ cart, setCart, handleCart }) {
    // Spring Boot 연결
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('/api/productList')
            .then((response) => {
                setData(response.data);
                console.log("서버연결성공 => ", response.data);
            }).catch((error) => {
                console.log(error)
            });
    }, []);

    const chair_filter = mockList.filter((chair) => chair.type === 'chair');

    const [sortKey, setSortKey] = useState(""); // 초기 정렬 기준: 신상품
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8; // 여기에 itemsPerPage를 정의합니다.

    const sortedList = sortProducts(chair_filter, sortKey);

    // 현재 페이지에 해당하는 상품들을 가져옴
    const displayedItems = sortedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    const singleLi = data.map((item) => (
        <li key={item.prod_num}>
            <ProductListItem cart={cart} setCart={setCart} handleCart={handleCart}>
                <Link className="productLink" to={`/products/detail/${item.prod_num}`}>
                    {item.prod_name}
                </Link>
            </ProductListItem>
        </li>
    ));

    const totalPages = Math.ceil(sortedList.length / itemsPerPage);

    return (
        <div className="ProductList">
            <div className="path">
                <span>현재 위치</span>

                <ol>
                    <li><Link to="/">홈</Link></li>
                    <li title="현재 위치">&gt; &nbsp;&nbsp;의자</li>
                </ol>
            </div>
            <div className="pageTlt">
                <h2>CHAIR</h2>
                <div className="txt_01">의자 전체 상품</div>
            </div>
            <PLFilter numOfList={sortedList.length} setSortKey={setSortKey} />

            <ul className="pl_items">{singleLi}</ul>
            {/* <ul>
                <li>
                    {data.map((item) =>
                        item.prod_name)}
                </li>
            </ul> */}

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>

    )

}; //Chair

const Bed = ({ cart, setCart, handleCart }) => {

    const bed_filter = mockList.filter((bed) => bed.type === 'bed');

    const [sortKey, setSortKey] = useState(""); // 초기 정렬 기준: 신상품
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8; // 여기에 itemsPerPage를 정의합니다.

    const sortedList = sortProducts(bed_filter, sortKey);

    // 현재 페이지에 해당하는 상품들을 가져옴
    const displayedItems = sortedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const singleLi = displayedItems.map((content) => (
        <li key={content.id}>
            <ProductListItem content={content} cart={cart} setCart={setCart} handleCart={handleCart}>
                <Link className="productLink" to={`/products/detail/${content.id}`} key={content.id}>
                    {content.productName}
                </Link>
            </ProductListItem>
        </li>
    ));

    const totalPages = Math.ceil(sortedList.length / itemsPerPage);

    return (
        <div className="ProductList">
            <div className="path">
                <span>현재 위치</span>
                <ol>
                    <li><Link to="/">홈</Link></li>
                    <li title="현재 위치">&gt; &nbsp;&nbsp;침대</li>
                </ol>
            </div>
            <div className="pageTlt">
                <h2>BED</h2>
                <div className="txt_01">침대 전체 상품</div>
            </div>
            <PLFilter numOfList={sortedList.length} setSortKey={setSortKey} />

            <ul className="pl_items">{singleLi}</ul>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>

    )
}; //Bed

const Sofa = ({ cart, setCart, handleCart }) => {

    const sofa_filter = mockList.filter((sofa) => sofa.type === 'sofa');

    const [sortKey, setSortKey] = useState(""); // 초기 정렬 기준: 신상품
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8; // 여기에 itemsPerPage를 정의합니다

    const sortedList = sortProducts(sofa_filter, sortKey);

    // 현재 페이지에 해당하는 상품들을 가져옴
    const displayedItems = sortedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const singleLi = displayedItems.map((content) => (
        <li key={content.id}>
            <ProductListItem content={content} cart={cart} setCart={setCart} handleCart={handleCart}>
                <Link className="productLink" to={`/products/detail/${content.id}`} key={content.id}>
                    {content.productName}
                </Link>
            </ProductListItem>
        </li>
    ));

    const totalPages = Math.ceil(sortedList.length / itemsPerPage);

    return (
        <div className="ProductList">
            <div className="path">
                <span>현재 위치</span>
                <ol>
                    <li><Link to="/">홈</Link></li>
                    <li title="현재 위치">&gt; &nbsp;&nbsp;소파</li>
                </ol>
            </div>
            <div className="pageTlt">
                <h2>SOFA</h2>
                <div className="txt_01">소파 전체 상품</div>
            </div>
            <PLFilter numOfList={sortedList.length} setSortKey={setSortKey} />

            <ul className="pl_items">{singleLi}</ul>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>

    )
}; //Sofa

const Bookshelf = ({ cart, setCart, handleCart }) => {

    const bookshelf_filter = mockList.filter((bookshelf) => bookshelf.type === 'bookshelf');

    const [sortKey, setSortKey] = useState(""); // 초기 정렬 기준: 신상품
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8; // 여기에 itemsPerPage를 정의합니다.

    const sortedList = sortProducts(bookshelf_filter, sortKey);

    // 현재 페이지에 해당하는 상품들을 가져옴
    const displayedItems = sortedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const singleLi = displayedItems.map((content) => (
        <li key={content.id}>
            <ProductListItem content={content} cart={cart} setCart={setCart} handleCart={handleCart}>
                <Link className="productLink" to={`/products/detail/${content.id}`} key={content.id}>
                    {content.productName}
                </Link>
            </ProductListItem>
        </li>
    ));

    const totalPages = Math.ceil(sortedList.length / itemsPerPage);

    return (
        <div className="ProductList">
            <div className="path">
                <span>현재 위치</span>
                <ol>
                    <li><Link to="/">홈</Link></li>
                    <li title="현재 위치">&gt; &nbsp;&nbsp;책장</li>
                </ol>
            </div>
            <div className="pageTlt">
                <h2>BOOKSHELF</h2>
                <div className="txt_01">책장 전체 상품</div>
            </div>
            <PLFilter numOfList={sortedList.length} setSortKey={setSortKey} />

            <ul className="pl_items">{singleLi}</ul>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>

    )
}; //Bookshelf

const Closet = ({ cart, setCart, handleCart }) => {

    const closet_filter = mockList.filter((closet) => closet.type === 'closet');

    const [sortKey, setSortKey] = useState(""); // 초기 정렬 기준: 신상품
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8; // 여기에 itemsPerPage를 정의합니다.

    const sortedList = sortProducts(closet_filter, sortKey);

    // 현재 페이지에 해당하는 상품들을 가져옴
    const displayedItems = sortedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const singleLi = displayedItems.map((content) => (
        <li key={content.id}>
            <ProductListItem content={content} cart={cart} setCart={setCart} handleCart={handleCart}>
                <Link className="productLink" to={`/products/detail/${content.id}`} key={content.id}>
                    {content.productName}
                </Link>
            </ProductListItem>
        </li>
    ));

    const totalPages = Math.ceil(sortedList.length / itemsPerPage);

    return (
        <div className="ProductList">
            <div className="path">
                <span>현재 위치</span>
                <ol>
                    <li><Link to="/">홈</Link></li>
                    <li title="현재 위치">&gt; &nbsp;&nbsp;옷장</li>
                </ol>
            </div>
            <div className="pageTlt">
                <h2>CLOSET</h2>
                <div className="txt_01">옷장 전체 상품</div>
            </div>
            <PLFilter numOfList={sortedList.length} setSortKey={setSortKey} />

            <ul className="pl_items">{singleLi}</ul>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>

    )
}; //Closet

const Lighting = ({ cart, setCart, handleCart }) => {

    const lighting_filter = mockList.filter((lighting) => lighting.type === 'lighting');

    const [sortKey, setSortKey] = useState(""); // 초기 정렬 기준: 신상품
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8; // 여기에 itemsPerPage를 정의합니다.

    const sortedList = sortProducts(lighting_filter, sortKey);

    // 현재 페이지에 해당하는 상품들을 가져옴
    const displayedItems = sortedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const singleLi = displayedItems.map((content) => (
        <li key={content.id}>
            <ProductListItem content={content} cart={cart} setCart={setCart} handleCart={handleCart}>
                <Link className="productLink" to={`/products/detail/${content.id}`} key={content.id}>
                    {content.productName}
                </Link>
            </ProductListItem>
        </li>
    ));

    const totalPages = Math.ceil(sortedList.length / itemsPerPage);

    return (
        <div className="ProductList">
            <div className="path">
                <span>현재 위치</span>
                <ol>
                    <li><Link to="/">홈</Link></li>
                    <li title="현재 위치">&gt; &nbsp;&nbsp;조명</li>
                </ol>
            </div>
            <div className="pageTlt">
                <h2>LIGHTING</h2>
                <div className="txt_01">조명 전체 상품</div>
            </div>
            <PLFilter numOfList={sortedList.length} setSortKey={setSortKey} />

            <ul className="pl_items">{singleLi}</ul>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>

    )
}; //Lighting

const Best = ({ cart, setCart, handleCart }) => {

    // "BEST" 카테고리에 속하는 상품들을 필터링
    const bestProducts = mockList.filter((product) => parseFloat(product.productGrade) >= 4.8);

    const [sortKey, setSortKey] = useState("Best"); // "Best" 카테고리를 기본 정렬 기준으로 설정
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8; // 여기에 itemsPerPage를 정의합니다.

    const sortedList = sortProducts(bestProducts, sortKey); // "Best" 카테고리에 대한 상품들을 정렬

    // 현재 페이지에 해당하는 상품들을 가져옴
    const displayedItems = sortedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // 화면에 표시할 상품 목록을 생성
    const singleLi = displayedItems.map((content) => (
        <li key={content.id}>
            <ProductListItem content={content} cart={cart} setCart={setCart} handleCart={handleCart}>
                <Link className="productLink" to={`/products/detail/${content.id}`} key={content.id}>
                    {content.productName}
                </Link>
            </ProductListItem>
        </li>
    ));

    const totalPages = Math.ceil(sortedList.length / itemsPerPage);

    return (
        <div className="ProductList">
            <div className="path">
                <span>현재 위치</span>
                <ol>
                    <li><Link to="/">홈</Link></li>
                    <li title="현재 위치">&gt; &nbsp;&nbsp;BEST</li>
                </ol>
            </div>
            <div className="pageTlt">
                <h2>BEST</h2>
                <div className="txt_01">BEST 상품 전체 목록</div>
            </div>
            <PLFilter numOfList={sortedList.length} setSortKey={setSortKey} />

            <ul className="pl_items">{singleLi}</ul>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>

    )
}; //Best

const New = ({ cart, setCart, handleCart }) => {

    // 각 타입별로 id의 숫자가 큰 아이템 2개씩 선택
    const New_filter = [
        ...mockList.filter((product) => product.type === 'chair').slice(0, 2),
        ...mockList.filter((product) => product.type === 'bed').slice(0, 2),
        ...mockList.filter((product) => product.type === 'sofa').slice(0, 2),
        ...mockList.filter((product) => product.type === 'bookshelf').slice(0, 2),
        ...mockList.filter((product) => product.type === 'closet').slice(0, 2),
        ...mockList.filter((product) => product.type === 'lighting').slice(0, 2),
    ];

    const [sortKey, setSortKey] = useState("New"); // "New" 카테고리를 기본 정렬 기준으로 설정
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8; // 여기에 itemsPerPage를 정의

    const sortedList = New_filter.sort((a, b) => b.id - a.id); // "New" 카테고리 정렬 (각 타입별로 id의 숫자가 큰 순서)

    // 현재 페이지에 해당하는 상품들을 가져옴
    const displayedItems = sortedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // 화면에 표시할 상품 목록을 생성
    const singleLi = displayedItems.map((content) => (
        <li key={content.id}>
            <ProductListItem content={content} cart={cart} setCart={setCart} handleCart={handleCart}>
                <Link className="productLink" to={`/products/detail/${content.id}`} key={content.id}>
                    {content.productName}
                </Link>
            </ProductListItem>
        </li>
    ));

    const totalPages = Math.ceil(sortedList.length / itemsPerPage);

    return (
        <div className="ProductList">
            <div className="path">
                <span>현재 위치</span>
                <ol>
                    <li><Link to="/">홈</Link></li>
                    <li title="현재 위치">&gt; &nbsp;&nbsp;NEW</li>
                </ol>
            </div>
            <div className="pageTlt">
                <h2>NEW</h2>
                <div className="txt_01">NEW 상품 전체 목록</div>
            </div>
            <PLFilter numOfList={sortedList.length} setSortKey={setSortKey} />

            <ul className="pl_items">{singleLi}</ul>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>

    )
}; //New

export { Chair, Bed, Sofa, Closet, Bookshelf, Lighting, Best, New };