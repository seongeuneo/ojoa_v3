
import React from "react";
import { useState, useRef, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { TodoDispatchContext } from "../Qna";
// import { useModal } from "../QnaModal/ModalContext";
import "../Modal/RModal.css";
import axios from "axios"; // axios import 추가

function RModal({ closeModal }) {
    const location = useLocation();
    const productData = location.state.productData;

    const [content, setContent] = useState("");
    // => new 일정 처리할  onChangeContent 이벤트 핸들러 
    const onChangeContent = (e) => {
        setContent(e.target.value);
    }; //onChangeContent

    // axios Post
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

    // 현재 날짜를 가져오는 함수
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const now = new Date();
        const year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();

        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        const formattedDate = `${year}-${month}-${day}`;
        setCurrentDate(formattedDate);
    }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 빈 배열 전달


    // 별점 기능
    const [selectedRating, setSelectedRating] = useState(5); // 초기 값으로 5 설정

    const handleRatingClick = (rating) => {
        setSelectedRating(rating);
    };


    return (

        <div id="QnaModal_Background">
            <div className="qnaModal_container2">
                <img
                    onClick={() => {
                        closeModal(); // 모달 닫기
                    }}
                    className="qnaModal_btn_close"
                    src="/images/search_X.png"
                    alt="search_x"
                />
            </div>



            {/* 내부 글쓰기 */}
            <div className="path">
                <div>
                    <div className='qna_writeArea'>
                        <h2>REVIEW</h2>
                    </div>


                    <form className="qna_write_info" action="/reviewrest/reviewR/saveReview/" encType="multipart/form-data" method="post" id="reviewform">
                        <table className="qna_board_table">
                            <caption className="qna_writename">상품후기쓰기</caption>
                            <td className="qna_write_content" name="review_rate">
                                <div className="main_score">
                                    <div className="score_info">
                                        <div className="title_info clearfix">
                                            <div className="necessary_wrap">
                                                <span className="necessary_point"></span>
                                            </div>
                                            <p className="title">리뷰 평점</p>
                                            <div className="pannel clearfix">
                                                <input className="score" name="review_rate" type="hidden" value={selectedRating} />
                                                <div className="star_info">
                                                    {[1, 2, 3, 4, 5].map((rating) => (
                                                        <label htmlFor="review_rate" > <span
                                                            key={rating}
                                                            className={`pin_custom_font_color star ${selectedRating >= rating ? 'selected' : ''}`}
                                                            onClick={() => handleRatingClick(rating)}
                                                            id="review_rate"
                                                        >
                                                            {selectedRating >= rating ? '★' : '☆'}
                                                        </span></label>
                                                    ))}
                                                </div> <span className="now_score">{selectedRating}</span>
                                                <button type="button" className="btn more view_right sf_displaynone"></button>
                                                <span className="now_score_text view_right sf_displaynone">아주 좋아요</span>
                                            </div>
                                        </div>
                                        <div className="score_detail sf_displaynone">
                                            <div id="" className="score_item" data-score="1"><span className="score_text">별로에요</span></div>
                                            <div id="" className="score_item" data-score="2"> <span className="score_text">그냥 그래요</span> </div>
                                            <div id="" className="score_item" data-score="3"> <span className="score_text">보통이에요</span> </div>
                                            <div id="" className="score_item" data-score="4"> <span className="score_text">맘에 들어요</span> </div>
                                            <div id="" className="score_item" data-score="5"> <span className="score_text">아주 좋아요</span> </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <tbody>
                                <tr>
                                    <th scope="row"><label htmlFor="review_bTitle" name="prod_num">상품번호</label></th>
                                    <td className="qna_writetitle" name="prod_num" colSpan={2}>
                                        <span name="prod_num">{productData.prod_num}</span>
                                        {/* <input
                                            type="readonly"
                                            name="prod_num"
                                            id="review_bContent"> {productData.prod_num}</input> */}

                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row"><label htmlFor="review_bTitle" name="review_title">제  목</label></th>
                                    <td className="qna_writetitle" name="review_title" colSpan={2}>
                                        <input
                                            type="text"
                                            name="review_title"
                                            id="review_bTitle"
                                            placeholder="제목을 입력하세요." />
                                    </td>
                                </tr>
                                <tr className="reviewContent">
                                    <th scope="row"><label htmlFor="review_bContent">내  용</label></th>
                                    <td className="qna_write_content" name="review_content" colSpan={2}>
                                        <input
                                            type="text"
                                            name="review_content"
                                            id="review_bContent"
                                            placeholder="내용을 입력하세요." />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><label htmlFor="review_image1">후기 이미지첨부</label></th>
                                    <td className="qna_write_content" name="review_image1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            name="review_image1f"
                                            id="review_bContent" />
                                    </td>
                                    <td className="qna_write_content" name="review_image2">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            name="review_image2f"
                                            id="review_bContent" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="qna_btnSet">
                            <a
                                type="button"
                                onClick={onSubmit}
                                className="qna_writesubmit_btn">
                                등록하기</a>
                        </div>
                        <div className="qna_btnSet_cancle">
                            <buttoen
                                type="button"
                                onClick={() => { closeModal(false); }}
                                className="qna_writeback_btn">
                                취소하기
                            </buttoen>
                        </div>
                    </form >
                </div>
            </div >
        </div > //QnaModal_Background
    )
};

export default RModal;

