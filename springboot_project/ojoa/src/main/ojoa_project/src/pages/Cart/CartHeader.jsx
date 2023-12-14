// import '../../pages/Cart/Cart.css';

// const CartHeader = ({ handleCheckAll, isAllChecked }) => {

//     return (
//         //cart_list -> CartHeader 로 이름 바꿈 
//         <div className="CartHeader">

//             <div className="cart_title_wrap">

//                 <div className="cart_title">
//                     <input
//                         type="button"
//                         className="favor_btn"
//                         value={isAllChecked ? "전체해제" : "전체선택"}
//                         onClick={handleCheckAll}/>

//                 <span>상품정보</span>
//                 <span>판매가</span>
//                 <span>수량 옵션</span>
//                 <span>배송비</span>
//                 <span>합계</span>
//             </div>
//         </div>

//         </div >

//     );
// };

// export default CartHeader;

import '../../pages/Cart/Cart.css';

const CartHeader = ({ handleCheckAll, isAllChecked }) => {

    return (
        //cart_list -> CartHeader 로 이름 바꿈 
        <div className="CartHeader">

            <div className="cart_title_wrap">

                <div className="cart_title">
                    <input
                        type="button"
                        className="favor_btn"
                        value={isAllChecked ? "전체해제" : "전체선택"}
                        onClick={handleCheckAll} />

                    <span>상품정보</span>
                    <span>판매가</span>
                    <span>수량 옵션</span>
                    <span>배송비</span>
                    <span>합계</span>
                </div>
            </div>

        </div >

    );
};

export default CartHeader;
