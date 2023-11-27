import "./Main.css";
import React from 'react';

const SlideImg = () => {

    return (
            <div className="section">
                <input type="radio" name="slide" id="slide01" defaultChecked />
                <input type="radio" name="slide" id="slide02" />
                <input type="radio" name="slide" id="slide03" />
                <div className="slidewrap">
                    <ul className="slidelist">
                        {/* 슬라이드 영역 */}
                        <li className="slideitem">
                            <button>
                                <div className="textbox">
                                    <h3>Modern</h3>
                                    <p>세련된 디자인과 네츄럴 감성의 상징</p>
                                </div>
                                <img src="./images/header_slide_1.jpg" alt="slide_1"/>
                            </button>
                        </li>
                        <li className="slideitem">
                            <button>
                                <div className="textbox">
                                    <h3>Antiques</h3>
                                    <p>클래식한 아름다움을 지닌 고풍스러움의 상징</p>
                                </div>
                                <img src="./images/header_slide_2.jpg" alt="slide_2" />
                            </button>
                        </li>
                        <li className="slideitem">
                            <button>
                                <div className="textbox">
                                    <h3>Mid-Century</h3>
                                    <p>현대적 감성으로 재해석한 미니멀리스트의 상징</p>
                                </div>
                                <img src="./images/header_slide_3.jpg" alt="slide_3" />
                            </button>
                        </li>
                        {/* 좌,우 슬라이드 버튼 */}
                        <div className="slide-control">
                            <div>
                                <label htmlFor="slide03" className="left" ></label>
                                <label htmlFor="slide02" className="right" ></label>
                            </div>
                            <div>
                                <label htmlFor="slide01" className="left" ></label>
                                <label htmlFor="slide03" className="right" ></label>
                            </div>
                            <div>
                                <label htmlFor="slide02" className="left" ></label>
                                <label htmlFor="slide01" className="right" ></label>
                            </div>
                        </div>
                    </ul>
                    {/* 페이징 */}
                    <ul className="slide-pagelist">
                        <li><label htmlFor="slide01" ></label></li>
                        <li><label htmlFor="slide02" ></label></li>
                        <li><label htmlFor="slide03" ></label></li>
                    </ul>
                </div>
            </div>
    );
};
export default SlideImg;