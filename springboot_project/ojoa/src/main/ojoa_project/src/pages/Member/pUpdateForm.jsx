import "../Member/pUpdateForm.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function pUpdateForm() {

    return (
        <div className="pUpdateForm">
            <div className="container">
                <div className="path">
                    <span>현재 위치</span>
                    <ol>
                        <li><Link to="/">홈</Link></li>
                        <li title="현재 위치"> &gt; &nbsp; 회원 비밀번호 수정</li>
                    </ol>
                </div>
                <div className="pageTlt">

                    <div className="txt_01"><h3>회원 비밀번호 수정</h3></div>
                </div>
                <div className="base-box">
                    <p className="thumbnail">
                        <img src="../images/img_member_default.gif" alt="썸네일" /></p>
                    <div className="description">
                        <span>저희 쇼핑몰을 이용해 주셔서 감사합니다. <span><strong></strong></span> 님은 <strong>[<span>일반
                        </span>]</strong> 회원이십니다.</span>
                    </div>
                </div>

                <form name="personalInfo">
                    <table className="personal_modify">

                        <caption>
                        </caption>

                        <tr>
                            <td>
                                <input type="text"
                                    name="id"
                                    id="id"
                                    //readOnly
                                    autocomplete="username"

                                />
                                <span className="input_error"></span>
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label htmlFor="password">비밀번호</label>
                            </th>
                            <td>
                                <input type="password"
                                    name="password"
                                    id="password"
                                    //readOnly
                                    autocomplete="new-password"

                                />
                                <span className="input_error"></span>
                            </td>
                        </tr>

                        <tr>
                            <th>
                                <label htmlFor="password2">비밀번호 확인</label>
                            </th>
                            <td>
                                <input type="password"
                                    name="password2"
                                    id="password2"
                                    //readOnly
                                    autocomplete="new-password"

                                />

                                <span className="input_error"></span>
                            </td>
                        </tr>

                    </table>

                    <div className="input_warn">* 는 필수 입력사항입니다.</div>

                    <div className="join_btn">
                        <button type="submit" className="out_btn3">수정완료</button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default pUpdateForm;