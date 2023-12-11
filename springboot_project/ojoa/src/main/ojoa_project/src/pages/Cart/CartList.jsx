import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartList = ({ id, productname, content, quantity, mainimage, discount, price, selectedItems, setSelectedItems, won, setWon, updateTotal, setCart }) => {
    const navigate = useNavigate();
    const [itemQuantity, setItemQuantity] = useState(quantity);

    const totalprice = (price * itemQuantity);
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


    const calculateTotalPrice = () => {
        return price * itemQuantity;
    };


    // CartList 컴포넌트에서 handleCheckboxChange 함수를 수정하여 선택된 아이템들의 ID를 업데이트합니다.
    const handleCheckboxChange = () => {
        setSelectedItems(prevSelectedItems => {
            if (Array.isArray(prevSelectedItems) && prevSelectedItems.includes(id)) {
                return prevSelectedItems.filter(item => item !== id);
            } else if (Array.isArray(prevSelectedItems)) {
                return [...prevSelectedItems, id];
            } else {
                return [id]; // 초기값 설정
            }
        });
    };

    //============================================================================
    const handleRemove = () => {
        //const user_id = "loggedInUser";
        const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
        const loginID = loggedInUser.id;

        axios.delete(`/api/cdelete?prod_num=${id}&user_id=${loginID}`)
            .then((response) => {
                axios
                    .get("/api/cart/allCartList")
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
    const onIncrease = () => {
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

    const onDecrease = () => {
        if (itemQuantity > 1) {
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
            <div className="CartList">
                <table className="list_detail">
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(id)}
                                    onChange={handleCheckboxChange}
                                />
                            </td>

                            <td><img className="cart_img" src={`/thumbs/${mainimage}_1.jpg`} alt={`${productname}`} /></td>
                            <td>
                                <div className="cart_mininame" name="prod_content">[{content}]</div>
                                <td><a className="cart_mainname" name="prod_name" href="#">{productname}</a></td>
                            </td>
                            <td className="cart_saleprice">
                                <sup>{discount}&#37;&#8595;</sup>
                                <div className="cart_li_price">{price}원</div>
                            </td>
                            <td>
                                <div className="cart_product_count">
                                    <div className="pd_length">
                                        {/* <button onClick={onDecrease}>-</button> */}
                                        <button onClick={() => { onDecrease() }}>-</button>
                                        <input name="quantity" type="number" min="1" value={itemQuantity} />
                                        <button onClick={() => { onIncrease() }}>+</button>
                                    </div>
                                </div>
                            </td>
                            <td>무료배송</td>
                            <td className="final_price">
                                {totalprice}원
                                <img
                                    src={"/images/cancel.png"}
                                    alt="delete"
                                    onClick={handleRemove}
                                    className="product_remove"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CartList;