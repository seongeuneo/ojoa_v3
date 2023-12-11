import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import './Post.css';

const Post = (props) => {
    const [showModal, setShowModal] = useState(false);

    const complete = (data) => {
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
        console.log(data);
        console.log(fullAddress);
        console.log(data.zonecode);

        props.setcompany({
            ...props.company,
            address: fullAddress,
            zipcode: data.zonecode,
        });
        setShowModal(false); // 주소 검색 완료 후 모달을 닫도록 설정합니다.
    };

    return (
        <div>
            <button className="post_search" onClick={() => setShowModal(true)}>우편번호찾기</button>
            {showModal && (
                <div className="postmodal">
                    <span className="close-btn" onClick={() => setShowModal(false)}>닫기</span>
                    <DaumPostcode autoClose onComplete={complete} />
                </div>
            )}
        </div>
    );
};
export default Post;