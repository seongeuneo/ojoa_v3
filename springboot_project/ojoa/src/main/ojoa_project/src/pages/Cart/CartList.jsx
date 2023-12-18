import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartList = ({ cart, selectedItems, setSelectedItems, won, setWon, updateTotal, setCart }) => {
    const navigate = useNavigate();
    const [itemQuantity, setItemQuantity] = useState(1);

    // const totalprice = (price * itemQuantity);
    //console.log("totalprice =>" +totalprice);

    // 체크박스가 선택되어 있는지 여부를 상태로 관리
    const [isChecked, setIsChecked] = useState(false);

    // totalPriceState를 state로 관리
    //const [totalPriceState, setTotalPriceState] = useState(totalprice);

    // useEffect(() => {

    // },[totalprice])

    // totalprice를 계산하는 함수

    useEffect(() => {
        updateTotal();
    }, [itemQuantity]); // 수량이 변경될 때마다 합계를 다시 계산


    // const calculateTotalPrice = () => {
    //     return price * itemQuantity;
    // };


    // CartList 컴포넌트에서 handleCheckboxChange 함수를 수정하여 선택된 아이템들의 ID를 업데이트합니다.
    // const handleCheckboxChange = () => {
    //     setSelectedItems(prevSelectedItems => {
    //         if (Array.isArray(prevSelectedItems) && prevSelectedItems.includes(id)) {
    //             return prevSelectedItems.filter(item => item !== id);
    //         } else if (Array.isArray(prevSelectedItems)) {
    //             return [...prevSelectedItems, id];
    //         } else {
    //             return [id]; // 초기값 설정
    //         }
    //     });
    // };
    const handleCheckboxChange = (itemId) => {
        setSelectedItems(prevSelectedItems => {
            if (prevSelectedItems.includes(itemId)) {
                // 이미 선택되었던 아이템을 선택 해제
                return prevSelectedItems.filter(id => id !== itemId);
            } else {
                // 새로운 아이템을 선택
                return [...prevSelectedItems, itemId];
            }
        });
    };

    //============================================================================
    const Remove = (id) => {
        //const user_id = "loggedInUser";
        const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
        const loginID = loggedInUser.id;
        

        axios.delete(`/api/cdelete?prod_num=${id}&user_id=${loginID}`)
            .then((response) => {
                axios
                    .get(`/api/cart/allCartList?loginID=${loginID}`)
                    .then((response) => {
                        setCart(response.data);
                    })
                    .catch((error) => {
                        console.error("Error: ", error);
                    });
            })
            .catch((error) => {
                console.error("삭제 요청 실패:", error);
                alert('삭제 중 문제가 발생했습니다!');
            });
    };
    //=========================================================================
    const onIncrease = (id) => {
        setItemQuantity(itemQuantity + 1);

        const productData = { prod_num: id, quantity: 1 };
        axios.post('/api/cartUp', productData)
            .then(response => {
                //alert('상품 수량이 증가되었습니다!');
                setWon(won + 1);
            })
            .catch(error => {
                //alert('장바구니 수량 변경 중 문제가 발생했습니다!');
            });
    }

    const onDecrease = (id, item) => {
        if (item.quantity > 1) {
            setItemQuantity(itemQuantity - 1);

            const productData = { prod_num: id, quantity: 1 };
            axios.post('/api/cartDown', productData)
                .then(response => {
                    //alert('상품 수량이 감소되었습니다!');
                    setWon(won + 1);
                })
                .catch(error => {
                    //alert('장바구니 수량 변경 중 문제가 발생했습니다!');
                });
        } else {
            alert('더 줄일 수 없는 수량입니다.');
        }
    }


    return (
        <div className="CartListAll">
            {/* 장바구니에 있는 각 상품을 매핑하며 표시 */}
            {cart.map((item) => (
                <div className="CartList" key={item.prod_num}>
                    <table className="list_detail">
                        <tbody>
                            <tr key={item.prod_num}>
                                <td>
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(item.prod_num)}
                                    onChange={() => handleCheckboxChange(item.prod_num)}
                                />
                            </td>

                            <td><img className="cart_img" src={`/thumbs/${item.imgNo}`} alt={`${item.prod_name}`} /></td>
                            <td>
                                <div className="cart_mininame" name="prod_content">[{item.prod_content}]</div>
                                <td><a className="cart_mainname" name="prod_name" href="#">{item.prod_name}</a></td>
                            </td>
                            <td className="cart_saleprice">
                                <sup>{item.productPromotion}&#37;&#8595;</sup>
                                <div className="cart_li_price">{item.productPriceFormatted}원</div>
                            </td>
                            <td>
                                <div className="cart_product_count">
                                    <div className="pd_length">
                                        {/* <button onClick={onDecrease}>-</button> */}
                                        <button onClick={() => { onDecrease(item.prod_num, item) }}>-</button>
                                        <input name="quantity" type="number" min="1" value={item.quantity} />
                                        <button onClick={() => { onIncrease(item.prod_num) }}>+</button>
                                    </div>
                                </div>
                            </td>
                            <td>무료배송</td>
                            <td className="final_price">
                                {(item.productPriceFormatted) * item.quantity}원
                                <img
                                    src={"/images/cancel.png"}
                                    alt="delete"
                                    onClick={() => Remove(item.prod_num)}
                                    className="product_remove"
                                />
                            </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default CartList;