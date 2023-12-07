import React from "react";
import "./RModal.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";





function RModal({ closeModal, onReviewTextChange }) {
    const location = useLocation();
    const productData = location.state.productData;


    // Spring boot에 값 보내기
    const onSubmit = async (e) => {

        try {
            const formData = new FormData(document.getElementById('reviewform'));
            // 'content'와 다른 폼 데이터를 백엔드로 보내고 싶다고 가정합니다.

            // 다른 폼 필드를 여기에 추가하세요

            // Spring Boot API 엔드포인트로 POST 요청을 보냅니다.
            const response = await axios.post("/reviewrest/reviewR/saveReview", formData,
                {
                    headers: { "Content-Type": "application/json" }
                    // { params: {
                    //     review_content: "review_content",
                    //     review_image1: "review_image1",
                    //     review_date: "review_date",
                    //     review_rate: "review_rate"
                    // }
                });

            // 성공/실패에 따라 처리합니다.
            console.log("데이터 저장됨:", response.data);
            closeModal(false);
        } catch (error) {
            // 에러 처리
            console.error("데이터 저장 중 에러:", error);
            // 선택적으로 사용자에게 에러 메시지 표시 가능
        }
        e.preventDefault();
    };

    // 상품목록리스트에서 id 값에 따라 상품 상세 반영하기
    // const { mockList_id } = useParams();
    // const indiItem = mockList.filter((content) => content.id === parseInt(mockList_id))
    // const { id, imgNo, productName, productPriceFormatted, productPromotion, productInfo, productReview, productGrade } = indiItem[0]

    const [data, setData] = useState([]);
    console.log("OrderReview02의 data => " + data);

    useEffect(() => {
        axios
            .get('/reviewrest/reviewR/allReviewList')
            .then((response) => {
                setData(response.data);
                console.log("서버연결성공 => ", response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // 권한 동의 내용 unfolded
    const [isPrivacyTextVisible, setIsPrivacyTextVisible] = useState(false);
    const handleMoreButtonClick = () => {
        setIsPrivacyTextVisible(!isPrivacyTextVisible);
    };
    // 권한 동의 체크 상태
    const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(false);


    // 권한 동의 체크가 안 되었을 때 처리 (예: 경고창 띄우기 등)
    const handleAddReview = () => {
        if (isPrivacyAgreed) {
            onReviewTextChange(localReviewText); // 리뷰 내용을 부모 컴포넌트로 전달
            closeModal();
        } else {
            alert('리뷰 수집 및 사용 권한에 동의해주세요.');
        }
    };


    // 별점 기능
    const [selectedRating, setSelectedRating] = useState(5); // 초기 값으로 5 설정


    const handleRatingClick = (rating) => {
        setSelectedRating(rating);
    };

    // 이미지첨부 창 띄우기
    const [showMediaOptions, setShowMediaOptions] = useState(false);

    const toggleMediaOptions = () => {
        setShowMediaOptions(!showMediaOptions);
    };

    // 이미지 첨부 창 닫기
    const closeMediaOptions = () => {
        setShowMediaOptions(false);
    };

    const [localReviewText, setLocalReviewText] = useState(''); // RModal 내부에서 사용하는 리뷰 내용 상태

    const handleLocalReviewTextChange = (text) => {
        setLocalReviewText(text);
    };


    // 파일업로드
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUploadButtonClick = () => {
        // 클릭 시 파일 입력 요소 클릭
        fileInputRef.current.click();
    };

    const handleUpload = () => {
        if (selectedFile) {
            // 여기서 파일을 업로드하는 로직을 구현
            console.log("Uploading file:", selectedFile);
        }
    };

    return (
        <div className="RModal">
            <form className="review_write_info" action="" method="post" id="reviewform">

                <div className="close_pannel">
                    <div className="title">리뷰 작성</div>
                    <button type="button" className="btn close" onClick={closeModal}>
                        <img src="https://cdn.snapfit.co.kr/review/images/close.png"></img>
                    </button>
                </div>
                <div className="popup_wrapper">
                    <div className="sf_order_list_wrap">
                        <span className="owl-carousel-nav prev"></span>
                        <div className="sf_order_item">
                            <div className="thumbnail"> <img src={productData.prod_mainimage} />
                            </div>
                            <div className="sf_buy_option">
                                <div className="sf_review_item_name sf_one_line">{productData.prod_name}</div>
                                <div className="sf_review_user_useally_selected_option sf_one_line">
                                    <div id="" className="option">
                                        <span className="size_wrap">
                                            <span className="key">상품코드</span><span className="separ"> : </span>
                                            <span className="value">{productData.prod_num}</span>
                                        </span>
                                        <span className="unit"></span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="main_score">
                            <div className="score_info">
                                <div className="title_info clearfix">
                                    <div className="necessary_wrap">
                                        <span className="necessary_point"></span>
                                    </div>
                                    <p className="title">리뷰 평점</p>
                                    <div className="pannel clearfix">
                                        <input className="score" name="review_rate" type="hidden" value={selectedRating} />
                                        <div className="star_info">
                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                <label htmlFor="review_rate" > <span
                                                    key={rating}
                                                    className={`pin_custom_font_color star ${selectedRating >= rating ? 'selected' : ''}`}
                                                    onClick={() => handleRatingClick(rating)}
                                                    id="review_rate"
                                                >
                                                    {selectedRating >= rating ? '★' : '☆'}
                                                </span></label>
                                            ))}
                                        </div> <span className="now_score">{selectedRating}</span>
                                        <button type="button" className="btn more view_right sf_displaynone"></button>
                                        <span className="now_score_text view_right sf_displaynone">아주 좋아요</span>
                                    </div>
                                </div>
                                <div className="score_detail sf_displaynone">
                                    <div id="" className="score_item" data-score="1"><span className="score_text">별로에요</span></div>
                                    <div id="" className="score_item" data-score="2"> <span className="score_text">그냥 그래요</span> </div>
                                    <div id="" className="score_item" data-score="3"> <span className="score_text">보통이에요</span> </div>
                                    <div id="" className="score_item" data-score="4"> <span className="score_text">맘에 들어요</span> </div>
                                    <div id="" className="score_item" data-score="5"> <span className="score_text">아주 좋아요</span> </div>
                                </div>
                            </div>
                        </div>
                        <div className="sf_write_wrap"><div className="sf_write"> <p className="title" name="review_content">내용을 적어주세요</p> <input className="default_value" name="review_content" type="hidden" />
                            <label htmlFor="review_content" > <textarea
                                className="value"
                                placeholder="리뷰를 적어주세요. :)"
                                value={localReviewText}
                                onChange={(e) => handleLocalReviewTextChange(e.target.value)}></textarea></label> </div> </div>

                        <div className="sf_media">
                            <div className="contents clearfix">
                                <div className="content content_wrap">
                                    <div className="inner">
                                        <div className="photo" onClick={toggleMediaOptions} > <img src="https://cdn.snapfit.co.kr/review/images/image.png" /> </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`select_content_type ${showMediaOptions ? '' : 'sf_displaynone'}`}>
                                <div className="popup_title">미디어 첨부</div>
                                <button className="btn close_content" type="button" onClick={closeMediaOptions}>
                                    <img src="https://cdn.snapfit.co.kr/review/images/icons/cancel_image_X.png" />
                                </button>
                                <label htmlFor="review_image1" ><input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }} // 숨김 처리
                                    onChange={handleFileChange}
                                    name="review_image1"
                                /></label>
                                <button
                                    className="btn upload_content content_photo"
                                    type="button"
                                    onClick={handleUploadButtonClick}
                                >
                                    사진 첨부
                                </button>
                                {/* <button className="btn upload_content content_photo" type="button" onChange={handleFileChange} onClick={handleUpload}>사진 첨부</button> */}
                                <button className="btn upload_content content_media" type="button" onClick={handleUploadButtonClick}>동영상 첨부</button>
                            </div>
                        </div>

                        <div className="sub_score_wrap sf_displaynone"> <div className="sub_score"></div> </div>
                        <div className="sf_agree_privacy_wrap folded"> <div className="sf_agree_privacy_head">
                            <input type="checkbox"
                                className="sf_check_agree_privacy"
                                checked={isPrivacyAgreed}
                                onChange={() => setIsPrivacyAgreed(!isPrivacyAgreed)} />
                            <p className="title">리뷰 수집 및 사용 권한 동의</p> <button type="button" className="btn more view_right" onClick={handleMoreButtonClick}></button> </div> <div className="sf_agree_privacy_detail"> <p className={`sf_agree_privacy_detail ${isPrivacyTextVisible ? '' : 'sf_displaynone'}`}>
                                리뷰의 저작권은 이를 작성한 회원에게 있으며,해당 리뷰가 타인의 저작권 을 침해하는 경우 그에 대한 책임은 회원 본인이 부담합니다.
                                <br /> <br />
                                회원은 당사에게 자신이 작성한 리뷰를 이용할 수 있는 권리 (license)를 부여합니다. 이에 따라 회사는 회원이 작성한 리뷰를 검색, 노출, 판촉, 홍보, 연구, 기타의 자료로
                                무상으로이용할 수 있으며, 본질적인 내용 에 변경을 가하지 않는 범위 내에서 리뷰의 일부를 수정, 복제, 편집할 수 있습니다.
                                <br /> <br />
                                또한, 당사가 제휴한 타사에 복제, 배포, 전송 또는 전시될 수 있습니다.
                                <br /> <br />
                                다만, 후기와 관련 없는 글, 상품에 내용이 적합하지 않은 글, 판매글, 광고글, 비방글 등은 관리자에 의해 통보없이 삭제할수 있습니다.
                            </p> </div> </div>
                        <div className="sf_popup_bottom">
                            <button type="button" className="btn later" onClick={closeModal}>나중에 하기</button>
                            <button type="button" className="btn write" onClick={onSubmit}>등록</button>
                        </div>

                    </div>
                </div>
            </form>

        </div>
    )
};

export default RModal;

