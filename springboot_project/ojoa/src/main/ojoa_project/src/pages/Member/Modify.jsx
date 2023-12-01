import "../Member/Modify.css";
import { Link } from 'react-router-dom';
import axios from 'axios'; // axios 라이브러리 import
import React, { useState, useRef } from 'react';

function Modify() {

    return (
        <div className="Modify">
            <div className="container">
                <div className="path">
                    <span>현재 위치</span>
                    <ol>
                        <li><Link to="/">홈</Link></li>
                        <li title="현재 위치"> &gt; &nbsp; 회원 정보 수정</li>
                    </ol>
                </div>
                <div className="pageTlt">

                    <div className="txt_01"><h3>회원 정보 수정</h3></div>
                </div>
                <div className="base-box">
                    <p className="thumbnail">
                        <img src="../images/img_member_default.gif" alt="썸네일" /></p>
                    <div className="description">
                        <span>저희 쇼핑몰을 이용해 주셔서 감사합니다. <span><strong>켄드릭 라마</strong></span> 님은 <strong>[<span>킹쿤타
                            회원</span>]</strong> 회원이십니다.</span>
                    </div>
                </div>


                <form action="/login/info/agree" name="personalInfo">
                    <table className="personal_modify">

                        <caption>
                        </caption>

                        <tr>
                            <th>
                                <label htmlFor="userid"><span></span>아이디</label>
                            </th>
                            <td>
                                <input type="text"
                                    name="id"
                                    minlength="5"
                                    maxlength="15"
                                    id="userid"
                                    required />
                                <span className="input_error"></span>
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label htmlFor="name"><span></span>이름</label>
                            </th>
                            <td>
                                <input type="text"
                                    name="name"
                                    minlength="2"
                                    maxlength="7"
                                    id="name"
                                    required
                                />
                                <span className="input_error"></span>
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label htmlFor="pw">비밀번호</label>
                            </th>
                            <td>
                                <input type="password"
                                    name="pwd"
                                    minlength="5"
                                    maxlength="15"
                                    id="pw"
                                    required
                                />
                                <span className="input_error"></span>
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label htmlFor="pwdcheck">비밀번호 확인</label>
                            </th>
                            <td>
                                <input type="password"
                                    name="pwdcheck"
                                    maxlength="15"
                                    id="pwdcheck"
                                    required />

                                <span className="input_error"></span>
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label htmlFor="address"><span>&#42;</span>주소</label>
                            </th>
                            <td>
                                <div className="input_address">
                                    <input type="text"
                                        name="post_code"
                                        maxlength="7"
                                        placeholder="우편번호입력"
                                        id="address"
                                        required />

                                    <form action="https://www.epost.kr/search.RetrieveIntegrationNewZipCdList.comm"
                                        target="_blank">

                                        <input
                                            className="inside_btn"
                                            type="submit"
                                            name="find_postcode"
                                            value="우편번호찾기"
                                        />

                                        <span className="input_error"></span>

                                    </form>
                                </div>
                                <div>
                                    <input type="text"
                                        name="address"
                                        required />
                                    &nbsp;
                                    <input type="text"
                                        name="address_detail"
                                        placeholder="상세주소"
                                    />
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label htmlFor="cellphone"><span>&#42;</span>휴대폰 번호</label>
                            </th>
                            <td>
                                <div>
                                    <input type="tel"
                                        name="first_phone_number"
                                        value="010"
                                        size="1"
                                        readonly />
                                    &nbsp;&ndash;&nbsp;
                                    <input type="tel"
                                        name="second_phone_number"
                                        minlength="3"
                                        maxlength="4"
                                        size="1"
                                        id="cellphone"
                                        required />
                                    &nbsp;&ndash;&nbsp;
                                    <input type="tel"
                                        name="last_phone_number"
                                        minlength="4"
                                        maxlength="4"
                                        size="1"
                                        required />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label htmlFor="emailid"><span>&#42;</span>이메일</label>
                            </th>
                            <td>
                                <input type="text"
                                    name="emailid"
                                    id="emailid"
                                />
                                @
                                <input type="text"
                                    name="mail"
                                    placeholder="직접 입력"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th><span>&#42;</span>마케팅 수신 동의 ( SMS )</th>
                            <td>
                                <div className="agree_check">
                                    <input type="radio" name="agree" id="agree_2" />
                                    <label htmlFor="agree_2">SMS</label>
                                    <input type="radio" name="agree" id="agree_3" checked /><label for="agree_3">수신받지않음</label>
                                    <span>마케팅 수신에 동의하실 경우, Ojoa의 소식을 SMS로 받아보실 수 있습니다.</span>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <th><span>&#42;</span>마케팅 수신 동의 ( 이메일 )</th>
                            <td>
                                <div className="agree_check">
                                    <input type="radio" name="agree" id="agree_1" />
                                    <label htmlFor="agree_1">이메일</label>
                                    <input type="radio" name="agree" id="agree_3" checked /><label for="agree_3">수신받지않음</label>
                                    <span>마케팅 수신에 동의하실 경우, Ojoa의 소식을 이메일로 받아보실 수 있습니다.</span>
                                </div>
                            </td>
                        </tr>
                    </table>

                    <div className="input_warn">* 는 필수 입력사항입니다.</div>

                    <div className="join_btn">
                        <a href="" className="out_btn2">취소하기</a>
                        <a href="" className="out_btn3">작성완료</a>
                        <a href="" className="out_btn4" >회원탈퇴</a>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Modify;