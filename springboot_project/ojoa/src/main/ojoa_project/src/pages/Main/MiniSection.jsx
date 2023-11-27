import '../../pages/Main/Main.css';
import React from 'react';
import { useState } from 'react';
import MiniItems from './MiniItems';
import { Link } from 'react-router-dom';


// 미니섹션에 있는 아이템들

const mockMinipro = [
    {
        id: 0,
        imgNo: 0,
        blacklabel: "2022 F/W BEST",
        mini_1: "[Ojoa 단독입점]",
        mini_2: "2022 SEASON BEST",
        proname: "길쭉한 소파",
        proprice: "113,000원",
        sale: "5%",
        link: "203"
    },

    {
        id: 1,
        imgNo: 1,
        blacklabel: "Ojoa's BEST ITEM",
        mini_1: "[ACE CHAIR] 입점상품",
        mini_2: "BRANDNEW ITEM",
        proname: "원희 의자",
        proprice: "170,000원",
        sale: "17%",
        link: "15"
    },

    {
        id: 2,
        imgNo: 2,
        blacklabel: "브랜드 기획전",
        mini_1: "[BROWN TOM] X Ojoa",
        mini_2: "Sepcial Colaboration",
        proname: "조금 큰 나무 침대",
        proprice: "385,000원",
        sale: "7%",
        link: "101"
    },


    {
        id: 3,
        imgNo: 3,
        blacklabel: "SPECIAL ITEM",
        mini_1: "[ROYAL FAMILY]",
        mini_2: "ENGLAND DESIGN BEST",
        proname: "심플 옷장",
        proprice: "209,000원",
        sale: "22%",
        link: "401"
    },

    {
        id: 4,
        imgNo: 4,
        blacklabel: "해외 직배송",
        mini_1: "[L.IKEA X Ojoa] 해외 직구",
        mini_2: "SUMMER COLLECTION",
        proname: "한놈 조명",
        proprice: "30,000원",
        sale: "10%",
        link: "501"
    },

    {
        id: 5,
        imgNo: 5,
        blacklabel: "CLASSIC ITEM",
        mini_1: "[BLACK LABEL]",
        mini_2: "MODERN BAR ITEM",
        proname: "성은 의자",
        proprice: "139,000원",
        sale: "5%",
        link: "16"
    }

] //mockMinipro



const MiniSection = () => {
    // const handleLinkClick = () => {
    //     alert('해당 페이지는 현재 준비중 입니다.');
    // };
// onClick={handleLinkClick}

    const miniLi = mockMinipro.map((content) => {
        // ... (ProductListItem 렌더링 코드)

        return (
            <div className="drgn">
            {/* <Link to={`/ProductDetail/${content.link}`} >   */}
                <li key={content.id}><MiniItems imgNo={content.imgNo} proname={content.proname}
                    blacklabel={content.blacklabel} mini_1={content.mini_1} mini_2={content.mini_2}
                    proprice={content.proprice} sale={content.sale}
                    castle={`/ProductDetail/${content.link}`}/>
                    </li>
            {/* </Link> */}
              </div>
        );
    });



    return (
        // main_col -> MiniSection
        <div className="MiniSection">
            {miniLi}
        </div>

    );
};

export default MiniSection;