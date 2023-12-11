import '../../pages/Main/Main.css';
import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useProductList } from '../ProductList/useProductList'

const MiniItems = ({ id, imgNo, blacklabel, mini_1, mini_2, proname, proprice, sale, castle }) => {
    const content = useProductList();

    const [imageSrc, setImageSrc] = useState("./images/emptyheart.png"); // 초기 상태는 선택이 되지 않은 상태를 나타내기 위함
    const [isClicked, setIsClicked] = useState(false); // 클릭 여부를 state로 관리

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
                    alert("해당 상품이 장바구니에 추가되었습니다.");
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
                    alert("상품을 관심목록에 추가하는데 문제가 발생했습니다.");
                }
            });

    };

    return (
        <div className="MiniItems">

            <div className="MiniItembox">
                <Link to={castle} state={{ productData: content }}>
                    <div className="colsection">
                        <div className="img_top">할인률: {blacklabel}%</div>
                        {/* <img className="colsec_img" src={"./images/sofa.jpg"} alt="소가죽소파" /> */}
                        <div className="colsec_img"><img src={`${imgNo}`} /></div>
                        <div className="colsec_info">
                            <div className="colsec_mini">카테고리 : {mini_1}<br />평점 : {mini_2}</div>
                            <div className="colsec_name">{proname}</div>
                            <div className="colsec_price">{proprice}<sup>{sale}</sup></div>
                        </div>
                    </div>
                </Link>


                <img className="heartbtn"
                    src={imageSrc}
                    onClick={AddWishIcon}
                    alt="하트찜" />
            </div>

        </div >
    );
};

export default MiniItems;