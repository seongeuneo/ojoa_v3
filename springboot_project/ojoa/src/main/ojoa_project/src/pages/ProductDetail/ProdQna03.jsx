import React, { useState, useEffect, useReducer, useRef } from "react";
import axios from "axios";
import "./ProductDetail.css";
import Modal from 'react-modal';
import QModal from './Modal/QModal';
import { useLocation } from "react-router-dom";

function ProdQna03() {
    // // 모달창 띄우기
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

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

    // ** Local Storage 적용 1
    // => LocalStorage 의 Data 읽어, todo 초기화 하기  
    const [todo, dispatch] = useReducer(reducer, []);
    const [qnaList, setQnaList] = useState([]);

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

    // 게시판 필터
    const [filters, setFilters] = useState({ category: "", date: "", key: "", query: "" });

    // 필터조건 요청
    const handleFilterChange = (filterValue) => {
        axios.get('/api/qna/allQnaList', { params: filterValue })
            .then(response => {
                setQnaList(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    // Springboot 요청
    useEffect(() => {
        axios
            .get("/api/qna/allQnaList")
            .then((response) => {
                setQnaList(response.data);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }, []);

    // 배열 속성 writer 입력시 성만 따오기
    const lastName = (fullName) => {
        if (fullName.length > 0) {
            return fullName.charAt(0);
        }
        // fullName이 비어있을 때 처리할 내용을 추가할 수 있습니다.
    };

    // 한 페이지당 몇 개의 글을 보여줄 것인지 정의
    const itemsPerPage = 10;
    // 현재 페이지 상태와 페이지 변경 함수
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    let pagedQnaList = qnaList.slice(startIndex, endIndex);

    const [expandedId, setExpandedId] = useState(null);

    const handleTitleClick = (id) => {
        if (expandedId === id) {
            setExpandedId(null);
        } else {
            setExpandedId(id);
        }
    };

    // 내용 필터링
    pagedQnaList = pagedQnaList.filter((item) => {
        if (filters.category && item.category != filters.category)
            return false;

        //모든기간 필터
        if (filters.date) {
            const date = new Date(item.date);
            const diff_days = ((new Date()) - date) / 1000 / 60 / 60 / 24;
            if (filters.date == "week" && diff_days > 7)
                return false;
            else if (filters.date == "month" && diff_days > 30)
                return false;
            else if (filters.date == "month3" && diff_days > 90)
                return false;
        }

        //제목 필터
        if (filters.key && filters.query) {
            if (filters.key == "subject" && !item.title.includes(filters.query))
                return false;
            else if (filters.key == "content" && !item.notification.includes(filters.query))
                return false;
            else if (filters.key == "writer_name" && !item.writer.includes(filters.query))
                return false;
            else if (filters.key == "product" && !item.itemInfo.includes(filters.query))
                return false;
        }

        return true;
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
                            {/* <th>상품번호</th>*/}
                            <th>상품이미지</th>
                            <th>문의 제목</th>
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
                                            <td>{item.itemInfo}</td>
                                            {/* <td>{item.category}</td> */}
                                            <td>
                                                <a className='title_button' onClick={() => handleTitleClick(i)}>{item.title}</a>
                                            </td>
                                            <td>{item.writer}</td>
                                            <td>{item.date}</td>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <td>{item.num}</td>
                                            <td>
                                                <div><img src={`${item.imgNo}`} alt='상품' /></div>
                                                <div>{item.itemInfo}</div>
                                            </td>
                                            {/* <td>{item.category}</td> */}
                                            <td>
                                                <a onClick={() => handleTitleClick(i)}>{item.title}</a>
                                            </td>
                                            <td>{lastName(item.writer)}&#42;&#42;</td>
                                            <td>{item.date}</td>
                                        </tr>
                                    )
                                }
                                {expandedId === i && (
                                    <tr>
                                        <td colSpan="8">
                                            {item.notification}
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                        <tr>
                            <th colspan="7">
                                <a onClick={openModal}>상품문의하기 </a>
                                <Modal className="ModalContent" isOpen={modalIsOpen} onRequestClose={closeModal}>
                                    <QModal closeModal={closeModal} />
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