import '../../pages/Main/Main.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const MiniItems = ({ content }) => {
    const [imageSrc, setImageSrc] = useState("./images/emptyheart.png"); // 초기 상태는 선택이 되지 않은 상태를 나타내기 위함
    const [isClicked, setIsClicked] = useState(false); // 클릭 여부를 state로 관리

    // 로그인 & 비로그인
    const sessionInfo = JSON.parse(sessionStorage.getItem('loggedInUser')); // 세션에서 로그인 정보 가져오기

    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태에 따른 nav바 변경

    // 세션 정보를 확인하여 로그인 상태를 설정하는 로직 추가
    useEffect(() => {
        const sessionInfo = sessionStorage.getItem('loggedInUser'); // 세션에서 로그인 정보 가져오기
        setIsLoggedIn(!!sessionInfo); // 세션 정보가 있으면 true, 없으면 false로 설정
    }, []);


    const handleClick = () => {
        if (isClicked) {
            setImageSrc("./images/emptyheart.png");
            setIsClicked(false); // 초기 상태 false 일 땐 초기 상태 이미지 src
        } else {
            setImageSrc("./images/fullheart.png");
            setIsClicked(true); // true일 땐 변경될 이미지 src
        }
    };

    /// ====================================================================================== 
    function AddWishIcon() {
        // 관심상품 이미지 클릭 시 실행되는 함수

        const productData = { prod_num: content.prod_num }; // 상품 정보를 담은 객체

        axios.post('/api/wish/saveWish', productData) // POST 요청으로 수정 및 상품 정보 전달
            .then(response => {
                // 요청 성공 시 처리할 작업
                console.log("관심상품 담기" + response.data);
                // const currentWishlist = response.data; // 현재 관심 상품 목록
                const currentWishlist = Array.isArray(response.data) ? response.data : [];
                const isProductExists = currentWishlist.some(item => item.prod_num == productData.prod_num);

                if (isProductExists) {
                    // 이미 관심목록에 있는 상품이라면 alert 창 띄우기
                    alert("이미 관심목록에 있는 상품입니다.");
                } else {
                    // prod_num이 중복되지 않는다면 상태 업데이트
                    console.log("서버연결성공 => ", currentWishlist);
                    alert("해당 상품이 관심목록에 추가되었습니다.");
                    // handleWishClick();
                }
            })
            .catch(error => {
                // 요청 실패 시 처리할 작업
                console.error('관심상품 추가 중 오류:', error);
                // 에러 상태 코드에 따라 처리
                if (error.response && error.response.status === 400) {
                    alert("이미 관심목록에 있는 상품입니다.");
                } else {
                    // alert("상품을 관심목록에 추가하는데 문제가 발생했습니다.");
                }
            });

    };

    // 모달 열기 함수
    const checkLogin = () => {

        if (isLoggedIn === true) {
            AddWishIcon();
        } else {
            alert('로그인이 필요합니다.');
        }
    };



    return (
        <div className="MiniItems">

            <div className="MiniItembox">
                <Link to={`/ProductDetail/${content.prod_num}/DetailInfo01`} state={{ productData: content }}>
                    <div className="colsection">
                        <div className="img_top">OJOA BEST ITEMS</div>
                        {/* <img className="colsec_img" src={"./images/sofa.jpg"} alt="소가죽소파" /> */}
                        <div className="colsec_img"><img src={`/thumbs/${content.prod_mainimage}`} /></div>
                        <div className="colsec_info">
                            <div className="colsec_mini">카테고리 : {content.prod_kind}<br />평점 : {content.prod_grade}</div>
                            <div className="colsec_name">{content.prod_name}</div>
                            <div className="colsec_price">{parseInt(content.prod_price1.toString().replace(/,/g, '')).toLocaleString()}원<sup>{content.prod_discount}%</sup></div>
                        </div>
                    </div>
                </Link>


                <img className="heartbtn"
                    src={imageSrc}
                    onClick={checkLogin}
                    alt="하트찜" />
            </div>

        </div >
    );
};

export default MiniItems;