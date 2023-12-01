import "../MyPage/MyPage.css";
import { Link } from 'react-router-dom';

const MyshopMain = () => {

    const handleLinkClick = () => {
        alert('해당 페이지는 현재 준비중 입니다.');
    };

    return (
        <div className="container">
            <div className="myshopMain">
                <Link to="../order">
                    <div className="shopMain">
                        <h3><img src="../images/img_oder.png" alt="주문내역조회" /><br /><strong>Order</strong><span>주문내역 조회</span></h3>
                        <br />
                        <p>고객님께서 주문하신 상품의<br />주문내역을 확인하실 수 있습니다.</p>
                    </div>
                </Link>
                <Link to="../member/modify">
                    <div className="shopMain">
                        <h3><img src="../images/img_profile.png" alt="회원정보" /><br /><strong>Profile</strong><span>회원 정보 및 수정</span>
                        </h3>
                        <br />
                        <p>회원이신 고객님의 개인정보를<br />관리하는 공간입니다.</p>
                    </div>
                </Link>
                <Link to="../cart">
                    <div className="shopMain">
                        <h3><img src="../images/img_wishlist.png" alt="관심상품" /><br /><strong>Wishlist</strong><span>관심 상품</span>
                        </h3>
                        <br />
                        <p>관심상품으로 등록하신<br />상품의 목록을 보여드립니다.</p>
                    </div>
                </Link>
                <Link to='/MyPage/Mileage'>
                    <div className="shopMain">
                        <h3><img src="../images/img_mileage.png" alt="적립금" /><br /><strong>Mileage</strong><span>적립금</span>
                        </h3>
                        <br />
                        <p>적립금은 상품 구매 시<br />사용하실 수 있습니다.</p>
                    </div>
                </Link>
                {/* <Link to="#" onClick={handleLinkClick} >
                    <div className="shopMain">
                        <h3><img src="../images/img_deposits.png" alt="예치금" /><br /><strong>Deposits</strong><span>예치금</span>
                        </h3>
                        <br />
                        <p>예치금은 현금과 동일하게<br />상품 구매시 사용하실 수 있습니다.</p>
                    </div>
                </Link> */}
                <Link to="../qna">
                    <div className="shopMain">
                        <h3><img src="../images/img_board.png" alt="게시물 관리" /><br /><strong>Board</strong><span>게시물 관리</span></h3>
                        <br />
                        <p>고객님께서 작성하신 게시물을<br />관리하는 공간입니다.</p>
                    </div>
                </Link>
                {/* <Link to="#" onClick={handleLinkClick} >
                    <div className="shopMain">
                        <h3><img src="../images/img_address.png" alt="배송지 관리" /><br /><strong>Address</strong><span>배송 주소록
                            관리</span></h3>
                        <br />
                        <p>자주 사용하는 배송지를 등록하고<br />관리하실 수 있습니다.</p>
                    </div>
                </Link> */}
            </div>
        </div>
    );
};
export default MyshopMain;