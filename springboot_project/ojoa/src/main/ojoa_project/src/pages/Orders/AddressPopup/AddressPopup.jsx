import React from 'react';
import './AddressPopup.css';


const AddressPopup = () => {


    return (
        <div class>

            <div class='header'>
                <h1>배송 주소록 관리</h1>
            </div>

            <div class='content'>
                <div class='ec_base_help'>
                    <h2>배송주소록 유의사항</h2>
                    <div class='inner'>
                        <ul>
                            <li>배송 주소록은 최대 10개까지 등록할 수 있으며, 별도로 등록하지 않을 경우 최근 배송 주소록 기준으로 자동 업데이트 됩니다.</li>
                            <li>자동 업데이트를 원하지 않을 경우 주소록 고정 선택을 선택하시면 선택된 주소록은 업데이트 대상에서 제외됩니다.</li>
                            <li>기본 배송지는 1개만 저장됩니다. 다른 배송지를 기본 배송지로 설정하시면 기본 배송지가 변경됩니다.</li>
                        </ul>
                    </div>
                </div>

                <div class='ec_base_table_typelist'>
                    <table border="1" summary=''>
                        <caption>배송 주소록 목록</caption>
                        <colgroup>
                            <col style="width:27px" />
                            <col style="width:80px" />
                            <col style="width:100px" />
                            <col style="width:90px" />
                            <col style="width:100px" />
                            <col style="width:100px" />
                            <col style="width:auto" />
                            <col style="width:87px" />
                        </colgroup>
                        <tbody class="head">
                            <tr>
                                <td scope="col">
                                    <span class="displaynone">
                                        <input id="allCheck" onclick="" value="" type="checkbox" />
                                    </span>
                                </td>
                                <td scope="col">주소록 고정</td>
                                <td scope="col">배송지명</td>
                                <td scope="col">수령인</td>
                                <td scope="col">일반전화</td>
                                <td scope="col">휴대전화</td>
                                <td scope="col">주소</td>
                                <td scope="col">배송지관리</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="scroll">
                        <table border="1" summary="">
                            <caption>배송 주소록 목록</caption>
                            <colgroup>
                                <col style="width:27px" />
                                <col style="width:80px" />
                                <col style="width:100px" />
                                <col style="width:90px" />
                                <col style="width:100px" />
                                <col style="width:100px" />
                                <col style="width:auto" />
                                <col style="width:70px" />
                            </colgroup>
                            <tbody class="displaynone center">
                                <tr class="">
                                    <td></td>
                                    <td>
                                        <a href="" class="btnNormal displaynone">해제</a>
                                        <a href="" class="btnEm displaynone">고정</a>
                                        <span class="displaynone">-</span>
                                    </td>
                                    <td>
                                        <img src="" class="displaynone" alt="기본" /> </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class="left">() </td>
                                    <td>
                                        <a href="#none" class="btnSubmit" onclick="">적용</a>
                                        <span class="gBlank10"><a href="modify.html?ma_idx=" class="btnNormal">수정</a></span>
                                    </td>
                                </tr>
                                <tr class="">
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