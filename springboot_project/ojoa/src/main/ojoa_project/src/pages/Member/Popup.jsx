import '../../pages/Join/Popup.css';
import { Link } from 'react-router-dom';

const Popup = () => {

    //  dimmed -> Popup 으로 바꿔줌 / popup을 dimmed 로 바꿔줌

    return (

        <div className="Popup">
            <form action="../main">
                <div className="dimmed">
                    <div className="title">WELCOME TO OJOA !</div>

                    <div className="content">
                        <p>
                            회원가입이 완료되었습니다!<br />
                            Ojoa와 함께 공간과 휴식의 아름다움을 만들어보세요.
                        </p>
                        <p>
                            Design your Space.<br />
                            Design your Relax.<br />
                            Ojoa.
                        </p>
                    </div>

                    <div className="cmd">
                        {/* <!-- <input type="button" name="btnclose" className="button" value="닫기"> --> */}
                        <Link to="/">
                            <input className="pop_btn" type="submit" name="mainpage" value="HOME" />
                        </Link>
                    </div>
                </div>
            </form>
        </div>

    );
};

export default Popup;