import "./MyPage.css";
import { Link } from 'react-router-dom';

const OrderState = () => {

    return (
        <div className="container">
            <div className="myshop_orderstate">
                <div className="title">
                    <h3>나의 주문처리 현황 <span className="desc">(최근 3개월 기준)</span></h3>
                </div>
                <div className="state">
                    <ul className="order">
                        <li>
                            <strong>입금전</strong>
                            <Link to="../order" className="count">-</Link>
                        </li>
                        <li>
                            <strong>배송준비중</strong>
                            <Link to="../order" className="count">-</Link>
                        </li>
                        <li>
                            <strong>배송중</strong>
                            <Link to="../order" className="count">-</Link>
                        </li>
                        <li>
                            <strong>배송완료</strong>
                            <Link to="../order" className="count">-</Link>
                        </li>
                    </ul>
                    <ul className="cs">
                        <li>
                            <strong>· 취소 : </strong>
                            <Link to="../order" className="count">-</Link>
                        </li>
                        <li>
                            <strong>· 교환 : </strong>
                            <Link to="../order" className="count">-</Link>
                        </li>
                        <li>
                            <strong>· 반품 : </strong>
                            <Link to="../order" className="count">-</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default OrderState;

