import React from "react";
import "./ProductDetail.css";
import mockList from '../../data/ItemsData'
import { useParams } from "react-router-dom"


function DetailInfo01() {
    // 상품목록리스트에서 id 값에 따라 상품 상세 반영하기
    const { mockList_id } = useParams();
    const indiItem = mockList.filter((content) => content.id === parseInt(mockList_id))
    const { imgNo } = indiItem[0]
  

    return (
        <div className="DetailInfo01">
            {/* <!-- main product detail --> */}
            <div className="container">
                {/* <!-- product detail dt 로 요약 --> */}

                {/* <!-- 상품상세정보 --> */}

                <div className="pd_part1">
                    <img src={`/detailIMG/d_${imgNo}.jpg`} alt="" />
                </div>
            </div>
        </div>
    )
};

export default DetailInfo01;