import React, { useState, useEffect } from 'react';
import '../../pages/Cart/Cart.css';
import CartHeader from '../../pages/Cart/CartHeader';
import CartList from '../../pages/Cart/CartList';
import CartTotal from '../../pages/Cart/CartTotal';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Cart = ({ cart, convertPrice }) => {

    const navigate = useNavigate()

    // 상태 관리할 state 추가
    const [cartState, setCartState] = useState(cart);
    // 전체 선택 체크 여부 상태
    const [isAllChecked, setIsAllChecked] = useState(false);
    // 선택된 아이템 상태
    const [selectedItems, setSelectedItems] = useState([]);
    // 선택된 상품들의 합계들의 총합(결제금액) 상태 추가
    // *selectedItemsTotal: 선택된 항목의 총 가격을 저장
    const [selectedItemsTotal, setSelectedItemsTotal] = useState(0);


    // 선택한 아이템의 합계를 업데이트하는 함수
    //updateTotal: 선택된 항목의 총 가격을 계산하고 업데이트
    const updateTotal = () => {
        const total = calculateSelectedTotal();
        setSelectedItemsTotal(total);
    };


    // 컴포넌트 마운트 후와 cart prop 변경 시 실행
    useEffect(() => {
        setCartState(cart);   // 카트 상태 업데이트
        updateTotal();
    }, [cart]);


    // 선택된 아이템 변경 시 실행
    //selectedItems 배열이 변경될 때마다 선택된 항목의 총 가격을 업데이트
    useEffect(() => {
        updateTotal(); // 선택된 아이템이 변경될 때마다 합계 업데이트
    }, [selectedItems]);

    // handleRemoveFromCart: ID를 기반으로 카트에서 항목을 제거하고 총 가격을 업데이트
    const handleRemoveFromCart = (itemId) => {
        const updatedCart = cartState.filter((item) => item.id !== itemId);
        setCartState(updatedCart);
        updateTotal();
    };


    //handleCheckAll: isAllChecked 상태를 토글하고 
    //selectedItems 배열을 그에 맞게 업데이트
    const handleCheckAll = () => {
        setIsAllChecked(!isAllChecked);
        const updatedSelectedItems = !isAllChecked ? cartState.map((item) => item.id) : [];
        setSelectedItems(updatedSelectedItems);
    };


    // 수량 감소 -> 합계 변동
    const onDecrease = (itemId) => {
        setCartState((prevCart) =>
            prevCart.map((item) =>
                item.id === itemId
                    ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                    : item
            )
        );
        updateTotal();
    };


    // 수량 증가 -> 합계 변동
    const onIncrease = (itemId) => {
        setCartState((prevCart) =>
            prevCart.map((item) =>
                item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
        updateTotal();
    };


    // 카트에 상품 추가하는 함수
    const addToCart = (cartItem) => {
        setCartState((prevCart) => [...prevCart, cartItem]);
        updateTotal(); // 상품 추가 시 선택한 아이템의 합계 업데이트
    };

    //calculateSelectedTotal: 선택된 모든 항목의 총 가격을 계산
    const calculateSelectedTotal = () => {
        return selectedItems.reduce((total, itemId) => {
            const selectedItem = cartState.find((item) => item.id === itemId);
            if (selectedItem) {
                return total + selectedItem.productPriceFormatted * selectedItem.quantity;
            }
            return total;
        }, 0);
    };

    /**
     * 주문 정보 DB 저장 후, 결제페이지로 이동
     */
    const handleCheckout = () => {
        navigate('/checkout')
    }

    // Springboot 요청
    useEffect(() => {
        axios
            .get("/api/cart/allCartList")
            .then((response) => {
                setCartState(response.data);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }, []);

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

            <CartHeader isAllChecked={isAllChecked} handleCheckAll={handleCheckAll} />

            <CartList
                cart={cartState} // 수정된 상태를 전달
                onDecrease={onDecrease}
                onIncrease={onIncrease}
                handleAddToCart={addToCart} // 상품 추가 함수 전달
                handleRemove={handleRemoveFromCart} // 상품 제거 함수 전달
                convertPrice={convertPrice}
                selectedItems={selectedItems} // 선택된 아이템 전달
                setSelectedItems={setSelectedItems}
                updateTotal={updateTotal}
            />

            <CartTotal
                cart={cartState}
                convertPrice={convertPrice}
                selectedItems={selectedItems} // 선택된 아이템 리스트 전달
                selectedItemsTotal={selectedItemsTotal} // 선택된 아이템 합계 전달
                onCheckout={handleCheckout}
            />
        </div>
    );
};


export default Cart;