import React, { useCallback, useState, useRef } from "react";
import "../Qna/Qna.css";
import Modal from 'react-modal';
import QnaModalModify from "./QnaModal/QnaModalModify";


const QnaModifyBtn = ({ onFilterChange }) => {

    const loggedInUserString = sessionStorage.getItem('loggedInUser');
    const loggedInUserObject = JSON.parse(loggedInUserString);
    const name = loggedInUserObject?.name;
    const userId = loggedInUserObject?.id;

    // // 모달창 띄우기
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    return (

        <div className="qna_modify_btn">
            <a onClick={openModal}>글수정하기</a>
            <Modal className="ModalContent" isOpen={modalIsOpen} onRequestClose={closeModal}>
                <QnaModalModify closeModal={closeModal} onFilterChange={onFilterChange} status={'insert'} name={name} userId={userId} />
            </Modal>
        </div>
    );
};

export default QnaModifyBtn;