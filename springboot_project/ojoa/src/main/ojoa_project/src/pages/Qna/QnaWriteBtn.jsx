import React, { useCallback, useState, useRef } from "react";
import "../Qna/Qna.css";
import Modal from 'react-modal';
import QnaModal from './QnaModal/QnaModal';


const QnaWriteBtn = ({ onFilterChange }) => {

    // // 모달창 띄우기
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    return (

        <div className="qna_write_btn">
            <a onClick={openModal}>글쓰기</a>
            <Modal className="ModalContent" isOpen={modalIsOpen} onRequestClose={closeModal}>
                <QnaModal closeModal={closeModal} onFilterChange={onFilterChange} />
            </Modal>
        </div>
    );
};

export default QnaWriteBtn;