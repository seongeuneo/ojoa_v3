import React, { useState } from "react";
import "./FindIdModal.css";

function FindIdModal({ setModalVisible }) {
    const [step, setStep] = useState(0); // 0: 기본, 1: 인증번호전송, 2: 인증완료

    const onClickSend = () => {
        setStep(1);
        alert("인증번호가 발송되었습니다.");
    };

    const onClickcheck = () => {
        setStep(2);
        alert("인증이 완료되었습니다.");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        alert("아이디 찾기가 완료되었습니다.");
        setModalVisible(false);
    };

    return (
        <div id="login_findIdModal">
            <div className="login_bg" onClick={() => { setModalVisible(false); }}></div>
            <div className="login_container">
                <div className="login_inner">
                    <img
                        onClick={() => {
                            setModalVisible(false); // 모달 닫기
                        }}
                        className="login_btn_close"
                        src="../images/search_X.png"
                        alt="search_x"
                    />
                    <div className='login_writeArea'>
                        <h2>아이디 찾기</h2>
                    </div>
                    <form className="login_write_info" onSubmit={onSubmit}>
                        <table className="login_board_table">
                            <tbody>
                                <tr>
                                    <th scope="row"><label htmlFor="email">이메일</label></th>
                                    <td>
                                        <input
                                            type="text"
                                            name="email"
                                            id="email"
                                            placeholder="가입 시 입력하신 이메일을 입력해주세요."
                                            style={{ width: "100%" }}
                                        />
                                    </td>
                                    <td className="login_td_btn">
                                        <button
                                            type="button"
                                            onClick={onClickSend}
                                            className="login_send_btn"
                                        >
                                            인증번호 전송
                                        </button>
                                    </td>
                                </tr>
                                {
                                    step > 0 &&
                                    <tr>
                                        <th scope="row"><label htmlFor="code">인증번호</label></th>
                                        <td>
                                            <input
                                                type="number"
                                                name="code"
                                                id="code"
                                                placeholder="인증번호를 입력해주세요"
                                                style={{ width: "100%" }}
                                            />
                                        </td>
                                        <td className="login_td_btn">
                                            <button
                                                type="button"
                                                onClick={onClickcheck}
                                                className="login_check_btn"
                                            >
                                                인증확인
                                            </button>
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                        <div className="login_btns">
                            <div className="login_btnSet">
                                <button
                                    type="submit"
                                    className="login_submit_btn"
                                    disabled={step != 2}
                                >
                                    아이디 찾기
                                </button>
                            </div>
                            <div className="login_btnSet_cancel">
                                <button
                                    type="button"
                                    onClick={() => { setModalVisible(false); }}
                                    className="login_back_btn"
                                >
                                    취소하기
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FindIdModal;