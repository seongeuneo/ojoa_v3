import '../../pages/Cart/Cart.css';
import { useEffect, useState } from "react";
import axios from "axios";

const CartTotal = ({ cart, selectedItems, onCheckout}) => {

    const [selectedTotal, setSelectedTotal] = useState(0);

    const calculateTotalPrice = () => {
        return selectedItems.reduce((total, itemId) => {
            const selectedItem = cart.find(item => item.prod_num === itemId);
            if (selectedItem) {
                total+=selectedItem.productPriceFormatted * selectedItem.quantity; 
                console.log("********total="+total);
                return total;
            }
            
            return total;
        }, 0);
    };

    useEffect(() => {
        const total = calculateTotalPrice();
        setSelectedTotal(total);
    }, [selectedItems, cart]);



    return (
        <div className="CartTotal">

            <div className="PriceBox">

                <div className="total_price">
                    <p className="cart_product_total_price">상품금액</p>
                    {/* <p className="cart_product_price">{calculateTotalPrice()}원</p> */}
                    <p className="cart_product_price">{selectedTotal}원</p>
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
                    <p className="cart_prouct_payment" name="prod_price1">결제 금액</p>
                    {/* <p className="cart_prouct_payment_price">{convertPrice(totalPayment)}원</p> */}
                    {/* <p className="cart_prouct_payment_price">{calculateTotalPrice()}원</p> */}
                    <p className="cart_prouct_payment_price">{selectedTotal}원</p>
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