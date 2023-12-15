import React from 'react';
import './AddressPopup.css';
import axios from 'axios';
import { useEffect, useState } from 'react';



const AddressPopup = (closeModal) => {
 
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('/shippingAddress/shippingAddressR/allShippingAddressList')
            .then((response) => {
                setData(response.data);
                console.log("서버연결성공 => ", response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    console.log("data => " + data);


    // 리뷰 리스트 맵핑
    const addressLi = data ? (
        data.length > 0 ? (
            data.map((content) => (
                <tr key={content.shipping_num}>
                    <td>{content.shipping_num}</td>
                    <td>{content.id}</td>
                    <td>{content.shipping_name}</td>
                    <td>{content.shipping_zipcode}</td>
                    <td>{content.shipping_address}</td>
                    <td>{content.shipping_addressdetail}</td>
                    <td>{content.shipping_phone}</td>
                    <td scope="col" class="left"><button href="" class="btnSubmit" onclick="">적용</button></td>
                    <td scope="col"><button href="" class="btnNormal">수정</button></td>
                </tr>
            ))
        ) : (
            <tr>
                <td colspan="9" class="message">등록된 주소가 없습니다.</td>
            </tr>
        )
    ) : null;

    return (
        <div class="AddressPopup">

            <div class='addressheader'>
                <h1>배송 주소록 관리</h1>
            </div>

            <div class='content'>
                <div class='ec_base_table_typelist'>
                    <table border="1" summary=''>
                        <tbody class="head">
                            <tr>
                                <td scope="col">배송지 번호</td>
                                <td scope="col">주문한 회원 아이디</td>
                                <td scope="col">수령자 이름</td>
                                <td scope="col">수령자 우편번호</td>
                                <td scope="col">수령자 주소</td>
                                <td scope="col">수령자 상세주소</td>
                                <td scope="col">수령자 전화번호</td>
                                <td scope="col" class="left"><span href="" class="btnSubmit" onclick="">적용</span></td>
                                <td scope="col"><span class="gBlank10"><a href="" class="btnNormal">수정</a></span></td>
                            </tr>
                            {addressLi}
                        </tbody>
                    </table>
                </div>

                <div class="ec_base_button">
                    <a href="" onClick={() => { closeModal(); }} class="btnSubmitFix sizeS">새배송지 등록</a>
                </div>

            </div>

        </div>

    );
};

export default AddressPopup;