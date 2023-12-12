import './Qna.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";

// 배열 속성 writer 입력시 성만 따오기
const lastName = (fullName) => {
    //     if (fullName.length() > 0) {
    //        return fullName.charAt(0);
    //    };
    return 'A';
};

const QnaListItem = ({ qnaList, filters }) => {
    const [expandedId, setExpandedId] = useState(null);
    const [replyContents, setReplyContents] = useState({});
    const [updatedQnaList, setUpdatedQnaList] = useState(qnaList); // 여기서 새로운 상태 추가

    console.log(qnaList);
    const handleTitleClick = (id) => {
        if (expandedId === id) {
            setExpandedId(null);
        } else {
            setExpandedId(id);
        }
    };

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



<<<<<<< HEAD
=======

//=========================================================================





>>>>>>> main
    return (
        <tbody className='qna_ListItem_container'>
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
                                    <div><img src={`../thumbs/${item.imgNo}_1.jpg`} alt='상품' /></div>
                                    <div>{item.itemInfo}</div>
                                </td>
                                <td className='qna_board_st3'>{item.category}</td>
                                <td className='qna_board_st4'>
                                    <a className='title_button' onClick={() => handleTitleClick(i)}>{item.title}</a>
                                </td>
                                <td className='qna_board_st5'>{(item.writer)}&#42;&#42;</td>
                                <td className='qna_board_st6'>{formatDate(item.date)}</td>
                            </tr>
                        )
                    }
<<<<<<< HEAD
                    {expandedId === i && (
=======
                    {/* {expandedId === i && (
>>>>>>> main
                        <tr className='qna_board_st7'>
                            <td colSpan="8" className='notification_row'>
                                {item.notification}
                            </td>
                        </tr>
<<<<<<< HEAD
=======
                    )} */}
                    {expandedId === i && (
                        <tr className='qna_board_st7'>
                            <td colSpan="8" className='notification_row'>
                            <p>[문의 내용] : {item.notification}</p>
                            <p>[답변내용] : {item.titleIcon}</p>
                            </td>
                        </tr>
>>>>>>> main
                    )}
                </React.Fragment>
            ))}


        </tbody>
    );
} //QnaListItem

export default QnaListItem;