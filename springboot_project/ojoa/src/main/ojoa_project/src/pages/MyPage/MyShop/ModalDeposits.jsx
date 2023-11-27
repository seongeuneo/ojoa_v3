import React, { useState } from 'react';
import ModalBasic from './ModalBasic';
import './ModalBasic.css';

function ModalDeposits() {
    const [modalOpen, setModalOpen] = useState(false);

    const showModal = () => {
        setModalOpen(true);
    };

    const closeCurrentModal = () => {
        setModalOpen(false);
    };

    return (
        <div className='SearchModal_container'>
            <button onClick={showModal}>Open Modal 1</button>
            {modalOpen && (
                <ModalBasic isOpen={modalOpen} onClose={closeCurrentModal}>
                    {/* 내용을 추가 */}
                    <p>This is the content for Modal 1.</p>
                </ModalBasic>
            )}
        </div>
    );
}

export default ModalDeposits;