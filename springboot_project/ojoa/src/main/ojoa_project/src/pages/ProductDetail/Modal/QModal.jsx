import React from "react";
import "./QModal.css";
import { useState, useEffect, useRef, useReducer } from "react";
import axios from "axios"; // axios import 추가





function QModal({ closeModal, pagedQnaList, productData }) {
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

    const [todo, dispatch] = useReducer(reducer, []);
    const idRef = useRef(0);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    // ** localData Loading
    // => Mount시 1회 실행 하도록 useEffect 에 빈 배열 전달
    useEffect(() => {
        const rawData = localStorage.getItem("todo");
        // => LocalStorage 의 Data 존재 확인
        if (!rawData) {
            setIsDataLoaded(true);
            return;
        }
        const localData = JSON.parse(rawData);
        if (localData.length === 0) {
            setIsDataLoaded(true);
            return;
        }
        // => localData 가 존재하면
        //  -> create시 id값 생성을 위한 idRef 값 할당
        //  -> Loading 된 Data를 State 변수 todo에 담기위해 dispatch 호출
        //  -> setIsDataLoaded(true) : Loading 완료됨 표시 
        idRef.current = localData.length;
        dispatch({ type: "INIT", dataList: localData });
        setIsDataLoaded(true);
    }, []); //useEffect 

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

    // axios Post 

    const onSubmit = async (e) => {
        try {
            const requestData = {
                prod_num: productData.prod_num, // 상품 번호
                id: 'user123', // 사용자 아이디 또는 다른 필요한 정보
                qna_category: '상품 문의', // 문의 카테고리
                qna_title: '질문 제목', // 질문 제목
                qna_content: localQuestText, // 사용자가 입력한 질문 내용
                qna_reply: '', // 빈 값으로 시작
                qna_redate: '', // 빈 값으로 시작
                qna_indate: '' // 빈 값으로 시작
                // 필요한 다른 데이터를 여기에 추가하세요
            };

            const response = await axios.post('/api/qna/saveQna/', requestData, {
                headers: {
                    'Content-Type': 'application/json' // 파일 업로드 등에 사용하는 경우 'multipart/form-data'
                    // 다른 경우에는 'application/json' 등 적절한 Content-Type을 설정
                }
            });

            console.log('데이터 저장됨:', response.data);
            // 성공적으로 데이터를 처리한 후에 할 작업들을 수행
            closeModal(false);
        } catch (error) {
            // 요청에 대한 에러를 콘솔에 출력하고 적절히 처리
            console.error('데이터 저장 중 에러:', error);
            // 사용자에게 에러 메시지를 표시할 수 있음
        }
        e.preventDefault();
        closeModal();
    };

    // const onSubmit = async (e) => {

    //     try {
    //         const formData = new FormData(document.getElementById('qnaform'));
    //         // 'content'와 다른 폼 데이터를 백엔드로 보내고 싶다고 가정합니다.

    //         // 다른 폼 필드를 여기에 추가하세요

    //         // Spring Boot API 엔드포인트로 POST 요청을 보냅니다.
    //         const response = await axios.post("/api/qna/saveQna/", formData,
    //             { headers: { "Content-Type": "application/json" } });

    //         // 성공/실패에 따라 처리합니다.
    //         console.log("데이터 저장됨:", response.data);
    //         closeModal(false);
    //     } catch (error) {
    //         // 에러 처리
    //         console.error("데이터 저장 중 에러:", error);
    //         // 선택적으로 사용자에게 에러 메시지 표시 가능
    //     }
    //     e.preventDefault();
    //     closeModal();
    // };



    return (
        <div className="QModal">

            <div className="close_pannel">
                <div className="title">상품 문의</div>
                <button type="button" className="btn close" onClick={closeModal}>
                    <img src="https://cdn.snapfit.co.kr/review/images/close.png"></img>
                </button>
            </div>
            <form className="" action="" method="post" id="qnaform">
                <div className="popup_wrapper">
                    <div className="sf_order_list_wrap">
                        <span className="owl-carousel-nav prev"></span>
                        <div className="sf_order_item">
                            <div className="thumbnail"> <img src={`${productData.prod_mainimage}`} alt={productData.prod_mainimage} />
                            </div>
                            <div className="sf_buy_option">
                                <div className="sf_review_item_name sf_one_line">상품명 : {productData.prod_name}</div>
                                <div className="sf_review_user_useally_selected_option sf_one_line">
                                    <div id="" className="option">
                                        <span className="size_wrap">
                                            <span className="key">상품코드</span><span className="separ"> : </span>
                                            <span className="value">{productData.prod_num}</span>
                                        </span>
                                        <span className="unit"></span>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="sf_write_wrap"><div className="sf_write"> <p className="title">내용을 적어주세요</p> <input className="default_value" name="notification" type="hidden" value="notification" />
                            <textarea
                                className="value"
                                placeholder="궁금하신 점을 적어주세요. :)"
                                name="notification"
                                value={localQuestText}
                                onChange={(e) => handleLocalQuestTextChange(e.target.value)}></textarea> </div>
                        </div>

                        <div className="sf_popup_bottom">
                            <button type="button" className="btn later" onClick={closeModal}>나중에 하기</button>
                            <button type="button" className="btn write" onClick={onSubmit}>등록</button>
                        </div>

                    </div>
                </div>
            </form>

        </div>
    )
};

export default QModal;