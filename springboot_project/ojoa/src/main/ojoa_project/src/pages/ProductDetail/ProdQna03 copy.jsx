import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductDetail.css";
import Modal from 'react-modal';
import QModal from './Modal/QModal';
import { useLocation } from "react-router-dom";

function ProdQna03() {
    const location = useLocation();
    const productData = location.state.productData;
    console.log("ProdQna03!!!!");
    console.log("productData!!!!" + productData);

    // // 모달창 띄우기
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const [data, setData] = useState([]);
    // console.log("OrderReview02의 data => " + data);
    // Springboot 요청
    useEffect(() => {
        axios
            .get("/api/qna/allQnaList")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }, []);


    // 해당하는 상품의 리뷰 필터링
    // const matchingReviews = data.filter((prodQna) => prodQna.prod_num === productData.prod_num);
    // console.log("matchingReviews" + matchingReviews);
    // 리뷰리스트 리스트 맵핑
    const singleReviewLi = data.map((content) => {
        return (
            <tr key={content.qna_seq}>
                <th><a>{content.qna_seq}</a></th>
                {/* <th><a onClick={handleTitleClick(content.review_seq)}>{content.review_seq}</a></th> */}
                <td>{content.prod_num}</td>
                <td>{content.id}</td>
                <td>{content.qna_category}</td>
                <td>{content.qna_title}</td>
                <td>{content.qna_content}</td>
                <td>{content.qna_reply}</td>
                <td>{content.qna_redate}</td>
                <td>{content.qna_indate}</td>
            </tr>
        );
    });
    return (
        <div className="ProdQna03">
            {/* <!-- main product detail --> */}
            <div className="container">
                {/* <!-- product detail dt 로 요약 --> */}
                <table className="pd_qna">

                    <tbody>
                        <tr>
                            <th>후기번호</th>
                            <th>상품번호</th>
                            <th>ID</th>
                            <th>카테고리</th>
                            <th>제목</th>
                            <th>내용</th>
                            <th>답변</th>
                            <th>문의 등록일</th>
                            <th>문의 답변일</th>
                        </tr>
                        {singleReviewLi}
                        <tr>
                            <th colspan="9">
                                <a onClick={openModal}>상품문의하기 </a>
                                <Modal className="ModalContent" isOpen={modalIsOpen} onRequestClose={closeModal}>
                                    <QModal closeModal={closeModal} />
                                </Modal>
                                <a>모두보기</a>
                            </th>
                        </tr>

                    </tbody>
                </table>
            </div>

        </div>
    )
};

export default ProdQna03;