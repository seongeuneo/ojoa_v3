import React, { useState, useEffect, useReducer, useRef } from "react";
import axios from "axios";
import "./ProductDetail.css";
import Modal from 'react-modal';
import QModal from './Modal/QModal';
import { useLocation } from "react-router-dom";

function ProdQna03() {
    const sessionInfo = JSON.parse(sessionStorage.getItem('loggedInUser')); // 세션에서 로그인 정보 가져오기

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

    // ====================================================================

    // 해당하는 상품의 리뷰 필터링
    const location = useLocation();
    const productData = location.state.productData;

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

    let pagedQnaList = qnaList.slice(startIndex, endIndex);
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

    // axios Post=======================================================
    const onSubmit = (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(document.getElementById('reviewform'));
            formData.append('prod_num', productData.prod_num);
            // 'content'와 다른 폼 데이터를 백엔드로 보내고 싶다고 가정합니다.

            // Spring Boot API 엔드포인트로 POST 요청을 보냅니다.
            const response = axios.post("/reviewrest/reviewR/saveReview/", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

            // 성공/실패에 따라 처리합니다.
            console.log("데이터 저장됨:", response.data);
            closeModal(false);
        } catch (error) {
            // 에러 처리
            console.error("데이터 저장 중 에러:", error);
            // 선택적으로 사용자에게 에러 메시지 표시 가능
        }
    };

    // 전체 상품문의 목록 ===============================================================================================
    // 해당하는 상품의 리뷰 필터링
    const matchingReviews = pagedQnaList.filter((review) => review.prod_num === productData.prod_num);
    // 리뷰리스트 리스트 맵핑
    const singleReviewLi = matchingReviews.map((item, i) => {
        return (
            <React.Fragment key={i}>
                {

                    <tr>
                        <td> <a onClick={() => handleTitleClick(i)}>{item.num}</a></td>
                        {/* <td>{item.prod_num}</td> */}
                        <td>
                            <div> <a onClick={() => handleTitleClick(i)}><img class="prQnaIMG" src={`/thumbs/${item.imgNo}`} alt='상품' /></a></div>
                            {/* <div>{item.itemInfo}</div> */} {/* 문의제목 */}
                        </td>
                        <td> <a onClick={() => handleTitleClick(i)}>{item.notification}</a></td> {/* 문의내용 */}
                        {/* <td>{item.category}</td> */}
                        {/* <td> <a onClick={() => handleTitleClick(i)}>{lastName(item.writer)}&#42;&#42;</a></td> */}
                        <td> <a onClick={() => handleTitleClick(i)}>{item.writer}&#42;&#42;</a></td>
                        <td> <a onClick={() => handleTitleClick(i)}>{item.date}</a></td>
                    </tr>

                }
                {expandedId === i && (
                    <tr>
                        <td colSpan="7">
                            {item.titleIcon === null ? (
                                <p>답변이 아직 되지 않았습니다.</p>
                            ) : (
                                <p>답변 내용 : {item.titleIcon}</p>
                            )}
                        </td>
                    </tr>
                )}
            </React.Fragment>
        )
    });

    const [isUserReviewsVisible, setIsUserReviewsVisible] = useState(false);

    // '내가쓴글조회하기'를 클릭하면 상태를 변경
    const handleUserReviewsClick = () => {

        if (isLoggedIn === true) {
            setIsUserReviewsVisible(true);
        } else {
            alert('로그인이 필요합니다.');
        }
    };


    // 해당 사용자가 작성한 리뷰 필터링
    const userReviews = pagedQnaList.filter((review) => review.id === (sessionInfo && sessionInfo.id)); // loggedInUserId에 현재 로그인한 사용자의 아이디가 있어야 합니다.

    // 리뷰 리스트 맵핑
    const userReviewLi = userReviews.map((item, i) => {
        return (
            <React.Fragment key={i}>
                {

                    <tr>
                        <td> <a onClick={() => handleTitleClick(i)}>{item.num}</a></td>
                        {/* <td>{item.prod_num}</td> */}
                        <td>
                            <div> <a onClick={() => handleTitleClick(i)}><img class="prQnaIMG" src={`/thumbs/${item.imgNo}`} alt='상품' /></a></div>
                            {/* <div>{item.itemInfo}</div> */} {/* 문의제목 */}
                        </td>
                        <td> <a onClick={() => handleTitleClick(i)}>{item.notification}</a></td> {/* 문의내용 */}
                        {/* <td>{item.category}</td> */}
                        <td> <a onClick={() => handleTitleClick(i)}>{item.writer}&#42;&#42;</a></td>
                        <td> <a onClick={() => handleTitleClick(i)}>{item.date}</a></td>
                    </tr>
                }
                {expandedId === i && (
                    <tr>
                        <td colSpan="7">
                            {item.titleIcon === null ? (
                                <p>답변이 아직 되지 않았습니다.</p>
                            ) : (
                                <p>답변내용 : {item.titleIcon}</p>
                            )}
                        </td>
                    </tr>
                )}
            </React.Fragment>
        );
    });

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
                        {isUserReviewsVisible ? userReviewLi : singleReviewLi}
                        <tr>
                            <th colspan="7">
                                <a onClick={openModal}>상품문의하기 </a>
                                <Modal className="ModalContent" isOpen={modalIsOpen} onRequestClose={closeModal} pagedQnaList={pagedQnaList} >
                                    <QModal closeModal={closeModal} pagedQnaList={pagedQnaList} productData={productData} />
                                </Modal>
                                <a onClick={handleUserReviewsClick}> 내가쓴글조회하기</a>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
};

export default ProdQna03;