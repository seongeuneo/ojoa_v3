import '../../pages/Main/Main.css';
import React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";


const MiniItems = ({ id, imgNo, blacklabel, mini_1, mini_2, proname, proprice, sale, castle }) => {


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

    return (
        <div className="MiniItems">

            <div className="MiniItembox">
                <Link to={castle}>
                    <div className="colsection">
                        <div className="img_top">{blacklabel}</div>
                        {/* <img className="colsec_img" src={"./images/sofa.jpg"} alt="소가죽소파" /> */}
                        <div className="colsec_img"><img src={`../images/mini${imgNo}.jpg`} /></div>
                        <div className="colsec_info">
                            <div className="colsec_mini">{mini_1}<br />{mini_2}</div>
                            <div className="colsec_name">{proname}</div>
                            <div className="colsec_price">{proprice}<sup>{sale}</sup></div>
                        </div>
                    </div>
                </Link>
           

                <img className="heartbtn"
                    src={imageSrc}
                    onClick={handleClick}
                    alt="하트찜" />
             </div>

        </div >
    );
};

export default MiniItems;