import React, { useState } from "react";
import "./ProductDetail.css";
import Modal from 'react-modal';
import QModal from './Modal/QModal';

function ProdQna03() {
  
    // // 모달창 띄우기
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    return (
        <div className="ProdQna03">
            {/* <!-- main product detail --> */}
            <div className="container">
                {/* <!-- product detail dt 로 요약 --> */}
                <table className="pd_qna">

                    <tbody>
                        <tr>
                            <td>게시물이 없습니다</td>
                        </tr>
                        <tr>
                            <th>
                                <a onClick={openModal}>상품문의하기 </a>
                                <Modal className="ModalContent" isOpen={modalIsOpen} onRequestClose={closeModal}>
                                    <QModal closeModal={closeModal} />
                                </Modal>
                                <a>모두보기</a>
                            </th>
                        </tr>

                    </tbody>
                </table>
            </div>

        </div>
    )
};

export default ProdQna03;