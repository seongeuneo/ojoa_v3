import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import "./ProductDetail.css";


function DetailInfo01() {
    const location = useLocation();
    const productData = location.state.productData;
    console.log("DetailInfo01?" + productData);


    const [data, setData] = useState([]);

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


    console.log("data.prod_num => " + data.prod_num);
    // 해당하는 상품의 리뷰 필터링
    const matchingReviews = data.filter((image) => image.prod_num === productData.prod_num);



    return (
        <div className="DetailInfo01">
            {/* <!-- main product detail --> */}
            <div className="container">
                {/* <!-- product detail dt 로 요약 --> */}

                {/* <!-- 상품상세정보 --> */}
                <div className="pd_part1">
                    {matchingReviews.map((images, prod_imagenum) => (
                        <div key={prod_imagenum}>
                            <img src={`/detailIMG/${images.prod_imagedetail}`} alt="상품상세이미지" />
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
};

export default DetailInfo01;
