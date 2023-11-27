import '../../pages/Cart/Cart.css';
import { useEffect, useState } from "react";

const CartTotal = ({ cart, convertPrice, selectedItems, onCheckout }) => {

    // 선택된 아이템의 총 가격 상태
    const [selectedTotal, setSelectedTotal] = useState(0);

    //calculateTotalPrice: 선택된 아이템의 가격과 수량을 계산해서 
    //                      총 가격을 계산하는 함수
    const calculateTotalPrice = () => {
        return selectedItems.reduce((total, itemId) => {
            const selectedItem = cart.find(item => item.id === itemId);
            if (selectedItem) {
                return total + selectedItem.productPriceFormatted * selectedItem.quantity;
            }
            return total;
        }, 0);
    };

    //useEffect를 사용하여 selectedItems나 cart가 변경될 때마다 총 가격을 업데이트
    useEffect(() => {
        const total = calculateTotalPrice();
        setSelectedTotal(total); //selectedTotal: 선택된 아이템들의 총 가격을 저장하는 상태
    }, [selectedItems, cart]);

    return (
        <div className="CartTotal">

            <div className="PriceBox">

                <div className="total_price">
                    <p className="cart_product_total_price">상품금액</p>
                    <p className="cart_product_price">{convertPrice(selectedTotal)}원</p>
                </div>


                <div className="pay_plus">
                    <img src={"../images/plus.png"} alt="plus" />
                </div>

                <div className="delivery">
                    <p className="cart_product_delivery">배송비</p>
                    <p className="cart_product_delivery_price">무료</p>
                </div>

                <div className="pay_plus">
                    <img src={"../images/equal.png"} alt="equal" />
                </div>

                <div className="payment">
                    <p className="cart_prouct_payment">결제 금액</p>
                    {/* <p className="cart_prouct_payment_price">{convertPrice(totalPayment)}원</p> */}
                    <p className="cart_prouct_payment_price">{convertPrice(selectedTotal)}원</p> {/* 선택된 아이템 가격 합을 추가 */}
                </div>
            </div>

            <div className="cart_info">
                <ul className="cart_info_1">
                    <li>Ojoa의 모든 상품은 100,000원 이상 구매시 무료배송 입니다.</li>
                    <li>결제 후 주소, 옵션 등 정보가 변경된 경우 교환이 불가하오니 신중히 구매 부탁드립니다.</li>
                    <li>장바구니 상품은 최대 30일간 저장됩니다.</li>
                </ul>
            </div>

            {/* <-------------  여기부터 버튼 시작   -----------------> */}
            <div className="final_btns">
                <div className="button">
                    <p className="btnText">CANCEL</p>
                    <div className="btnTwo">
                        <p className="btnText2">X</p>
                    </div>
                </div>

                <div className="button" onClick={onCheckout}>
                    <p className="btnText">PAY NOW</p>
                    <div className="btnTwo">
                        <p className="btnText2">GO!</p>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default CartTotal;