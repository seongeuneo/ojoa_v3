import React, { useEffect, useState } from 'react';
import './TopButton.css';

// ** Y축 스크롤 top에서 100px 초과시 맨 위로 부드럽게 이동하는 컴포넌트 ** //

function TopButton() {
    const [showButton, setShowButton] = useState(false); // 초기값 false 설정.

    const scrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth',
        });
    }; // 스크롤이 top 0 위치로, 부드럽게 이동.

    useEffect(() => {
        const handleShowButton = () => {
            window.scrollY > 100 ? setShowButton(true) : setShowButton(false);
        }; // 스크롤 이벤트 감지. 위 0 시작으로 100px 초과 시 true.

        console.log("위에서 몇 픽셀이나 내려갔니? => ", window.scrollY);
        
        window.addEventListener('scroll', handleShowButton); // 스크롤 위치가 100px 을 넘으면 버튼이 보이고, 아니면 숨김.
        return () => {
            window.removeEventListener('scroll', handleShowButton);
        }; // return 으로 컴포넌트가 언마운트 되거나 업데이트 발생 시 스크롤 이벤트 리스너를 제거.
    }, []); 

    return (
        showButton && ( // showButton 이 true 일때 렌더링됨. onClick 핸들러로 클릭 시 스크롤 상위로 이동 실행.
            <div>
                <button className="Top_Btn_scroll" onClick={scrollToTop}><img className="btn_top" src="/images/btn_top.png" alt="TopBtn"/></button>
            </div>
        )
    );
};

export default TopButton;