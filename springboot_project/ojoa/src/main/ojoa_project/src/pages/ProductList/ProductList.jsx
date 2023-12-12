import React, { useEffect, useState } from "react";
import ProductListItem from "./ProductListItem";
import "./ProductList.css";
import Pagination from "../../components/Pagination/Pagination";
import PLFilter from "./PLFilter";
import { Link } from "react-router-dom";
import { useProductList } from './useProductList';
import { useSortProducts } from './useSortProducts';
import Modal from 'react-modal';
import { parse } from "qs";
// import AddCart from './Modal/AddCart';


//카테고리 : 의자
function Chair({ cart, setCart, handleCart }) {
    // Spring Boot 연결
    const data = useProductList();

    const chair_filter = data.filter((item) => item.prod_kind === '의자');

    const [sortKey, setSortKey] = useState(""); // 초기 정렬 기준: 신상품
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8; // 여기에 itemsPerPage를 정의합니다.

    const sortedList = useSortProducts(chair_filter, sortKey);

    // 현재 페이지에 해당하는 상품들을 가져옴
    const displayedItems = sortedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const singleLi = displayedItems.map((content) => (
        <li key={content.prod_num}>
            <ProductListItem content={content} cart={cart} setCart={setCart} handleCart={handleCart}>
                <Link className="productLink" to={`/products/detail/${content.prod_num}`} key={content.prod_num}>
                    {content.prod_name}
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

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>

    )

}; //Chair

const Bed = ({ cart, setCart, handleCart }) => {

    // Spring Boot 연결
    const data = useProductList();

    const bed_filter = data.filter((item) => item.prod_kind === '침대');

    const [sortKey, setSortKey] = useState(""); // 초기 정렬 기준: 신상품
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8; // 여기에 itemsPerPage를 정의합니다.

    const sortedList = useSortProducts(bed_filter, sortKey);

    // 현재 페이지에 해당하는 상품들을 가져옴
    const displayedItems = sortedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const singleLi = displayedItems.map((content) => (
        <li key={content.prod_num}>
            <ProductListItem content={content} cart={cart} setCart={setCart} handleCart={handleCart}>
                <Link className="productLink" to={`/products/detail/${content.prod_num}`} key={content.prod_num}>
                    {content.prod_name}
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
    // Spring Boot 연결
    const data = useProductList();

    const sofa_filter = data.filter((item) => item.prod_kind === '소파');

    const [sortKey, setSortKey] = useState(""); // 초기 정렬 기준: 신상품
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8; // 여기에 itemsPerPage를 정의합니다

    const sortedList = useSortProducts(sofa_filter, sortKey);

    // 현재 페이지에 해당하는 상품들을 가져옴
    const displayedItems = sortedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const singleLi = displayedItems.map((content) => (
        <li key={content.prod_num}>
            <ProductListItem content={content} cart={cart} setCart={setCart} handleCart={handleCart}>
                <Link className="productLink" to={`/products/detail/${content.prod_num}`} key={content.prod_num}>
                    {content.prod_name}
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
    // Spring Boot 연결
    const data = useProductList();

    const bookshelf_filter = data.filter((item) => item.prod_kind === '책장');

    const [sortKey, setSortKey] = useState(""); // 초기 정렬 기준: 신상품
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8; // 여기에 itemsPerPage를 정의합니다.

    const sortedList = useSortProducts(bookshelf_filter, sortKey);

    // 현재 페이지에 해당하는 상품들을 가져옴
    const displayedItems = sortedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const singleLi = displayedItems.map((content) => (
        <li key={content.prod_num}>
            <ProductListItem content={content} cart={cart} setCart={setCart} handleCart={handleCart}>
                <Link className="productLink" to={`/products/detail/${content.prod_num}`} key={content.prod_num}>
                    {content.prod_name}
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
    // Spring Boot 연결
    const data = useProductList();

    const closet_filter = data.filter((item) => item.prod_kind === '옷장');


    const [sortKey, setSortKey] = useState(""); // 초기 정렬 기준: 신상품
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8; // 여기에 itemsPerPage를 정의합니다.

    const sortedList = useSortProducts(closet_filter, sortKey);

    // 현재 페이지에 해당하는 상품들을 가져옴
    const displayedItems = sortedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const singleLi = displayedItems.map((content) => (
        <li key={content.prod_num}>
            <ProductListItem content={content} cart={cart} setCart={setCart} handleCart={handleCart}>
                <Link className="productLink" to={`/products/detail/${content.prod_num}`} key={content.prod_num}>
                    {content.prod_name}
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
    // Spring Boot 연결
    const data = useProductList();

    const lighting_filter = data.filter((item) => item.prod_kind === '조명');

    const [sortKey, setSortKey] = useState(""); // 초기 정렬 기준: 신상품
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8; // 여기에 itemsPerPage를 정의합니다.

    const sortedList = useSortProducts(lighting_filter, sortKey);

    // 현재 페이지에 해당하는 상품들을 가져옴
    const displayedItems = sortedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const singleLi = displayedItems.map((content) => (
        <li key={content.prod_num}>
            <ProductListItem content={content} cart={cart} setCart={setCart} handleCart={handleCart}>
                <Link className="productLink" to={`/products/detail/${content.prod_num}`} key={content.prod_num}>
                    {content.prod_name}
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
    // Spring Boot 연결
    const data = useProductList();

    // "BEST" 카테고리에 속하는 상품들을 필터링
    const bestProducts = data.filter((product) => parseFloat(product.prod_grade) >= 4.2);

    const [sortKey, setSortKey] = useState("Best"); // "Best" 카테고리를 기본 정렬 기준으로 설정
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8; // 여기에 itemsPerPage를 정의합니다.

    const sortedList = useSortProducts(bestProducts, sortKey); // "Best" 카테고리에 대한 상품들을 정렬

    // 현재 페이지에 해당하는 상품들을 가져옴
    const displayedItems = sortedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // 화면에 표시할 상품 목록을 생성
    const singleLi = displayedItems.map((content) => (
        <li key={content.prod_num}>
            <ProductListItem content={content} cart={cart} setCart={setCart} handleCart={handleCart}>
                <Link className="productLink" to={`/products/detail/${content.prod_num}`} key={content.prod_num}>
                    {content.prod_name}
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
    // Spring Boot 연결
    const data = useProductList();

    // 각 타입별로 id의 숫자가 큰 아이템 2개씩 선택

    const New_filter = [
        ...data.filter((product) => product.prod_kind === '의자').slice(0, 2),
        ...data.filter((product) => product.prod_kind === '침대').slice(0, 2),
        ...data.filter((product) => product.prod_kind === '소파').slice(0, 2),
        ...data.filter((product) => product.prod_kind === '책장').slice(0, 2),
        ...data.filter((product) => product.prod_kind === '옷장').slice(0, 2),
        ...data.filter((product) => product.prod_kind === '조명').slice(0, 2),
    ];

    const [sortKey, setSortKey] = useState("New"); // "New" 카테고리를 기본 정렬 기준으로 설정
    const [currentPage, setCurrentPage] = useState(1);



    const itemsPerPage = 8; // 여기에 itemsPerPage를 정의

    const sortedList = useSortProducts(New_filter, sortKey);
    // const sortedList = New_filter.sort((a, b) => b.id - a.id); // "New" 카테고리 정렬 (각 타입별로 id의 숫자가 큰 순서)

    // 현재 페이지에 해당하는 상품들을 가져옴
    const displayedItems = sortedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // 화면에 표시할 상품 목록을 생성
    const singleLi = displayedItems.map((content) => (
        <li key={content.prod_num}>
            <ProductListItem content={content} cart={cart} setCart={setCart} handleCart={handleCart}>
                <Link className="productLink" to={`/products/detail/${content.prod_num}`} key={content.prod_num}>
                    {content.prod_name}
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