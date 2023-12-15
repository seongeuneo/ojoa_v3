import React from 'react';
// import './AddressPopup.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


const AddressPopup = () => {


    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('/shippingAddress//shippingAddressR/allShippingAddressList')
            .then((response) => {
                setData(response.data);
                console.log("서버연결성공 => ", response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    console.log("data => " + data);



    return (
        <div>

            <div class='addressheader'>
                <h1>배송 주소록 관리</h1>
            </div>

            <div class='content'>
                <div class='ec_base_table_typelist'>
                    <table border="1" summary=''>
                        <caption>배송 주소록 목록</caption>

                        <tbody class="head">
                            <tr>
                                <td scope="col">
                                    <span class="displaynone">
                                        <input id="allCheck" onclick="" value="" type="checkbox" />
                                    </span>
                                </td>
                                <td scope="col">배송지 번호</td>
                                <td scope="col">주문한 회원 아이디</td>
                                <td scope="col">수령자 이름</td>
                                <td scope="col">수령자 우편번호</td>
                                <td scope="col">수령자 주소</td>
                                <td scope="col">수령자 상세주소</td>
                                <td scope="col">수령자 전화번호</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="scroll">
                        <table>
                            <caption>배송 주소록 목록</caption>

                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>
                                        <a href="" class="btnNormal displaynone">해제</a>
                                        <a href="" class="btnEm displaynone">고정</a>
                                        <span class="displaynone">-</span>
                                    </td>
                                    <td>
                                        <img src="//img.echosting.cafe24.com/skin/base_ko_KR/myshop/ico_addr_default.gif" class="displaynone" alt="기본" /> </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class="left">() </td>
                                    <td>
                                        <a href="" class="btnSubmit" onclick="">적용</a>
                                        <span class="gBlank10"><a href="" class="btnNormal">수정</a></span>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody class=""><tr>
                                <td colspan="8" class="message">등록된 주소가 없습니다.</td>
                            </tr></tbody>
                        </table>
                    </div>
                </div>

                <div class="ec_base_button">
                    <a href="" onclick="" class="btnNormal sizeS displaynone">선택 주소록 삭제</a>
                    <a href="" class="btnSubmitFix sizeS">배송지 등록</a>
                </div>

            </div>

        </div>

    );
};

export default AddressPopup;