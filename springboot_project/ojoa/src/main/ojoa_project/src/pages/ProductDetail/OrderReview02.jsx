import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./ProductDetail.css";
import Modal from 'react-modal';
import RModal from './Modal/RModal';
import { useLocation } from "react-router-dom";

// 배열 속성 writer 입력시 성만 따오기
const lastName = (fullName) => {
    if (fullName.length > 0) {
        return fullName.charAt(0);
    };
    return;
};


function OrderReview02() {
    const location = useLocation();
    const productData = location.state.productData;

    const [data, setData] = useState([]);
    // 모달창 띄우기
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태에 따른 nav바 변경

    // 세션 정보를 확인하여 로그인 상태를 설정하는 로직 추가
    useEffect(() => {
        const sessionInfo = sessionStorage.getItem('loggedInUser'); // 세션에서 로그인 정보 가져오기
        setIsLoggedIn(!!sessionInfo); // 세션 정보가 있으면 true, 없으면 false로 설정
    }, []);


    // 모달 열기 함수
    const openModal = () => {

        if (isLoggedIn === true) {
            setModalIsOpen(true);
        } else {
            alert('로그인이 필요합니다.');
        }
    };
    // const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    // useEffect(() => {
    //     if (!checkedLogin) {
    //         // 로그인 상태 확인 함수 호출
    //         checkLoginStatus();
    //     }

    //     axios
    //         .get('/reviewrest/reviewR/allReviewList')
    //         .then((response) => {
    //             setData(response.data);
    //             console.log("서버연결성공 => ", response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, [checkedLogin]);

    useEffect(() => {
        axios
            .get('/reviewrest/reviewR/allReviewList')
            .then((response) => {
                setData(response.data);
                console.log("서버연결성공 => ", response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);





    // 해당하는 상품의 리뷰 필터링
    const matchingReviews = data.filter((review) => review.prod_num === productData.prod_num);
    // 리뷰리스트 리스트 맵핑
    const singleReviewLi = matchingReviews.map((content) => {
        return (
            <tr key={content.review_seq}>
                {/* <th><a>{content.review_seq}</a></th> */}
                {/* <th><a onClick={handleTitleClick(content.review_seq)}>{content.review_seq}</a></th> */}
                <td>{content.id}</td>
                {/* <td>{productData.prod_num}</td> */}
                <td>{content.review_title}</td>
                <td>{content.review_content}</td>
                <td><img src={`${content.review_image1}`} alt='후기이미지1' /></td>
                <td><img src={`${content.review_image2}`} alt='후기이미지2' /></td>
                <td>{content.review_date}</td>
                <td>{content.review_rate}</td>
                {/* <td>{content.review_view}</td> */}
            </tr>
        );
    });

    return (
        <div className="OrderReview02">
            {/* <!-- main product detail --> */}
            <div className="container">
                {/* <!-- product detail dt 로 요약 --> */}

                <table className="review">
                    <tbody>
                        <tr>
                            {/* <th>번호</th> */}
                            <th>작성자</th>
                            {/* <th>상품번호</th>*/}
                            <th>제목</th>
                            <th>내용</th>
                            <th>후기 이미지</th>
                            <th>추가 이미지</th>
                            <th>작성일</th>
                            <th>평점</th>
                            {/* <th>조회수</th> */}
                        </tr>
                        {singleReviewLi}
                        <tr>
                            <th colspan="7">
                                <a onClick={openModal}>상품후기쓰기 </a>
                                <Modal className="ModalContent" isOpen={modalIsOpen} onRequestClose={closeModal} state={{ productData: productData }}>
                                    {/* <RModal closeModal={closeModal} onReviewTextChange={handleReviewTextChange} state={{ productData: productData }} /> */}
                                    <RModal closeModal={closeModal} state={{ productData: productData }} />
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

export default OrderReview02;