import React, { useState, useEffect } from "react";
import "./Wish.css";
import { Link } from "react-router-dom"
import axios from "axios";



function Wish() {
    // Spring Boot 연결
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("/bbb/aaa")
            .then((response) => {
                setData(response.data);
                console.log("서버연결성공 => ", response.data);
            }).catch((error) => {
                //  alert(error);
                console.log(error)
            });
    }, []);

    console.log("data ::::" + data);


    return (
        <div className="Wish">
            <div className="path">
                <span>현재 위치</span>
                <ol>
                    <li><Link to="/">홈</Link></li>
                    <li title="현재 위치">&gt; &nbsp;&nbsp;Wish</li>
                </ol>
            </div>
            <div className="pageTlt">
                <h2>WISHLIST</h2>
                <div className="txt_01">관심상품</div>
            </div>
            {/*  관심목록페이지/wish페이지  */}
            <div className="container">
                <div id="wish_backbody">
                    <div id="wish_frame">
                        {/* <form>
                            <p>{data.map((item) =>
                                item.wish_num)}</p>
                        </form> */}
                    </div>
                </div>

            </div>

        </div>

    )
};

export default Wish;