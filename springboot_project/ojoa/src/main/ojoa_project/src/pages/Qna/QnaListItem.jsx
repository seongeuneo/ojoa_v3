import './Qna.css';
import React, { useState } from 'react';
import Modal from 'react-modal';
import QnaModal from './QnaModal/QnaModal';
import QnaWriteBtn from './QnaWriteBtn';

// 배열 속성 writer 입력시 성만 따오기
const lastName = (fullName) => {
    // if (fullName.length > 0) {
    //     return fullName.charAt(0);
    // }
    // fullName이 비어있을 때 처리할 내용을 추가할 수 있습니다.
    return 'A';
};

const QnaListItem = ({ qnaList, filters, onFilterChange }) => {
    const [expandedId, setExpandedId] = useState(null);

    const loggedInUserString = sessionStorage.getItem('loggedInUser');
    const loggedInUserObject = JSON.parse(loggedInUserString);
    const userId = loggedInUserObject?.id;

    const [replyContents, setReplyContents] = useState({});
    const [updatedQnaList, setUpdatedQnaList] = useState(qnaList); // 여기서 새로운 상태 추가

    console.log(qnaList);

    const handleTitleClick = (id, readable, admin) => {
        if (expandedId === id) {
            setExpandedId(null);
        } else {
            setExpandedId(id);
        }

        if (!readable) {
            //alert(`작상자만 볼 수 있습니다.`)
        }
    };

    const [qnaSeq, setqnaSeq] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = (data) => {
        setqnaSeq(data)
        setModalIsOpen(true);
    }
    const closeModal = () => setModalIsOpen(false);



    function formatDate(originalDate) {
        const dateObject = new Date(originalDate);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        const hours = String(dateObject.getHours()).padStart(2, '0');
        const minutes = String(dateObject.getMinutes()).padStart(2, '0');

        return `${year}.${month}.${day} ${hours}:${minutes}`;
    }

    // 내용 필터링
    qnaList = qnaList.filter((item) => {
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

    // 익명처리
    function maskString(inputString) {
        if (typeof inputString !== 'string') {
            throw new Error('Input must be a string');
        }
        const maskedPart = inputString.slice(0, 1) + '***';
        return maskedPart;
    }



    //=========================================================================


    return (
        <><tbody className='qna_ListItem_container'>
            {qnaList.map((item, i) => (
                <React.Fragment key={i}>
                    {
                        (item.category === "공지사항") ? (
                            <tr className='qna_Tboard_st'>
                                <td className='qna_board_st1'>{item.num}</td>
                                <td className='qna_Tboard_st2'>{item.itemInfo}</td>
                                <td className='qna_board_st3'>{item.category}</td>
                                <td className='qna_board_st4'>
                                    <a className='title_button' onClick={() => handleTitleClick(i)}>{item.title}</a>
                                </td>
                                <td className='qna_board_st5'>{item.writer}</td>
                                <td className='qna_board_st6'>{formatDate(item.date)}</td>
                            </tr>
                        ) : (
                            <tr className='qna_Lboard_st'>
                                <td className='qna_board_st1'>{item.num}</td>
                                <td className='qna_Lboard_st2'>
                                    <div><img className='qna_img' src={`../thumbs/${item.imgNo}`} alt='상품' /></div>
                                    <div>{item.itemInfo}</div>
                                </td>
                                <td className='qna_board_st3'>{item.category}</td>
                                <td className='qna_board_st4'>
                                    <a className='title_button' onClick={() => handleTitleClick(i)}>{item.title}</a>
                                </td>
                                <td className='qna_board_st5'>
                                    {item.readable && <span style={{ color: 'blue' }}>{item.writer}</span>}
                                    {!item.readable && maskString(item.writer)}
                                </td>
                                <td className='qna_board_st6'>{formatDate(item.date)}</td>
                            </tr>
                        )}

                    {expandedId === i && (
                        <>
                            {(userId === 'admin' || userId === item.writer) && (
                                <tr className='qna_board_st7'>
                                    <td colSpan="8" className='notification_row'>
                                        <p>[문의 내용] : {item.notification}</p>
                                        <p>[답변내용] : {item.titleIcon}</p>
                                    </td>
                                </tr>
                            )}
                            {(userId === 'admin' || userId === item.writer) && (
                                <tr className='qna_board_st7'>
                                    <td colSpan="8" style={{ textAlign: 'right', lineHeight: '50px' }}>
                                        <button className='qna_board_find_btn' onClick={() => openModal(item.num)}>글수정하기</button>
                                    </td>
                                </tr>
                            )}
                        </>
                    )}
                </React.Fragment>
            ))}
        </tbody>
            <Modal className="ModalContent" isOpen={modalIsOpen} onRequestClose={closeModal}>
                <QnaModal closeModal={closeModal} onFilterChange={onFilterChange} status={'update'} qnaSeq={qnaSeq} userId={userId} />
            </Modal></>
    );
} //QnaListItem

export default QnaListItem;