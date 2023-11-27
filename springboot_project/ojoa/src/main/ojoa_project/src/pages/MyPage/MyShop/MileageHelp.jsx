import React from "react";
import "./Mileage.css";

function MileageHelp() {

    return (
        <div className="ec-base-help">
            <h3>적립금 안내</h3>
            <div className="inner">
                <ol className="historyinfo"><li className="item1 ">주문으로 발생한 적립금은 배송완료 후 1일 부터 실제 사용 가능한 적립금으로 전환됩니다. 배송완료 시점으로부터 1일 동안은 미가용 적립금으로 분류됩니다. </li>
                    <li className="item2 ">미가용 적립금은 반품, 구매취소 등을 대비한 임시 적립금으로 사용가능 적립금으로 전환되기까지 상품구매에 사용하실 수 없습니다.</li>
                    <li className="item3 ">사용가능 적립금(총적립금 - 사용된적립금 - 미가용적립금)은 상품구매 시 바로 사용가능합니다.</li>
                </ol>
            </div>
        </div>
    )
};

export default MileageHelp;