
import React from "react";
import { useState, useRef, useContext, useEffect } from "react";
import mockList from "../../../data/ItemsData";
// import { TodoDispatchContext } from "../Qna";
// import { useModal } from "../QnaModal/ModalContext";
import "../Modal/RModal.css";
import axios from "axios"; // axios import 추가

function RModal({ closeModal }) {

    const [content, setContent] = useState("");
    // => new 일정 처리할  onChangeContent 이벤트 핸들러 
    const onChangeContent = (e) => {
        setContent(e.target.value);
    }; //onChangeContent

    //여기서부터 원희코드
    const onSubmit = async (e) => {

        try {
            const formData = new FormData(document.getElementById('reviewform'));
            // 'content'와 다른 폼 데이터를 백엔드로 보내고 싶다고 가정합니다.

            // 다른 폼 필드를 여기에 추가하세요

            // Spring Boot API 엔드포인트로 POST 요청을 보냅니다.
            const response = await axios.post("/reviewrest/reviewR/saveReview/", formData,
                { headers: { "Content-Type": "application/json" } });

            // 성공/실패에 따라 처리합니다.
            console.log("데이터 저장됨:", response.data);
            closeModal(false);
        } catch (error) {
            // 에러 처리
            console.error("데이터 저장 중 에러:", error);
            // 선택적으로 사용자에게 에러 메시지 표시 가능
        }
        e.preventDefault();
    };

    return (

        <div id="QnaModal_Background">
            <div className="qnaModal_container2">
                <img
                    onClick={() => {
                        closeModal(); // 모달 닫기
                    }}
                    className="qnaModal_btn_close"
                    src="../images/search_X.png"
                    alt="search_x"
                />
            </div>



            {/* 내부 글쓰기 */}
            <div className="path">
                <div>
                    <div className='qna_writeArea'>
                        <h2>REVIEW</h2>
                    </div>


                    <form className="qna_write_info" action="" method="post" id="reviewform">
                        <table className="qna_board_table">
                            <caption className="qna_writename">상품후기쓰기</caption>
                            <tbody>
                                <tr>
                                    <th scope="row"><label htmlFor="review_bTitle" name="review_title">제  목</label></th>
                                    <td className="qna_writetitle" name="review_title">
                                        <input
                                            type="text"
                                            name="review_title"
                                            id="review_bTitle"
                                            placeholder="제목을 입력하세요." />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><label htmlFor="review_bContent">내  용</label></th>
                                    <td className="qna_write_content" name="review_content">
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
                                            name="review_image1"
                                            id="review_bContent" />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><label htmlFor="review_date">작성일</label></th>
                                    <td className="qna_write_content" name="review_date">
                                        <input
                                            type="hidden"
                                            accept="image/*"
                                            name="review_date"
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

