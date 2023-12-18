import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import './KakaoAddressModal.css';

const Post = (props) => {

    const complete = (data) =>{
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(data)
        console.log(fullAddress)
        console.log(data.zonecode)

        props.setcompany({
            ...props.company,
            shipping_address:fullAddress,
            shipping_zipcode:data.zonecode,
        });
        props.closeModal(false);
    }

    return (
        <div id="addressModal">
            <div className="addressModal_container">
                <img
                    onClick={() => {
                        props.closeModal(false); // 모달 닫기
                    }}
                    className="addressModal_btn_close"
                    src="../images/search_X.png"
                    alt="search_x"
                />
            </div>

            <DaumPostcode
                className="postmodal"
                autoClose
                onComplete={complete} />
        </div>
    );
};

export default Post;