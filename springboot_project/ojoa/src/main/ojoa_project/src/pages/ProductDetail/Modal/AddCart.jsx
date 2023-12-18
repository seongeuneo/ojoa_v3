import React from "react";
import "./AddCart.css";
import { Link } from "react-router-dom";


function AddCart({ closeModal, AddToCart }) {

    return (
        <div className="AddCart">
            <div className="addAlarm">장바구니에 상품이 추가되었습니다.</div>
            <div className="sf_popup_bottom">
                <button type="button" className="btn later" onClick={() =>{closeModal(); AddToCart();}}>계속 쇼핑하기</button>
                <Link to={`/Cart`}>
                <button type="button" className="btn write" onClick={AddToCart}>장바구니로 이동</button>
                </Link>               
                            
            </div>
        </div>
    )
};

export default AddCart;