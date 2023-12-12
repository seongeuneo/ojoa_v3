import React, { useState, useEffect, useReducer, useRef } from "react";
import axios from "axios";
import "./ProductDetail.css";
import Modal from 'react-modal';
import QModal from './Modal/QModal';
import { useLocation } from "react-router-dom";

function ProdQna03() {

    // 로그인 여부 
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태에 따른 nav바 변경

    // 세션 정보를 확인하여 로그인 상태를 설정하는 로직 추가
    useEffect(() => {
        const sessionInfo = sessionStorage.getItem('loggedInUser'); // 세션에서 로그인 정보 가져오기
        setIsLoggedIn(!!sessionInfo); // 세션 정보가 있으면 true, 없으면 false로 설정
    }, []);

    // 모달창 띄우기=====================================================
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // 모달 열기 함수
    const openModal = () => {

        if (isLoggedIn === true) {
            setModalIsOpen(true);
        } else {
            alert('로그인이 필요합니다.');
        }
    };
    const closeModal = () => setModalIsOpen(false);
    // ===============================================================

    function reducer(state, action) {
        switch (action.type) {
            case "INIT": {
                return action.dataList;
            }
            case "Create": {
                const newState = [action.newItem, ...state];
                localStorage.setItem("todo", JSON.stringify(newState));
                return newState;
            }
            default: return state;
        }; //switch
    } //reducer



    // Springboot 요청=====================================================
    const [qnaList, setQnaList] = useState([]);
    useEffect(() => {
        axios
            .get("/api/qna/allQnaList")
            .then((response) => {
                // "상품 문의" 카테고리만 필터링하여 가져오기
                const productQuestions = response.data.filter(item => item.category == '상품 문의');
                setQnaList(productQuestions);
                // setQnaList(response.data); 
                console.log("response.data", response.data);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }, []);
    console.log("qnaList +" + qnaList);



    // ====================================================================

    // 해당하는 상품의 리뷰 필터링
    const location = useLocation();
    const productData = location.state.productData;
    const matchingReviews = qnaList.filter((prodqna) => prodqna.prod_num === productData.prod_num);
    console.log("matchingReviews => " + matchingReviews);

    // 배열 속성 writer 입력시 성만 따오기========================================
    const lastName = (fullName) => {
        if (fullName.length > 0) {
            return fullName.charAt(0);
        }
        // fullName이 비어있을 때 처리할 내용을 추가할 수 있습니다.
    };
    // ====================================================================

    // 한 페이지당 몇 개의 글을 보여줄 것인지 정의===================================
    const itemsPerPage = 10;
    // 현재 페이지 상태와 페이지 변경 함수
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    let pagedQnaList = matchingReviews.slice(startIndex, endIndex);
    // ====================================================================



    // 클릭시 내용물 오픈~=====================================================
    const [expandedId, setExpandedId] = useState(null);

    const handleTitleClick = (id) => {
        if (expandedId === id) {
            setExpandedId(null);
        } else {
            setExpandedId(id);
        }
    };
    // ====================================================================
    return (
        <div className="OrderReview02">
            {/* <!-- main product detail --> */}
            <div className="container">
                {/* <!-- product detail dt 로 요약 --> */}

                <table className="review">
                    <tbody className='qna_ListItem_container'>
                        <tr>
                            {/* <th>번호</th> */}
                            <th>문의번호</th>
                            {/* <th>상품번호</th> */}
                            <th>상품이미지</th>
                            <th>문의 내용</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            {/* <th>조회수</th> */}
                        </tr>
                        {pagedQnaList.map((item, i) => (
                            <React.Fragment key={i}>
                                {
                                    (item.num == "공지") ? (
                                        <tr key={item.review_seq}>
                                            <td>{item.num}</td>
                                            {/* <td>{item.prod_num}</td> */}
                                            {/* <td>{item.itemInfo}</td> */} {/* 문의제목 */}

                                            <td>{item.notification}</td>
                                            {/* <td>{item.category}</td> */}
                                            <td>
                                                <a className='title_button' onClick={() => handleTitleClick(i)}>{item.title}</a>
                                            </td>
                                            <td>{item.writer}</td>
                                            <td>{item.date}</td>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <td> <a onClick={() => handleTitleClick(i)}>{item.num}</a></td>
                                            {/* <td>{item.prod_num}</td> */}
                                            <td>
                                                <div class="qIMG"> <a onClick={() => handleTitleClick(i)}><img src={`/thumbs/${item.imgNo}`} alt='상품' /></a></div>
                                                {/* <div>{item.itemInfo}</div> */} {/* 문의제목 */}
                                            </td>
                                            <td> <a onClick={() => handleTitleClick(i)}>{item.notification}</a></td> {/* 문의내용 */}
                                            {/* <td>{item.category}</td> */}
                                            <td> <a onClick={() => handleTitleClick(i)}>{lastName(item.writer)}&#42;&#42;</a></td>
                                            <td> <a onClick={() => handleTitleClick(i)}>{item.date}</a></td>
                                        </tr>
                                    )
                                }
                                {expandedId === i && (
                                    <tr>
                                        <td colSpan="7">
                                            {item.qna_reply}
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                        <tr>
                            <th colspan="7">
                                <a onClick={openModal}>상품문의하기 </a>
                                <Modal className="ModalContent" isOpen={modalIsOpen} onRequestClose={closeModal} pagedQnaList={pagedQnaList} >
                                    <QModal closeModal={closeModal} pagedQnaList={pagedQnaList} productData={productData} />
                                </Modal>
                                <a> 내가쓴글조회하기</a>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
};

export default ProdQna03;