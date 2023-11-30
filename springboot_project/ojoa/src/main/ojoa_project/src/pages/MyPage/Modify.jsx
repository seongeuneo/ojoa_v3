import "../MyPage/Modify.css";
import { Link } from 'react-router-dom';


const Modify = () => {


    return (
        <div className="container">
            <div className="myshop_asyncbankbook">
                <div className="sub_title">
                    <h2 id="h2_p">MY <span>PAGE</span></h2>
                    <p id="h2_p">마이페이지</p>
                </div>

            <form>
                <div id="container">
                    <div id="contents">

                        <div class="path">
                            <span>현재 위치</span>
                            <ol><li><a href="/">홈</a></li>
                                <li title="현재 위치"><strong>회원 정보 수정</strong></li>
                            </ol>
                        </div>

                        <div class="titleArea">
                            <h2>회원 정보 수정</h2>
                        </div>

                        <div class="xans-element- xans-myshop xans-myshop-asyncbenefit">
                            <div class="ec-base-box typeMember gMessage ">
                                <div class="information">
                                    <p class="thumbnail"><img src="" alt="" onerror="this.src='//img.echosting.cafe24.com/skin/base/member/img_member_default.gif';" class="myshop_benefit_group_image_tag" /></p>
                                    <div class="description">
                                        <p>저희 쇼핑몰을 이용해 주셔서 감사합니다. <strong class="txtEm"><span class="authssl_member_name">*****</span></strong> 님은 <strong>[<span class="xans-member-var-group_name"></span><span class="myshop_benefit_ship_free_message"></span>]</strong> 회원이십니다.</p>
                                        <p class="displaynone myshop_benefit_display_no_benefit "><strong class="txtEm"><span class="myshop_benefit_dc_pay"></span> <span class="myshop_benefit_dc_min_price"></span></strong> 구매시 <strong class="txtEm"><span class="myshop_benefit_dc_price"></span><span class="myshop_benefit_dc_type"></span></strong>을 <span class="myshop_benefit_use_dc"></span> 받으실 수 있습니다. <span class="myshop_benefit_dc_max_percent"></span></p>
                                        <p class="displaynone myshop_benefit_display_with_all "><strong class="txtEm"><span class="myshop_benefit_dc_pay"></span> <span class="myshop_benefit_dc_min_price_mileage"></span></strong> 구매시 <strong class="txtEm"><span class="myshop_benefit_dc_price_mileage"></span><span class="myshop_benefit_dc_type_mileage"></span></strong>을 <span class="myshop_benefit_use_dc_mileage"></span> 받으실 수 있습니다. <span class="myshop_benefit_dc_max_mileage_percent"></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="ec-base-table typeWrite">
                            <table border="1" summary="">

                                <caption>회원 기본정보</caption>

                                <colgroup>
                                    <col style="width:150px;" />
                                    <col style="width:auto;" />
                                </colgroup>

                                <tbody>
                                    <tr>
                                        <th scope="row">아이디 <img src="//img.echosting.cafe24.com/skin/base/common/ico_required_blue.gif" alt="필수" /></th>
                                        <td>
                                            <input id="member_id" name="member_id" fw-filter="isFill&isFill&isMin[4]&isMax[16]&isIdentity" fw-label="아이디" fw-msg="" class="inputTypeText" placeholder="" readonly="readonly" value="" type="text" />(영문소문자/숫자, 4~16자)
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">비밀번호 <img src="//img.echosting.cafe24.com/skin/base/common/ico_required_blue.gif" class="" alt="필수" /></th>
                                        <td>
                                            <div class="eTooltip">
                                                <input id="passwd" name="passwd" fw-filter="isMin[4]&isMax[16]" fw-label="비밀번호" fw-msg="" autocomplete="off" maxlength="16" disabled="1" value="" type="password" />
                                                <div class="ec-base-tooltip typeUpper ">
                                                    <div class="content">
                                                        <strong class="txtWarn">※ 비밀번호 입력 조건</strong>
                                                        <ul class="ec-base-help typeDash gBlank10 txtWarn">
                                                            - 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자<br>- 입력 가능 특수문자 <br>&nbsp;&nbsp;&nbsp;  ~ ` ! @ # $ % ^ ( ) * _ - = { } [ ] | ; : < > , . ? /<br>- 공백 입력 불가능<br>- 연속된 문자, 숫자 사용 불가능<br>- 동일한 문자, 숫자를 반복해서 사용 불가능<br>- 아이디 포함 불가능</ul>
                                                            </div>
                                                                <a href="#none" class="btnClose"><img src="//img.echosting.cafe24.com/skin/base/common/btn_close_tip.gif" alt="닫기" /></a>
                                                                <span class="edge"></span>
                                                            </div>
                                                            </div>
                                                            </td>
                                                            </tr>
                                                                <tr class="">
                                                                    <th scope="row">비밀번호 확인 <img src="//img.echosting.cafe24.com/skin/base/common/ico_required_blue.gif" alt="필수" /></th>
                                                                    <td><input id="user_passwd_confirm" name="user_passwd_confirm" fw-filter="isMatch[passwd]" fw-label="비밀번호 확인" fw-msg="비밀번호가 일치하지 않습니다." autocomplete="off" maxlength="16" disabled="1" value="" type="password" /> <span id="pwConfirmMsg"></span>
                                                                    </td>
                                                                </tr>
                                                                <tr class="">
                                                                    <th scope="row">주소 <img src="//img.echosting.cafe24.com/skin/base/common/ico_required_blue.gif" class="" alt="필수" /></th>
                                                                    <td>
                                                                        <input id="postcode1" name="postcode1" fw-filter="isLengthRange[1][14]" fw-label="우편번호1" fw-msg="" class="inputTypeText" placeholder="" readonly="readonly" maxlength="14" value="" type="text" />                    <a href="#none" class="btnNormal" onclick="ZipcodeFinder.Opener.bind('postBtn', 'postcode1', 'postcode2', 'addr1', 'layer', 'ko_KR');" id="postBtn">우편번호</a><br />
                                                                        <input id="addr1" name="addr1" fw-filter="" fw-label="주소" fw-msg="" class="inputTypeText" placeholder="" readonly="readonly" value="" type="text" /> 기본주소<br />
                                                                        <input id="addr2" name="addr2" fw-filter="" fw-label="주소" fw-msg="" class="inputTypeText" placeholder="" value="" type="text" /> 나머지주소                 </td>
                                                                </tr>
                                                                <tr class="">
                                                                    <th scope="row">휴대전화 <img src="//img.echosting.cafe24.com/skin/base/common/ico_required_blue.gif" class="" alt="필수" /></th>
                                                                    <td><select id="mobile1" name="mobile[]" fw-filter="isNumber&isFill" fw-label="휴대전화" fw-alone="N" fw-msg=""  >
                                                                        <option value="010">010</option>
                                                                        <option value="011">011</option>
                                                                        <option value="016">016</option>
                                                                        <option value="017">017</option>
                                                                        <option value="018">018</option>
                                                                        <option value="019">019</option>
                                                                    </select>-<input id="mobile2" name="mobile[]" maxlength="4" fw-filter="isNumber&isFill" fw-label="휴대전화" fw-alone="N" fw-msg="" placeholder="" value="" type="text" />-<input id="mobile3" name="mobile[]" maxlength="4" fw-filter="isNumber&isFill" fw-label="휴대전화" fw-alone="N" fw-msg="" placeholder="" value="" type="text" /></td>
                                                                </tr>
                                                                <tr class="">
                                                                    <th scope="row">SMS 수신여부 <img src="//img.echosting.cafe24.com/skin/base/common/ico_required_blue.gif" alt="필수" /></th>
                                                                    <td><input id="is_sms0" name="is_sms" fw-filter="isFill" fw-label="is_sms" fw-msg="" value="T" type="radio" /><label for="is_sms0" >수신함</label>
                                                                        <input id="is_sms1" name="is_sms" fw-filter="isFill" fw-label="is_sms" fw-msg="" value="F" type="radio" checked="checked" /><label for="is_sms1" >수신안함</label><p>쇼핑몰에서 제공하는 유익한 이벤트 소식을 SMS로 받으실 수 있습니다.</p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">이메일 <img src="//img.echosting.cafe24.com/skin/base/common/ico_required_blue.gif" alt="필수" /></th>
                                                                    <td>
                                                                        <input id="email1" name="email1" fw-filter="isFill&isEmail" fw-label="이메일" fw-alone="N" fw-msg="" placeholder="" value="" type="text" /> <span id="emailMsg"></span>
                                                                    </td>
                                                                </tr>
                                                                <tr class="">
                                                                    <th scope="row">이메일 수신여부 <img src="//img.echosting.cafe24.com/skin/base/common/ico_required_blue.gif" alt="필수" /></th>
                                                                    <td><input id="is_news_mail0" name="is_news_mail" fw-filter="isFill" fw-label="is_news_mail" fw-msg="" value="T" type="radio" />
                                                                        <label for="is_news_mail0" >수신함</label>
                                                                        <input id="is_news_mail1" name="is_news_mail" fw-filter="isFill" fw-label="is_news_mail" fw-msg="" value="F" type="radio" checked="checked" />
                                                                        <label for="is_news_mail1" >수신안함</label>
                                                                        <p>쇼핑몰에서 제공하는 유익한 이벤트 소식을 이메일로 받으실 수 있습니다.</p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    <h3 class=" ">추가정보</h3>

                                                    <div class="ec-base-table typeWrite ">
                                                        <table border="1" summary="">

                                                            <caption>회원 추가정보</caption>
                                                            <colgroup>
                                                                <col style="width:150px;" />
                                                                <col style="width:auto;" />
                                                            </colgroup>

                                                            <tbody>
                                                                <tr class="">
                                                                    <th scope="row">성별 <img src="//img.echosting.cafe24.com/skin/base/common/ico_required_blue.gif" class="" alt="필수" /></th>
                                                                    <td><input id="is_sex0" name="is_sex" fw-filter="isFill" fw-label="성별" fw-msg="" 0="disabled" value="M" type="radio"  /><label for="is_sex0" >남자</label>
                                                                        <input id="is_sex1" name="is_sex" fw-filter="isFill" fw-label="성별" fw-msg="" 0="disabled" value="F" type="radio"  /><label for="is_sex1" >여자</label></td>
                                                                </tr>
                                                                <tr class="">
                                                                    <th scope="row">생년월일 <img src="//img.echosting.cafe24.com/skin/base/common/ico_required_blue.gif" class="displaynone" alt="필수" /></th>
                                                                    <td><input id="birth_year" name="birth_year" fw-filter="" fw-label="생년월일" fw-msg="" class="inputTypeText" placeholder="" maxlength="4" value="" type="text" /> 년 <input id="birth_month" name="birth_month" fw-filter="" fw-label="생년월일" fw-msg="" class="inputTypeText" placeholder="" maxlength="2" value="" type="text" /> 월 <input id="birth_day" name="birth_day" fw-filter="" fw-label="생년월일" fw-msg="" class="inputTypeText" placeholder="" maxlength="2" value="" type="text" /> 일 <span class="gIndent20 displaynone"><input id="is_solar_calendar0" name="is_solar_calendar" fw-filter="" fw-label="생년월일" fw-msg="" value="T" type="radio" checked="checked" /><label for="is_solar_calendar0" >양력</label>
                                                                        <input id="is_solar_calendar1" name="is_solar_calendar" fw-filter="" fw-label="생년월일" fw-msg="" value="F" type="radio" /><label for="is_solar_calendar1" >음력</label></span>
                                                                    </td>
                                                                </tr>
                                                                <tr class="">
                                                                    <th scope="row">지역 <img src="//img.echosting.cafe24.com/skin/base/common/ico_required_blue.gif" class="displaynone" alt="필수" /></th>
                                                                    <td><select id="region" name="region" fw-filter="" fw-label="지역" fw-msg=""  >
                                                                        <option value="" selected="selected">선택</option>
                                                                        <option value="region_01">경기</option>
                                                                        <option value="region_02">서울</option>
                                                                        <option value="region_03">인천</option>
                                                                        <option value="region_04">강원</option>
                                                                        <option value="region_05">충남</option>
                                                                        <option value="region_06">충북</option>
                                                                        <option value="region_07">대전</option>
                                                                        <option value="region_08">경북</option>
                                                                        <option value="region_09">경남</option>
                                                                        <option value="region_10">대구</option>
                                                                        <option value="region_11">부산</option>
                                                                        <option value="region_12">울산</option>
                                                                        <option value="region_13">전북</option>
                                                                        <option value="region_14">전남</option>
                                                                        <option value="region_15">광주</option>
                                                                        <option value="region_15_01">세종</option>
                                                                        <option value="region_16">제주</option>
                                                                        <option value="region_17">해외</option>
                                                                    </select></td>
                                                                </tr>

                                                                <tr class="">
                                                                    <th scope="row">환불계좌 <img src="//img.echosting.cafe24.com/skin/base/common/ico_required_blue.gif" class="" alt="필수" /></th>
                                                                    <td>
                                                                        <span id="id_bank_info"></span> <a href="#none" class="btnNormal gIndent10" onclick="window.open('/myshop/order/account.html','bank_account','width=300,height=300');return false;" ><span id="id_has_bank_img" class="displaynone">환불계좌변경</span><span id="id_reg_bank_img" class="">환불계좌등록</span></a>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    <div class="ec-base-button justify">
                                                        <a href="#none" class="btnSubmitFix sizeM" onclick="memberEditAction()">회원정보수정</a>
                                                        <a href="/index.html" class="btnEmFix sizeM">취소</a>
                                                        <span class="gRight">
                                                            <a href="#none" class="btnNormal sizeS" onclick="memberDelAction(1000, 0, -1)">회원탈퇴</a>
                                                        </span>
                                                    </div>

                                                    <div class="layerLeave ec-base-layer" id="">
                                                        <div class="header">
                                                            <h3>회원탈퇴</h3>
                                                        </div>
                                                        <div class="content">
                                                            <div class="ec-base-box typeMember">
                                                                <div class="information">
                                                                    <strong class="title">혜택 내역</strong>
                                                                    <div class="description">
                                                                        <ul>
                                                                            <li id="">탈퇴시 보유하고 있는 적립금은 모두 삭제됩니다.</li>
                                                                            <li>현재 적립금 : <strong id="" class="txtEm">0</strong>
                                                                            </li>
                                                                            <li id="">현재 예치금 : <strong id="" class="txtEm">0</strong>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <h4>회원탈퇴 사유</h4>
                                                            <div class="ec-base-table typeWrite">
                                                                <table border="1" summary="">
                                                                    <caption>회원탈퇴 사유</caption>
                                                                    <colgroup>
                                                                        <col style="width:140px;" />
                                                                        <col style="width:auto;" />
                                                                    </colgroup>
                                                                    <tbody>
                                                                        <tr>
                                                                            <th scope="row">선택</th>
                                                                            <td></td>
                                                                        </tr>
                                                                        <tr id="">
                                                                            <th scope="row">기타</th>
                                                                            <td></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <div class="ec-base-button">
                                                            <a href="#none" class="btnSubmitFix sizeS" id="">탈퇴</a>
                                                            <a href="#none" class="btnNormalFix sizeS" onclick="$('#').hide();">취소</a>
                                                        </div>
                                                        <a href="#none" class="close" onclick="$('#').hide();"><img src="//img.echosting.cafe24.com/skin/base/common/btn_close.gif" alt="닫기" /></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>

    );

}


                                        export default Modify;