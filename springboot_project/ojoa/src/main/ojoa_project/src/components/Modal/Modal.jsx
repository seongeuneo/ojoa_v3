import { useState } from 'react';
import ModalBasic from './ModalBasic';
import './ModalBasic.css';

// ** 모달을 노출하는 컴포넌트 ** //

function Modal() {

    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    // isSearchModalOpen 상태 변수.
    // setIsSearchModalOpen 을 useState 훅을 사용하여 초기값 false 설정. 모달창 노출 여부 state.

    const openSearchModal = () => {
        setIsSearchModalOpen(true);
    }; // setIsSearchModalOpen 함수 사용으로, isSearchModalOpen 상태를 true로 변경 => 모달창 노출.

    return (
        <div className='SearchModal_container'>
            <img className='header_search' onClick={openSearchModal} src="/images/btn_search.png" alt="search" />
            {/* search 버튼 클릭 openSearchModal 함수 실행 */}

            {isSearchModalOpen && <ModalBasic setModalOpen={setIsSearchModalOpen} />}
            {/* isSearchModalOpen 이 true 일때 <ModalBasic> 컴포넌트 렌더링 되며, 
                setModalOpen prop 을 통해 setIsSearchModalOpen 함수를 전달하여 모달이 닫힐때 상태를 업데이트함. */}
        </div>
    );
}

export default Modal;