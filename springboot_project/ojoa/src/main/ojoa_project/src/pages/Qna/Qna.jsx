import { ModalProvider } from './QnaModal/ModalContext';
import './Qna.css';
import QnaPage from './QnaPage';
import QnaFilter from './QnaFilter';
import QnaListItem from './QnaListItem';
import QnaTitleList from './QnaTitleList';
import Modal from 'react-modal';
import QnaWriteBtn from './QnaWriteBtn';
import React, { useMemo, useReducer, useRef, useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import axios from 'axios';


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

    // 게시판 필터
    const [filters, setFilters] = useState({ category: "", date: "", key: "", query: "" });


    // 한 페이지당 몇 개의 글을 보여줄 것인지 정의
    const itemsPerPage = 10;

    // 현재 페이지 상태와 페이지 변경 함수
    const [currentPage, setCurrentPage] = useState(1);

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

    // 전체 요청
    const allQnaList = () => {
        axios
            .get("/api/qna/allQnaList")
            .then((response) => {
                console.log(`*****qnaList : ${response.data}`);
                console.dir(response.data)
                setQnaList(response.data);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    };

    // Springboot 요청
    useEffect(() => {
        allQnaList();
    }, []);

    // 현재 페이지에 해당하는 게시물 선택
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pagedQnaList = qnaList.slice(startIndex, endIndex);


    return (
        <ModalProvider>
            <div className="Qna">
                <TodoStateContext.Provider value={todo}>
                    <TodoDispatchContext.Provider value={memoizedDispatches}>
                        <QnaPage />
                        <QnaFilter setFilters={setFilters} onFilterChange={handleFilterChange} />
                        <table className="qna_ListItem_container">
                            <QnaTitleList />
                            <QnaListItem qnaList={pagedQnaList} filters={filters} onFilterChange={allQnaList} />
                        </table>
                        <QnaWriteBtn onFilterChange={allQnaList} />
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