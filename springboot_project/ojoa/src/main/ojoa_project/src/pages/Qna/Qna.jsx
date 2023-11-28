// import React from 'react';
import { ModalProvider } from './QnaModal/ModalContext';
import './Qna.css';
import QnaPage from './QnaPage';
import QnaFilter from './QnaFilter';
import QnaListItem from './QnaListItem';
import QnaTitleList from './QnaTitleList';
import Modal from 'react-modal';
import QnaWriteBtn from './QnaWriteBtn';
import React, { useMemo, useCallback, useReducer, useRef, useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";




Modal.setAppElement('#root');

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

// 1) Context 생성
// => 불필요한 랜더링을 방지하여 최적화 하기위해 
//    Context 를 역할별로 분리한다.
export const TodoStateContext = React.createContext();
// => todo 의 변경에 영향받는 컴포넌트를 위한 Context 
export const TodoDispatchContext = React.createContext();
// => dispath 함수 onCreate, onUpdate, onDelete 의 변경에
//    영향받는 컴포넌트를 위한 Context


//=========================================================
function Qna() {


    // ** Local Storage 적용 1
    // => LocalStorage 의 Data 읽어, todo 초기화 하기  
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

    // ** 일정추가 (Create) 함수 생성
    const onCreate = (title) => {
        dispatch({
            type: "Create",
            newItem: {
                id: idRef.current,
                title: title,
            }
        }); //dispatch
        idRef.current += 1;
    }; //onCreate ( useCallback 을 적용하지않음 )

    // ** TodoDispatchContext.Provider value 속성값
    //    onCreate, onUpdate, onDelete 함수 최적화
    // => 처음 한번만 (TodoList가 처음 리랜더링 될때) 실행되도록 메모이제이션 
    const memoizedDispatches = useMemo(() => {
        return { onCreate };
    }, []);
    //=========================================================




    // 게시판 필터
    const [filters, setFilters] = useState({ category: "", date: "", key: "", query: "" });

    const qnaList = [
        {
            num: '공지',
            imgNo: '-',
            itemInfo: '-',
            category: '-',
            title: '리뷰작성 포인트 적립안내',
            notification: '첫번째 공지 입니다. 아 리액트 빡치네.. 서터레스...',
            titleIcon: '[16]',
            writer: 'ojoa',
            date: '2023.03.23'
        },
        {
            num: '공지',
            imgNo: '-',
            itemInfo: '-',
            category: '-',
            title: 'ojoa 온라인몰 배송관련 안내',
            notification: '새로운 공지 입니다. 때려칠까',
            titleIcon: '[10]',
            writer: 'ojoa',
            date: '2023.07.23'
        },
        {
            num: 1,
            imgNo: 5,
            itemInfo: '[이끼 의자]',
            category: '상품문의',
            title: '물 줘도 되나요?',
            notification: '제가 살아 있는 생물만 구매하는 주의라서요. 신선 배송 되겠죠? 서울인데 새벽배송 가능하죠?',
            titleIcon: '[1]',
            writer: '오원희',
            date: '2023.08.18'
        },
        {
            num: 2,
            imgNo: 13,
            itemInfo: '[철의 왕좌]',
            category: '상품문의',
            title: '가격이... 혹시 정품 인가요?',
            notification: '왕좌의 게임에 나오는 철의 왕좌 같은데요... 정품 인가요? 예전에 중국산을 속아서 산적이 있어서요...',
            titleIcon: '[1]',
            writer: '어성은',
            date: '2023.08.19'
        }, {
            num: 3,
            imgNo: 14,
            itemInfo: '[희상 의자]',
            category: '주문/결제',
            title: '주문하려고 하는데 240개월 할부가 되나요?',
            notification: '카드사 별로 얼마나 할부되는지 궁금해요.',
            titleIcon: '[1]',
            writer: '유희상',
            date: '2023.08.05'
        },
        {
            num: 4,
            imgNo: 15,
            itemInfo: '[원희 의자]',
            category: '상품문의',
            title: '손가락은 꺾이나요?',
            notification: '손가락이 꺾여서 팔받침으로 사용할 수 있는 건가요?',
            titleIcon: '[1]',
            writer: '이진기',
            date: '2023.07.05'
        },
        {
            num: 5,
            imgNo: 16,
            itemInfo: '[성은 의자]',
            category: '배송문의',
            title: '먹을 수 있나요?',
            notification: '아무리 봐도 바게트 같은.....? 배송은 언제쯤 가능한가요?',
            titleIcon: '[1]',
            writer: '오원희',
            date: '2023.06.19'
        },
        {
            num: 6,
            imgNo: 12,
            itemInfo: '[푸바오 의자]',
            category: '상품문의',
            title: '손가락은 꺾이나요?',
            notification: '손가락이 꺾여서 팔받침으로 사용할 수 있는 건가요?',
            titleIcon: '[1]',
            writer: '그린컴',
            date: '2023.05.18'
        }

    ]; // qnaList


    // 한 페이지당 몇 개의 글을 보여줄 것인지 정의
    const itemsPerPage = 10;

    // 현재 페이지 상태와 페이지 변경 함수
    const [currentPage, setCurrentPage] = useState(1);

    // 현재 페이지에 해당하는 게시물 선택
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pagedQnaList = qnaList.slice(startIndex, endIndex);

    

    return (
        <ModalProvider>
            <div className="Qna">
                <TodoStateContext.Provider value={todo}>
                    <TodoDispatchContext.Provider value={memoizedDispatches}>
                        {/* <TodoDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>  
            => cONTEXT 분리 했어도 최적화 적용 되지 않음  */}
                        <QnaPage />
                        <QnaFilter setFilters={setFilters} />
                        <table className="qna_ListItem_container">
                            <QnaTitleList />
                            <QnaListItem qnaList={pagedQnaList} filters={filters} />
                        </table>
                        <QnaWriteBtn />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(qnaList.length / itemsPerPage)}  // 전체 페이지 수 계산
                            onPageChange={setCurrentPage}
                        />
                    </TodoDispatchContext.Provider>
                </TodoStateContext.Provider>
            </div>
        </ModalProvider>
    );
}

export default Qna;