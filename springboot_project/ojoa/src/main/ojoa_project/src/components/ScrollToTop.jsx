    import { useEffect } from "react";
    import { useLocation } from "react-router-dom";


    // ** 페이지 이동시 스크롤 맨 위로 이동 시키는 컴포넌트 ** //

    export default function ScrollToTop() { // 함수형 컴포턴트 정의, 다른곳에서 import 가능.

        const { pathname } = useLocation(); // 현재 페이지를 경로를 pathname 변수에 저장.

        useEffect(() => {
            window.scrollTo({ top: 0, behavior: 'instant' }); //top 0 으로 즉시 이동.
        }, [pathname]);
        // useEffect 훅으로 컴포넌트가 렌더링 때마다 실행되는 콜백 함수로
        // window.scrollTo 메서드를 호출, 스크롤을 페이지 맨위로 이동시킴.

        return null;
        // 항상 뭔가를 return 해야 하기 때문에, 
        // null 을 반환. 이 값은 레더링 되지 않음.

    };