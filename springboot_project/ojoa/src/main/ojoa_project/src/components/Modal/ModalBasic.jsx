import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import './ModalBasic.css';
import { useProductList } from '../../pages/ProductList/useProductList';

// ** header search 모달 내용을 담당하는 컴포넌트 ** //

function ModalBasic({ setModalOpen }) {

    const data = useProductList();

    useEffect(() => {
        if (setModalOpen) {
            document.body.style.overflow = 'hidden'; // 모달이 열릴 때 스크롤 막음.
        } else {
            document.body.style.overflow = ''; // 모달이 닫힐 때 스크롤 허용.
        }

        return () => {
            document.body.style.overflow = ''; // 컴포넌트 언마운트 시 스크롤 허용.
        };
    }, [setModalOpen]);

    const [inputValue, setInputValue] = useState(''); // 검색 입력 값.
    const [searchResults, setSearchResults] = useState([]); // 검색 결과.

    const closeModal = () => {
        setModalOpen(false);
    }; // setModalOpen 을 사용해 모달 닫기. (X버튼 onClick 이벤트 핸들러)

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }; // 입력한 텍스트의 상태 업데이트 함수.

    const handleSearchFormSubmit = (event) => {
        event.preventDefault(); // 폼태그의 기본 동작(전송)을 막음 => 모달창 닫힘(새로고침 현상)을 차단.
        handleSearchButtonClick(); // Enter 키를 누르면 페이지 새로고침 되지않고, 검색 버튼 클릭과 동일한 로직 실행.
    };

    const handleSearchButtonClick = () => {
        if (inputValue !== '') {
            // mockList에서 상품 이름으로 검색하여 결과를 필터링.
            const searchResults = data.filter((product) =>
                product.prod_name.includes(inputValue)
            ); // 검색 버튼 클릭 시, 입력된 값과 일치하는 상품을 mockList 에서 검색.
            setSearchResults(searchResults); // searchResults 상태 업데이트.
        }
    };

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } // 천 단위 쉼표로 변환하는 함수.

    const closeModalAndNavigate = () => {
        setModalOpen(false); // 모달을 닫고 페이지 이동을 위한 함수.
    };

    const handleResetClick = () => { // inpt 창 텍스트 리셋.
        setInputValue('');
    };

    return (
        <div className='Modal_wrap'>
            <div className="Modal_container">
                <div className="Modal_container2">
                    <img
                        onClick={closeModal}
                        className="madal_close_rotate"
                        src="/images/search_X.png"
                        alt="search_x"
                    />
                    <form
                        id="search-form-view"
                        onSubmit={handleSearchFormSubmit}>
                        <input
                            name="keyword"
                            className="inputTypeText"
                            value={inputValue}
                            type="text"
                            onChange={handleInputChange}
                            placeholder="상품을 검색 하세요."
                            autoFocus
                        />
                        {inputValue && (
                            <img
                                type="reset"
                                className="btn-reset"
                                src="/images/btn_reset.png"
                                alt="reset"
                                onClick={handleResetClick}>
                            </img>
                        )}
                        <img
                            src="/images/search_icon.png"
                            alt="검색"
                            className="search_btn"
                            onClick={handleSearchButtonClick}
                        />
                    </form>
                </div>
                {/* 검색 결과 출력 */}
                <div className="search-container">
                    <div className="search-results">
                        {searchResults.length === 0 ? ( // 검색 결과가 없을 때
                            <h4>검색 상품이 존재하지 않습니다.</h4>
                        ) : (
                            searchResults.map((product) => (
                                <Link
                                    to={`/ProductDetail/${product.prod_num}`}
                                    key={product.prod_num}
                                    className="search-result-item"
                                    onClick={closeModalAndNavigate} // 클릭 시 모달을 닫는 함수 호출
                                >
                                    <img
                                        src={`{product.prod_mainimage}`}
                                        alt={product.prod_name}
                                    />
                                    <h3>&nbsp;&nbsp;{product.prod_name}</h3>
                                    <p>&nbsp;&nbsp;&nbsp;{numberWithCommas(product.prod_price1)}원</p>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalBasic;