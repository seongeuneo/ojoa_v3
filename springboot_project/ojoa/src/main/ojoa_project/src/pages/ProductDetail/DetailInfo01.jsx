import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./ProductDetail.css";


function DetailInfo01() {
    const [data, setData] = useState([]);
    console.log("data는?" + data);

    useEffect(() => {
        axios
            .get('/api/prod_image/allProd_imageList')
            .then((response) => {
                setData(response.data);
                console.log("서버연결성공 => ", response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // console.log("data.prod_imagenum");



    return (
        <div className="DetailInfo01">
            {/* <!-- main product detail --> */}
            <div className="container">
                {/* <!-- product detail dt 로 요약 --> */}

                {/* <!-- 상품상세정보 --> */}
                <div className="pd_part1">
                    <img src={`${data.prod_imagedetail}`} alt="" />
                </div>
            </div>
        </div>
    )
};

export default DetailInfo01;