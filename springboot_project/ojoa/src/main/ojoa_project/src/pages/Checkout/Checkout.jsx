
import React, { useState } from 'react';
// import DaumPostcode from "react-daum-postcode";
// import Iamport, { PaymentRequest } from 'kamport'
import './Checkout.css';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import PaymentConfirmation from './PaymentConfirmation';
import { useNavigate } from 'react-router-dom';

const mockData = [
  {
    "id": 101,
    "imgNo": 101,
    "productName": "조금 큰 나무 침대",
    "productPriceFormatted": "385000",
    "productPromotion": "7",
    "productInfo": "안녕하세요 그렇습니다",
    "productReview": "8",
    "productGrade": "4.8",
    "quantity": 1
  }
];



function Checkout({ cart }) {

  // const cart = mockData;

  // const { handleSubmit: _handleSubmit, register, setValue, getValues } = useForm({
  const { handleSubmit: _handleSubmit, register, setValue, getValues } = useForm({
    defaultValues: {
      paymentMethod: 'card', // cart , vbank
      email: {
        name: '',
        provider: ''
      },
      phone1: '',
      phone2: '',
      phone3: '',
      buyer_name: '',
    }
  })



  const formatNumber = (num) => {
    return Intl.NumberFormat().format(num)
  }

  // 배송비
  const deliveryPrice = 0;

  // 할인금액
  const discountPrice = 0;

  const displayedCartList = useMemo(() => {
    return cart.map(item => ({
      ...item,
      dispalyedPrice: formatNumber(item.productPriceFormatted),
      totalPrice: item.quantity * Number(item.productPriceFormatted),
      displayedTotalPrice: formatNumber(item.quantity * Number(item.productPriceFormatted))
    }))
  }, [cart]);

  const totalProductPrice = useMemo(() => {
    return displayedCartList.reduce((acc, curr) => {
      return acc + curr.totalPrice
    }, 0)
  }, [displayedCartList]);

  // 총 결제 금액
  const totalCheckoutPrice = totalProductPrice + deliveryPrice - discountPrice;

  const navigate = useNavigate();

  // 결제 성공 시 호출되는 함수
  const handlePaymentSuccess = () => {
    // history.push를 사용하여 '/payment-confirmation' 경로로 이동
    navigate('/paymentconfirmation');
  };

  // 결제진행
  // const handleSubmit = _handleSubmit(async (values) => {
  //   await Iamport.initialize();

  // 아임포트 프로세스 - 결제시스템을 연결. 결제 API 서비스
  // const imp = new Iamport("iamport"); // your iamport key

  // merchant_uid 생성 - 결제요청
  // const merchant_uid = `ORDER_${new Date().getTime()}`;

  // const displayProductName = `${cart[0].productName} ${cart.length > 1 ? `${cart.length - 1}개` : ''}`;

  // request 객체 생성
  // const req = new PaymentRequest({
  // param - 결제를 위한 요청 객체를 초기화하고, 이니시스 결제 게이트웨이와 상호작용하기 위한 정보를 포함
  //pg: "html5_inicis",
  //이니시스결제시스템사용
  //   pay_method: values.paymentMethod,
  //   merchant_uid: merchant_uid,
  //   name: displayProductName,
  //   amount: totalCheckoutPrice,
  //   buyer_email: `${values.name}@${values.email.provider}`,
  //   buyer_name: values.buyer_name,
  //   buyer_tel: `${values.phone1}-${values.phone2}-${values.phone3}`,
  //   buyer_addr: "서울특별시 강남구 신사동",
  //   buyer_postcode: "01181",
  // });

  //   try {
  //     // 결제요청
  //     const payment = await imp.requestPay(req);
  //     alert('결제성공')
  //   } catch (e) {
  //     // 결제실패
  //     alert('결제실패')
  //     console.error(e);
  //   }
  // })


  //우편번호 API
  // const [isPostOpen, setIsPostOpen] = useState(true);
  // const [isZoneCode, setIsZoneCode] = useState("");
  // const [isAddress, setIsAddress] = useState("");

  // const handleComplete = (data) => {
  //   let fullAddress = data.address;
  //   let extraAddress = "";

  //   if (data.addressType === "R") {
  //     if (data.bname !== "") {
  //       extraAddress += data.bname;
  //     }
  //     if (data.buildingName !== "") {
  //       extraAddress +=
  //         extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
  //     }
  //     fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
  //   }
  //   setIsZoneCode(data.zonecode);
  //   setIsAddress(fullAddress);
  //   setIsPostOpen(true);

  //   if (cart && cart.length > 0) {
  //     const displayProductName = `${cart[0].productName} ${cart.length > 1 ? `${cart.length - 1}개` : ""
  //       }`;

  //     const postCodeStyle = {
  //       display: "block",
  //       position: "absolute",
  //       top: "50%",
  //       width: "400px",
  //       height: "500px",
  //       padding: "7px",
  //     }
  //   }
  // };


  return (
    <div className="Checkout">
      {/* <form onSubmit={handleSubmit}> */}
      <form>
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
                <th>상품정보</th>
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
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={`/thumbs/${item.imgNo}_1.jpg`} alt="" style={{ width: 80, height: 80, objectFit: 'contain' }} />
                  </td>
                  <td>{item.productName}</td>
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
        </section>

        <hr />

        <section>
          <p className="pay_section_header">배송정보</p>
          <table className="pay_table" cellPadding={0} cellSpacing={0}>
            <colgroup>
              <col width="200px" />
            </colgroup>
            <tr>
              <th className="pay_table_th">주문조회 비밀번호 *</th>
              <td>
                <input type="password" className="input_control" />
                <span className="help_text">{`(영문대소문자/숫자/특수문자 중 2가지 이상 조합, 6자~16자)`}</span>
              </td>
            </tr>
            <tr>
              <th>주문조회 비밀번호 확인 *</th>
              <td>
                <input type="password" className="input_control" />
              </td>
            </tr>
            <tr>
              <th>받으시는 분 *</th>
              <td>
                <input type="text" className="input_control" {...register('buyer_name')} />
              </td>
            </tr>
            <tr>
              <th>주소 *</th>
              <td>
                <input type="text" className="input_control" />
                {/* <button className="btn-control" onClick={() => setIsPostOpen(true)}>우편번호</button> */}
                <button className="btn-control">우편번호</button>
                <br />
                {/* <input type="text" className="input_control" value={isZoneCode} readOnly /> */}
                <input type="text" className="input_control" readOnly />
                <p className="help_text">{`기본주소`}</p>
                <br />
                {/* <input type="text" className="input_control_help" value={isAddress} readOnly /> */}
                <input type="text" className="input_control_help" readOnly />
                <p className="help_text">{`나머지주소(선택입력가능)`}</p>
                {/* {isPostOpen && (
                  <DaumPostcode
                    onComplete={handleComplete}
                    autoClose
                  />
                )} */}
              </td>
            </tr>
            <tr>
              <th>휴대전화 *</th>
              <td>
                <select name="" id="" className="input_control"  {...register('phone1')}>
                  <option value="010">010</option>
                </select>
                {" - "}
                <input type="text" className="input_control" {...register('phone2')} />
                {" - "}
                <input type="text" className="input_control"  {...register('phone3')} />
              </td>
            </tr>
            <tr>
              <th>이메일 *</th>
              <td>
                <input type="text" className="input_control" {...register('email.name')} />
                {" @ "}
                <input type="text" className="input_control" {...register('email.provider')} />
                <select name="" id="" className="input_control" {...register('email.provider')}>
                  <option value="">직접입력</option>
                  <option value="naver.com">naver.com</option>
                  <option value="daum.net">daum.net</option>
                  <option value="gmail.com">gmail.com</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>배송메시지</th>
              <td>
                <textarea name="" id="" cols="30" rows="10" className="input_control" style={{ width: 500 }}></textarea>
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
                <textarea name="" id="" cols="30" rows="10" className='input_control' style={{ width: 500 }} readOnly>
                  {"쇼핑몰 이용약관"}
                </textarea>

                <div className='mt-10'>
                  <input type="checkbox" className='checkbox_control' />
                  <label htmlFor="">동의</label>
                </div>
              </td>
            </tr>
            <tr>
              <th>비회원 구매 시 개인정보수집 이용동의</th>
              <td>
                <textarea name="" id="" cols="30" rows="10" className='input_control' style={{ width: 500 }} readOnly>
                  {"개인정보수집 이용동의"}
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
                  <input type="radio" name="paymentMethod" value="card" id="paymethod_card" defaultChecked {...register('paymentMethod')} />
                  <label htmlFor="paymethod_card">카드결제</label>
                </div>
                <div>
                  <input type="radio" name="paymentMethod" value="vbank" id="paymethod_vbank" {...register('paymentMethod')} />
                  <label htmlFor="paymethod_vbank">가상계좌</label>
                </div>
              </div>
            </div>
            <div className='pay_select_payment_method_total'>
              <p>최종결제 금액</p>
              <p className='total_price'>{formatNumber(totalCheckoutPrice)}원</p>

              <button type='submit' className='payment_btn' onClick={handlePaymentSuccess}>결제하기</button>
            </div>
          </div>
        </section>
      </form>
    </div>


  );
};


export default Checkout;
