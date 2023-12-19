import React, { useState, useEffect } from "react";
import "./Wish.css";
import { Link } from "react-router-dom"
import axios from "axios";
import { useProductList } from "../../ProductList/useProductList";



function Wish() {
    // Spring Boot 연결
    const [data, setData] = useState([]);
  

    const prod_num = data.prod_num;
    // console.log("prod_num =>" + prod_num);

    useEffect(() => {
        axios
            .post("/api/wish/allWishList")
            .then((response) => {
                const currentWishlist = response.data; // 현재 관심 상품 목록
                const isProductExists = currentWishlist.some(item => item.prod_num === prod_num);

                if (isProductExists) {
                    // 이미 관심목록에 있는 상품이라면 alert 창 띄우기
                    alert("이미 관심목록에 있는 상품입니다.");
                } else {
                    // prod_num이 중복되지 않는다면 상태 업데이트
                    setData(currentWishlist);
                    console.log("서버연결성공 => ", currentWishlist);
                }
            })
            .catch((error) => {
                console.log(error);
                // alert("상품을 관심목록에 추가하는데 문제가 발생했습니다.");
            });
    }, []);

    // axios를 사용하여 DELETE 요청 보내기
    const handleDelete = (prodNum) => {
        axios.delete(`/api//wdelete/${prodNum}`)
            .then((response) => {
                // 삭제 요청이 성공하면 성공 메시지 출력 혹은 다른 작업 수행
                console.log("삭제 요청 성공:", response);
                // 성공했을 때 필요한 작업 수행

                // 삭제된 항목을 화면에서도 제거하려면 해당 요소를 state에서 필터링하여 재설정해야합니다.
                setData(data.filter(item => item.prod_num !== prodNum));
            })
            .catch((error) => {
                // 삭제 요청이 실패한 경우 에러 메시지 출력
                console.error("삭제 요청 실패:", error);
            });
    };

    // const useProductListItem = useProductList();
    // const matchedItems = data.filter(item => {
    //     return useProductListItem.some(dataItem => dataItem.prod_num === item.prod_num);
    // });

    // 장바구니 아이콘을 누르면 해당 상품이 장바구니에 추가 -----------------------------
    // 상품을 장바구니에 추가하는 함수
    function AddToCart(prodNum) {
        const productData = { prod_num: prodNum, quantity: 1 }; // 클릭된 상품의 prod_num 사용

        axios.post('/api/cart/saveCart', productData)
            .then(response => {
                console.log("장바구니 담기" + response.data);
                alert('장바구니에 추가되었습니다! 관심목록에서 제외됩니다.');
                // handleDelete(prodNum);
                // 상품을 장바구니에 담으면 관심상품 목록에서 삭제
            })
            .catch(error => {
                console.error('장바구니 추가 중 오류:', error);
                alert('상품을 장바구니에 추가하는데 문제가 발생했습니다.');
            });
    }

    return (
        <div className="Wish">
            <div className="path">
                <span>현재 위치</span>
                <ol>
                    <li><Link to="/">홈</Link></li>
                    <li title="현재 위치">&gt; &nbsp;&nbsp;Wish</li>
                </ol>
            </div>

            <div className="pageTlt">
                <h2>WISHLIST</h2>
                <div className="txt_01">관심상품</div>
            </div>

            {/*  관심목록페이지/wish페이지  */}
            <div className="container">
                <div id="wish_backbody">
                    <div id="wish_frame">
                        <form>
                            <table class="wishTable">
                                <tr bgcolor="Orange">
                                    <th>관심상품 인덱스</th>
                                    <th>로그인 아이디</th>
                                    <th>상품 번호</th>
                                    <th>상품 이름</th>
                                    <th>상품 이미지</th>
                                    <th>장바구니 추가</th>
                                    <th>관심상품 제거</th>
                                </tr>
                                {data.map((item) => (
                                    <tr key={item.wish_num}>
                                        <td>{item.wish_num}</td>
                                        <td>{item.id}</td>
                                        <td>{item.prod_num}</td>
                                        <td><Link to={`/ProductDetail/${item.prod_num}/DetailInfo01`} state={{ productData: item }}>{item.prod_name}</Link></td>
                                        <td class="wishIMG"><Link to={`/ProductDetail/${item.prod_num}/DetailInfo01`} state={{ productData: item }}><img src={`/thumbs/${item.prod_mainimage}`} alt={`Product ${item.prod_num}`} /></Link></td>
                                        <td align="center">
                                            <button class="cartBTN" onClick={(e) => { e.preventDefault(); AddToCart(item.prod_num); handleDelete(item.wish_num); }}>장바구니 추가</button>
                                        </td>
                                        <td align="center">
                                            <button class="wishBTN" onClick={() => handleDelete(item.wish_num)}>삭제</button>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </form>
                    </div>

                </div>

            </div>
        </div>
    )
};

export default Wish;