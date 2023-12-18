import React, { useState, useEffect } from 'react';
// import DaumPostcode from "react-daum-postcode";
// import Iamport, { PaymentRequest } from 'kamport'
import './Checkout.css';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import PaymentConfirmation from './PaymentConfirmation';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import Post from './KakaoAddressModal/KakaoAddressModal';
import AddressPopup from './AddressPopup/AddressPopup';


function Checkout({ cart }) {
  const location = useLocation();
  const selectedCartItems = location.state.selectedCartItems;
  const [orderInfo, setOrderInfo] = useState({});
  const [isMember, setIsMember] = useState(false);
  
  const formatNumber = (num) => {
    return Intl.NumberFormat().format(num)
  }
  
  // 배송비
  const deliveryPrice = 0;
  
  // 할인금액
  const discountPrice = 0;

  const displayedCartList = useMemo(() => {
    return selectedCartItems.map(item => ({
      ...item,
      dispalyedPrice: formatNumber(item.productPriceFormatted),
      totalPrice: item.quantity * Number(item.productPriceFormatted),
      displayedTotalPrice: formatNumber(item.quantity * Number(item.productPriceFormatted))
    }))
  }, [selectedCartItems]);
  

  const totalProductPrice = useMemo(() => {
    return displayedCartList.reduce((acc, curr) => {
      return acc + curr.totalPrice
    }, 0)
  }, [displayedCartList]);
  
  // 총 결제 금액
  const totalCheckoutPrice = totalProductPrice + deliveryPrice - discountPrice;
  
  const [isAddressPopupOpen, setIsAddressPopupOpen] = useState(false);

  const navigate = useNavigate();

  function showAddressPopupOpen() {
    setIsAddressPopupOpen(true);
  }

 //======================================================================= 
  // 주문
  function inOrders() {
    const Orders = {
      id: orderInfo.shipping_id,
      orders_totalprice: totalProductPrice + deliveryPrice,
      orders_price: totalCheckoutPrice,
      orders_method: orderInfo.orders_method,
      // orders_addresscheck: "orders_addresscheck",
      shipping_name: orderInfo.shipping_name,
      shipping_zipcode: orderInfo.shipping_zipcode,
      shipping_address: orderInfo.shipping_address,
      shipping_addressdetail: orderInfo.shipping_addressdetail,
      shipping_phone: orderInfo.shipping_phone, 
      shipping_message: orderInfo.shipping_message,
      displayedCartList: displayedCartList ? [...displayedCartList] : []
  };
  
  axios.post('/api/orders/saveOrders', Orders)
  .then(response => {
    alert("주문완료이 완료되었습니다:)");
    navigate("/");
  })
  .catch(error => {
    alert('주문에 실패했습니다!!!!!!');
  });
}
  
//=========================================================================

  //수정
  useEffect(() => {
    setOrderInfo({
      memberCheck: '',
      orders_method: 'card', // cart , vbank
      shipping_name: '',
      shipping_zipcode: '',
      shipping_address: '',
      shipping_addressdetail: '',
      shipping_phone: '',
      shipping_message: '',
      orders_totalprice: totalProductPrice,
      orders_price: totalCheckoutPrice,
      ordersDetail: displayedCartList
    });
  }, [totalProductPrice, totalCheckoutPrice, displayedCartList]);

  const loginCheck = () => {
    axios
      .get("/member/rinfo")
      .then((response) => {
        let data = response.data;
        if (data != null && data !== "") {
          setIsMember(true);
        } else {
          setIsMember(false);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };
  loginCheck();

  const getUserInfo = () => {
    axios
      .get("/member/rinfo")
      .then((response) => {
        let data = response.data;
        if (data != null && data !== "") {
          setIsMember(true);
          setOrderInfo(prevOrderInfo => ({
            ...prevOrderInfo,
            shipping_id: data.id,
            shipping_name: data.name,
            shipping_zipcode: data.zipcode,
            shipping_address: data.address,
            shipping_addressdetail: data.addressdetail,
            shipping_email: data.email1+data.email2,
            shipping_phone: data.phone1+"-"+data.phone2+"-"+data.phone3
            
          }));
        } else {
          setIsMember(false);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const getEmpty = () => {
    setOrderInfo({
      ...orderInfo,
      shipping_name: '',
      shipping_zipcode: '',
      shipping_address: '',
      shipping_addressdetail: '',
      shipping_phone: '',
      shipping_message: '',
    });
  };


  const [popup, setPopup] = useState(false);

  const handleInput = (e) => {
    setOrderInfo({
      ...orderInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleComplete = (data) => {
    setPopup(!popup);
  }


  const handleOrderInfo = (e) => {
    const { name, value } = e.target;
    setOrderInfo({ ...orderInfo, [name]: value });
  };

  // const orderPayment = () => {
  //   if (isMember === false && orderInfo.memberCheck === '') {
  //     alert("주문조회 비밀번호를 입력하세요.");
  //     return false;
  //   }
  //   axios
  //     .post("/api/order/orderPayment", orderInfo, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       let orderData = response.data;
  //       if (orderData != null && orderData !== "") {
  //         navigate('/paymentconfirmation', { state: { orderData, cart } });
  //       } else {
  //         alert('결제 실패');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error: ", error);
  //     });
  // };

//========================================================================



  // 결제 성공 시 호출되는 함수
  const handlePaymentSuccess = () => {
    navigate('/paymentconfirmation', { state: { displayedCartList, orderInfo } });
  };


//===========================================================================================



  return (
    <div className="Checkout">
      {/* <form onSubmit={handleSubmit}> */}
      <form id='ordersform'>
        <h2 className="pay_title">주문서 작성</h2>

        <section className="pay_orderlist-area">
          <div className="pay_area_header">
            <p>배송상품 주문내역</p>
          </div>
          <table className="pay_product_list_tbl" cellPadding={0} cellSpacing={0}>
            <thead>
              <tr>
                <th>번호</th>
                <th>이미지</th>
                <th>상품명</th>
                <th>판매가</th>
                <th>수량</th>
                <th>적립금</th>
                <th>배송구분</th>
                <th>배송비</th>
                <th>합계</th>
              </tr>
            </thead>
            <tbody>
              {displayedCartList.map((item, index) => (
                <tr key={item.prod_num}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={`/thumbs/${item.imgNo}`} alt="" style={{ width: 80, height: 80, objectFit: 'contain' }} />
                  </td>
                  <td>{item.prod_name}</td>
                  <td>{item.dispalyedPrice}원</td>
                  <td>{item.quantity}</td>
                  <td>-</td>
                  <td>기본배송</td>
                  <td>[조건]</td>
                  <td>{item.displayedTotalPrice}원</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="pay_product_summary">
              <tr>
                <td colSpan={9}>
                  <div className="pay_product_summary_content">
                    <p>[기본배송]</p>
                    <p>상품구매금액 {formatNumber(totalProductPrice)} + 배송비 {deliveryPrice} = 합계 : {formatNumber(totalProductPrice + deliveryPrice)}원</p>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
          <div class="pay_product_summary_button">
            <span class="gLeft ">
              <strong class="text">선택상품을</strong>
              <a href="#none" id="btn_product_delete" class="btnEm"><i class="prodDelete"></i> X 삭제하기</a>
            </span>
            <span class="gRight">
              <a href="javascript:window.history.back();" class="btnNormal">이전페이지</a>
            </span>
          </div>
        </section>
        <hr/>

        {/* 배송정보 */}
        <section>
        <p className="pay_section_header">배송정보</p>
        <table className="pay_table" cellPadding={0} cellSpacing={0}>
            <colgroup>
              <col width="200px" />
            </colgroup>

            {/* 회원일 경우 */}
            <tr>
            <th>배송지 선택</th>
            <td>
              <div className="address">
                <input
                  id="sameaddr0"
                  name="sameaddr"
                  fw-filter=""
                  fw-label="1"
                  fw-msg=""
                  value="M"
                  type="radio"
                  autocomplete="off"
                  onChange={getUserInfo}
                />
                <label htmlFor="sameaddr0">회원 정보와 동일</label>
                <input
                  id="sameaddr1"
                  name="sameaddr"
                  fw-filter=""
                  fw-label="1"
                  fw-msg=""
                  value="F"
                  type="radio"
                  autocomplete="off"
                  onChange={getEmpty} // 이 부분에서 getEmpty 함수 호출
                />
                <label htmlFor="sameaddr1">새로운 배송지</label>
                    <span class="recent ec-shop-RecentDelivery displaynone">최근 배송지 : </span>
                    <Link to="/address-popup" className="btnNormal" onClick={showAddressPopupOpen}>
                      주소록 보기
                    </Link>
                    {isAddressPopupOpen && <AddressPopup />}
                  </div>
                </td>
              </tr>

            <tr>
            <th>받으시는 분 *</th>
              <td>
                <input type="text" name="shipping_name" className="input_control" onChange={handleOrderInfo} value={orderInfo.shipping_name} />
              </td>
            </tr>
            <tr>
              <th>주소 *</th>
              <td>
                <input type="text" name="shipping_zipcode" className="input_control" onChange={handleOrderInfo} value={orderInfo.shipping_zipcode} />
                <button type="button" className="btn-control" onClick={handleComplete}>우편번호</button>
                <br />
                <input type="text" name="shipping_address" className="input_control_help" onChange={handleOrderInfo} value={orderInfo.shipping_address} readOnly />
                <p className="help_text">{`기본주소`}</p>
                <br />
                <input type="text" name="shipping_addressdetail" className="input_control_help" onChange={handleOrderInfo} value={orderInfo.shipping_addressdetail} />
                <p className="help_text">{`나머지주소(선택입력가능)`}</p>
                {popup && <Post closeModal={setPopup} company={orderInfo} setcompany={setOrderInfo}></Post>}
              </td>
            </tr>
            <tr>
              <th>휴대전화 *</th>
              <td>
                <input name="shipping_phone" type="text" className="input_control" onChange={handleOrderInfo} value={orderInfo.shipping_phone} />
              </td>
            </tr>
            <tr>
              <th>배송메시지</th>
              <td>
                <textarea name="shipping_message" id="" cols="30" rows="10" className="input_control" style={{ width: 800 }} onChange={handleOrderInfo} value={orderInfo.shipping_message}></textarea>
              </td>
            </tr>
          </table>
        </section>

        <section className="terms_area">
          <div className="section_header">
            <input type="checkbox" id="terms_all_check" />
            <label htmlFor='terms_all_check'>쇼핑몰 이용약관, 개인정보 수집 및 이용 동의에 모두 동의합니다.</label>
          </div>
          <table className='pay_table' cellPadding={0} cellSpacing={0}>
            <colgroup>
              <col width="200px" />
            </colgroup>
            <tr>
              <th>쇼핑몰 이용약관</th>
              <td>
                <textarea name="" id="" cols="30" rows="10" className='input_control' style={{ width: 1000, height: 50 }} readOnly>
                  {"제1조(목적)이 약관은 (주)오조아 회사(전자상거래 사업자)가 운영하는 ojoa 온라인 몰 (이하 “몰”이라 한다)에서 제공하는 인터넷 관련 서비스(이하 “서비스”라 한다)를 이용함에 있어 사이버 몰과 이용자의 권리․의무 및 책임사항을 규정함을 목적으로 합니다.※「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.」제2조(정의)① “몰”이란 (주)오조아 회사가 재화 또는 용역(이하 “재화 등”이라 함)을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다."}
                </textarea>

                <div className='mt-10'>
                  <input type="checkbox" className='checkbox_control' />
                  <label htmlFor="">동의</label>
                </div>
              </td>
            </tr>
          
          </table>
        </section>
        <section>
          <div className="section_header">결제 예정 금액</div>
          <div className='total_checkout_section'>
            <ul className='border'>
              <li>
                <span className='bg-cell'>총 주문 금액 <button>내역보기</button></span>
                <span>{formatNumber(totalProductPrice)}원</span>
              </li>
              <li>
                <span className='bg-cell'>총 할인 + 부가결제 금액</span>
                <span>- {discountPrice}원</span>
              </li>
              <li>
                <span className='bg-cell'>총 결제예정 금액</span>
                <span>= {formatNumber(totalCheckoutPrice)}원</span>
              </li>
            </ul>
          </div>

          <ul className='total_checkout_payment'>
            <li className='bg-cell'>
              <span>총 할인금액</span>
              <span>{discountPrice}원</span>
            </li>
            <li className='bg-cell'>
              <span>총 부가결제금액</span>
              <span>{deliveryPrice}원</span>
            </li>
          </ul>
        </section>

        <section className='pay_select_payment_method'>
          <div className='pay_section_header'>결제수단</div>
          <div className='pay_select_payment_method_content border'>
            <div className='pay_select_payment_method_types'>
              <div className='pay_select_payment_method_types_selector'>
                <div>
                  <input type="radio" name="orders_method" value="card" id="paymethod_card" defaultChecked />
                  <label htmlFor="paymethod_card">카드결제</label>
                </div>
                <div>
                  <input type="radio" name="orders_method" value="vbank" id="paymethod_vbank" />
                  <label htmlFor="paymethod_vbank">가상계좌</label>
                </div>
              </div>
            </div>
            <div className='pay_select_payment_method_total'>
              <p>최종결제 금액</p>
              <p className='total_price'>{formatNumber(totalCheckoutPrice)}원</p>

              <button type='button' className='payment_btn' onClick={()=> {inOrders(); handlePaymentSuccess();} }>결제하기</button>
            </div>
          </div>
        </section>

        <section>
          <div className='ec_base_help'>
            <h3>이용안내</h3>
            <div className='inner'>
              <h4>WindowXP 서비스팩2를 설치하신후 결제가 정상적인 단계로 처리되지 않는경우, 아래의 절차에 따라 해결하시기 바랍니다.</h4>
              <ol>
                <li class="item1">
                  <a href="javascript:;" onclick="window.open('https://service-api.echosting.cafe24.com/shop/notice_XP_ActiveX.html','','width=795,height=500,scrollbars=yes',resizable=1);">1. 안심클릭 결제모듈이 설치되지 않은 경우 ActiveX 수동설치</a>
                </li>
                <li class="item2">
                  <a href="http://www.microsoft.com/korea/windowsxp/sp2/default.asp" target="_blank">2. Service Pack 2에 대한 Microsoft사의 상세안내 </a>
                </li>
              </ol>
              <div class>
                <h4>아래의 쇼핑몰일 경우에는 모든 브라우저 사용이 가능합니다.</h4>
                <ol>
                  <li><strong>1. KG이니시스, KCP, LG U+를 사용하는 쇼핑몰일 경우</strong></li>
                  <li>2. 결제가능브라우저 : 크롬,파이어폭스,사파리,오페라 브라우저에서 결제 가능 (단, window os 사용자에 한하며 리눅스/mac os 사용자는 사용불가)</li>
                  <li>3. 최초 결제 시도시에는 플러그인을 추가 설치 후 반드시 브라우저 종료 후 재시작해야만 결제가 가능합니다.(무통장, 휴대폰결제 포함)</li>
                </ol>
              </div>
              <div class>
                <h4>세금계산서 발행 안내</h4>
                <ol>
                  <li>1. 부가가치세법 제 54조에 의거하여 세금계산서는 배송완료일로부터 다음달 10일까지만 요청하실 수 있습니다.</li>
                  <li>2. 세금계산서는 사업자만 신청하실 수 있습니다.</li>
                  <li>3. 배송이 완료된 주문에 한하여 세금계산서 발행신청이 가능합니다.</li>
                  <li>4. [세금계산서 신청]버튼을 눌러 세금계산서 신청양식을 작성한 후 팩스로 사업자등록증사본을 보내셔야 세금계산서 발생이 가능합니다.</li>
                  <li>5. [세금계산서 인쇄]버튼을 누르면 발행된 세금계산서를 인쇄하실 수 있습니다.</li>
                </ol>
              </div>
              <div class>
                <h4>부가가치세법 변경에 따른 신용카드매출전표 및 세금계산서 변경안내</h4>
                <ol>
                  <li>1. 변경된 부가가치세법에 의거, 2004.7.1 이후 신용카드로 결제하신 주문에 대해서는 세금계산서 발행이 불가하며</li>
                  <li>2. 신용카드매출전표로 부가가치세 신고를 하셔야 합니다.(부가가치세법 시행령 57조)</li>
                  <li>3. 상기 부가가치세법 변경내용에 따라 신용카드 이외의 결제건에 대해서만 세금계산서 발행이 가능함을 양지하여 주시기 바랍니다.</li>
                </ol>
              </div>
              <div class>
                <h4>현금영수증 이용안내</h4>
                <ol>
                  <li>1. 현금영수증은 1원 이상의 현금성거래(무통장입금, 실시간계좌이체, 에스크로, 예치금)에 대해 발행이 됩니다.</li>
                  <li>2. 현금영수증 발행 금액에는 배송비는 포함되고, 적립금사용액은 포함되지 않습니다.</li>
                  <li>3. 발행신청 기간제한 현금영수증은 입금확인일로 부터 48시간안에 발행을 해야 합니다.</li>
                  <li>4. 현금영수증 발행 취소의 경우는 시간 제한이 없습니다. (국세청의 정책에 따라 변경 될 수 있습니다.)</li>
                  <li>5. 현금영수증이나 세금계산서 중 하나만 발행 가능 합니다.</li>
                </ol>
              </div>
            </div>
          </div>
        </section>



      </form>
    </div>


  );
};


export default Checkout;