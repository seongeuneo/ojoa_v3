import React from "react";
import { useState, useRef, useContext, useEffect } from "react";
import "./QnaModal.css";
import axios from "axios"; // axios import 추가
import { useProductList } from '../../ProductList/useProductList';

function QnaModal({ closeModal, onFilterChange, status, qnaSeq, name, userId }) {
    const [qnaInfo, setQnaInfo] = useState({
        qna_seq: qnaSeq,
        prod_num: '',
        name: name,
        id: userId,
        qna_category: '',
        qna_title: '',
        qna_content: '',
    });

    const data = useProductList();

    const [content, setContent] = useState("");
    // => new 일정 처리할  onChangeContent 이벤트 핸들러 
    const onChangeContent = (e) => {
        setContent(e.target.value);
    }; //onChangeContent

    //여기서부터 원희코드
    const onSubmit = async (e) => {

        try {
            const formData = new FormData(document.getElementById('qnaform'));
            // 'content'와 다른 폼 데이터를 백엔드로 보내고 싶다고 가정합니다.

            // Spring Boot API 엔드포인트로 POST 요청을 보냅니다.
            //기존
            const response = await axios.post("/api/qna/saveQna/", formData,
                { headers: { "Content-Type": "application/json" } });

            // 성공/실패에 따라 처리합니다.
            console.log("데이터 저장됨:", response.data);
            closeModal(false);
            onFilterChange();
        } catch (error) {
            // 에러 처리
            console.error("데이터 저장 중 에러:", error);
            // 선택적으로 사용자에게 에러 메시지 표시 가능
        }
        e.preventDefault();

    };

    const getQnaInfo = () => {
        axios
            .get(`/api/qna/selectQnaList?qna_seq=${qnaSeq}`)
            .then((response) => {
                let data = response.data;
                if (data != null && data !== "") {
                    setQnaInfo(prevQnaInfo => ({
                        ...prevQnaInfo,
                        prod_num: data.prod_num,
                        name: data.id,
                        qna_category: data.qna_category,
                        qna_title: data.qna_title,
                        qna_content: data.qna_content,
                    }));
                }
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    };

    useEffect(() => {
        console.log('QnaModal 렌더링됨');
        if (status === 'update' && qnaSeq) {
            getQnaInfo();
        }
    }, ['update', qnaSeq]);

    const handleQnaInfo = (e) => {
        const { name, value } = e.target;
        setQnaInfo({ ...qnaInfo, [name]: value });
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
                        <h2>Q & A</h2>
                    </div>


                    <form className="qna_write_info" action="" method="post" id="qnaform">
                        <table className="qna_board_table">
                            <caption className="qna_writename">자유게시판 글쓰기</caption>
                            <tbody>
                                <tr>
                                    <th scope="row"><label htmlFor="qna_bID" >작성자</label></th>
                                    <td className="qna_writeid" name="id">
                                        <input
                                            type="text"
                                            name="id"
                                            id="qna_bID"
                                            onChange={onChangeContent}
                                            placeholder="작성자명을 입력하세요."
                                            value={qnaInfo.id} />
                                    </td>
                                </tr>

                                <tr>
                                    <th scope="row"><label htmlFor="board_category1">카테고리</label></th>
                                    <td className="qna_writetitle">
                                        <select name="qna_category" id="board_category1" onChange={handleQnaInfo} value={qnaInfo.qna_category}>
                                            <option value="1">전체</option>
                                            <option value="상품문의">상품문의</option>
                                            <option value="배송문의">배송문의</option>
                                            <option value="주문/결제">주문/결제</option>
                                            <option value="취소문의">취소문의</option>
                                            <option value="반품/교환">반품/교환</option>
                                            <option value="환불문의">환불문의</option>
                                            <option value="재입고문의">재입고문의</option>
                                            <option value="기타문의">기타문의</option>
                                        </select>
                                        <select name="prod_kind" id="board_category2" >
                                            <option>제품목록</option>
                                            {data.map((item) => (
                                                <React.Fragment key={item.id}>
                                                    <option value={item.imgNo}>{item.productName}</option>
                                                </React.Fragment>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><label htmlFor="qna_bTitle" name="qna_title">제  목</label></th>
                                    <td className="qna_writetitle" name="qna_title">
                                        <input
                                            type="text"
                                            name="qna_title"
                                            id="qna_bTitle"
                                            placeholder="제목을 입력하세요."
                                            onChange={handleQnaInfo} value={qnaInfo.qna_title} />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row"><label htmlFor="qna_bContent">내  용</label></th>
                                    <td className="qna_write_content" name="qna_content">
                                        <input
                                            type="text"
                                            name="qna_content"
                                            id="qna_bContent"
                                            placeholder="내용을 입력하세요."
                                            onChange={handleQnaInfo} value={qnaInfo.qna_content} />
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
    );
}

export default QnaModal;