import React, { useState, useEffect } from 'react';
import '../../pages/Cart/Cart.css';
import CartHeader from '../../pages/Cart/CartHeader';
import CartList from '../../pages/Cart/CartList';
import CartTotal from '../../pages/Cart/CartTotal';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = ({ cart, setCart }) => {

    const navigate = useNavigate();
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItemsTotal, setSelectedItemsTotal] = useState(0);

    const updateTotal = () => {
        const total = calculateSelectedTotal();
        setSelectedItemsTotal(total);
    };

    const [won, setWon] = useState(1);

    useEffect(() => {
        updateTotal();
    }, [cart, selectedItems]);

    // Cart 컴포넌트의 handleCheckAll 함수 내부에서 selectedItems 상태를 업데이트합니다.
    const handleCheckAll = () => {
        setIsAllChecked((prevIsAllChecked) => !prevIsAllChecked);
        const updatedSelectedItems = !isAllChecked ? cart.map((item) => item.prod_num) : [];
        setSelectedItems(updatedSelectedItems);
    };

    // Cart 컴포넌트에서 handleCheckout 함수도 수정하여 선택된 상품들의 데이터를 Checkout 컴포넌트로 전달합니다.
    // const handleCheckout = () => {
    //     const selectedCartItems = cart.filter((item) => selectedItems.includes(item.prod_num));
    //     navigate('/checkout', { state: { selectedCartItems } });
    // };

    const onCheckout = () => {
        const selectedCartItems = cart.filter((item) => selectedItems.includes(item.prod_num));
        navigate('/checkout', { state: { selectedCartItems: selectedCartItems } });
    };

    const calculateSelectedTotal = () => {
        return selectedItems.reduce((total, itemId) => {
            const selectedItem = cart.find((item) => item.prod_num === itemId);
            if (selectedItem) {
                return total + selectedItem.productPriceFormatted * selectedItem.quantity;
            }
            return total;
        }, 0);
    };

    useEffect(() => {
        const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
        const loginID = loggedInUser.id;

        axios
            .get(`/api/cart/allCartList?loginID=${loginID}`)
            .then((response) => {
                setCart(response.data);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }, [won]);

console.log("cart : " + cart);

    return (
        <div className="Cart">
            <div className="path">
                <span>현재 위치</span>
                <ol>
                    <li>
                        <Link to="/">홈</Link>
                    </li>
                    <li title="현재 위치"> &gt; &nbsp; Cart</li>
                </ol>
            </div>
            <div className="title">
                <h2>CART</h2>
                <div className="txt_01">장바구니에 담긴 상품</div>
            </div>

            <CartHeader
                isAllChecked={isAllChecked}
                handleCheckAll={handleCheckAll}
            />

        <CartList
            cart={cart}
            setCart={setCart}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            updateTotal={updateTotal}
            won={won}
            setWon={setWon}
        />

            <CartTotal
                cart={cart}
                selectedItems={selectedItems}
                selectedItemsTotal={selectedItemsTotal}
                onCheckout={onCheckout}
            />
        </div>
    );
};

export default Cart;