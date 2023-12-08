import React from "react";
import "./QModal.css";
import { useState } from "react";
import { useParams } from "react-router-dom"
import mockList from '../../../data/ItemsData'





function QModal({ closeModal }) {

    // 상품목록리스트에서 id 값에 따라 상품 상세 반영하기
    const { mockList_id } = useParams();
    const indiItem = mockList.filter((content) => content.id === parseInt(mockList_id))
    const { id, imgNo, productName, productPriceFormatted, productPromotion, productInfo, productReview, productGrade } = indiItem[0]

    // //리뷰 내용 부모 컴포넌트에 전달하기
    // const [textValue, setTextValue] = useState('');

    // const handleTextareaChange = (event) => {
    //     const newTextValue = event.target.value;
    //     setTextValue(newTextValue);
    //     onReviewTextChange(newTextValue); // 부모 컴포넌트로 전달
    // };
    const [localQuestText, setLocalQuestText] = useState(''); // QModal 내부에서 사용하는 리뷰 내용 상태

    const handleLocalQuestTextChange = (text) => {
        setLocalQuestText(text);
    };

    // 리뷰 내용 자식모달 컴포넌트에서 값 받아오기
   // 리뷰 값 받아온 것을 mockList에 추가하기
   const [questss, setQuests] = useState([]);

   const handleQuestTextChange = (questText) => {
       const newQuest = {
           title: '새 리뷰', // 필요한 속성 추가
           writer: '사용자', // 필요한 속성 추가
           createDate: new Date().toLocaleDateString(), // 필요한 속성 추가
           check: 0, // 필요한 속성 추가
           content: questText // 사용자 리뷰 내용 추가
       };
       setQuests([...questss, newQuest]); // 리뷰 목록에 새 리뷰 추가
   };

   
    const handleAddQuest = () => {
        handleQuestTextChange(localQuestText); // 리뷰 내용을 부모 컴포넌트로 전달
        closeModal();
    };





    return (
        <div className="QModal">
            <form id="review_write_info" action="" method="post">

                <div className="close_pannel">
                    <div className="title">상품 문의</div>
                    <button type="button" className="btn close" onClick={closeModal}>
                        <img src="https://cdn.snapfit.co.kr/review/images/close.png"></img>
                    </button>
                </div>
                <div className="popup_wrapper">
                    <div className="sf_order_list_wrap">
                        <span className="owl-carousel-nav prev"></span>
                        <div className="sf_order_item">
                            <div className="thumbnail"> <img src={`/thumbs/${imgNo}_1.jpg`} className="" />
                            </div>
                            <div className="sf_buy_option">
                                <div className="sf_review_item_name sf_one_line">{productName}</div>
                                <div className="sf_review_user_useally_selected_option sf_one_line">
                                    <div id="" className="option">
                                        <span className="size_wrap">
                                            <span className="key">상품코드</span><span className="separ"> : </span>
                                            <span className="value">0000{id}</span>
                                        </span>
                                        <span className="unit"></span>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="sf_write_wrap"><div className="sf_write"> <p className="title">내용을 적어주세요</p> <input className="default_value" name="review_default_text" type="hidden" value="" />
                            <textarea
                                className="value"
                                placeholder="궁금하신 점을 적어주세요. :)"
                                name="quest_text"
                                value={localQuestText}
                                onChange={(e) => handleLocalQuestTextChange(e.target.value)}></textarea> </div>
                        </div>

                        <div className="sf_popup_bottom">
                            <button type="button" className="btn later" onClick={closeModal}>나중에 하기</button>
                            <button type="button" className="btn write" onClick={handleAddQuest}>등록</button>
                        </div>

                    </div>
                </div>
            </form>

        </div>
    )
};

export default QModal;