<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"
    isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="contextPath"  value="${pageContext.request.contextPath}"  />
<html>
<head>
<meta  charset="utf-8">
 
<script>
 
function fn_modify_order_state(order_id,select_id){
    var s_delivery_state=document.getElementById(select_id);
    var index = s_delivery_state.selectedIndex;
    var value = s_delivery_state[index].value;
    //console.log("value: "+value );
     
    $.ajax({
        type : "post",
        async : false,
        url : "${contextPath}/admin/order/modifyDeliveryState.do",
        data : {
            "order_id":order_id,
            delivery_state:value
        },
        success : function(data, textStatus) {
            if(data.trim()=='mod_success'){
                alert("주문 정보를 수정했습니다.");
                location.href="${contextPath}/admin/order/adminOrderMain.do";
            }else if(data.trim()=='failed'){
                alert("다시 시도해 주세요.");    
            }
            
        },
        error : function(data, textStatus) {
            alert("에러가 발생했습니다."+data);
        },
        complete : function(data, textStatus) {
            //alert("작업을완료 했습니다");
            
        }
    }); //end ajax        
}
 
</script>
</head>
<body>
 
<table class="list_view">
        <tbody align=center >
            <tr style="background:#33ff00" >
                <td class="fixed" >주문번호</td>
                <td class="fixed">주문일자</td>
                <td>주문내역</td>
                <td>배송상태</td>
                <td>배송수정</td>
            </tr>
   <c:choose>
     <c:when test="${empty newOrderList}">            
            <tr>
               <td colspan=5 class="fixed">
                  <strong>주문한 상품이 없습니다.</strong>
               </td>
             </tr>
     </c:when>
     <c:otherwise>
     <c:forEach var="item" items="${newOrderList}" varStatus="i">
        <c:choose>
          <c:when test="${item.order_id != pre_order_id }">  
            <c:choose>
              <c:when test="${item.delivery_state=='delivery_prepared' }">
                <tr  bgcolor="lightgreen">    
              </c:when>
              <c:when test="${item.delivery_state=='finished_delivering' }">
                <tr  bgcolor="lightgray">    
              </c:when>
              <c:otherwise>
                <tr  bgcolor="orange">   
              </c:otherwise>
            </c:choose>   
                 <td width=10%>
                   <a href="javascript:fn_detail_order('${item.order_id}')">
                     <strong>${item.order_id}</strong>
                   </a>
                </td>
                <td width=20%>
                 <strong>${item.pay_order_time }</strong> 
                </td>
                <td width=50% align=left >
                    <strong>주문자:${item.orderer_name}</strong><br>
                  <strong>주문자 번화번호:${item.orderer_hp}</strong><br>
                  <strong>수령자:${item.receiver_name}</strong><br>
                  <strong>수령자 번화번호:${item.receiver_hp1}-${item.receiver_hp2}-${item.receiver_hp3}</strong><br>
                  <strong>주문상품명(수량):${item.goods_title}(${item.order_goods_qty})</strong><br>
                     <c:forEach var="item2" items="${newOrderList}" varStatus="j">
                       <c:if test="${j.index > i.index }" >
                          <c:if  test="${item.order_id ==item2.order_id}" >
                            <strong>주문상품명(수량):${item2.goods_title}(${item2.order_goods_qty})</strong><br>
                      </c:if>   
                       </c:if>
                    </c:forEach> 
                </td>
                <td width=10%>
                 <select name="s_delivery_state${i.index }"  id="s_delivery_state${i.index }">
                 <c:choose>
                   <c:when test="${item.delivery_state=='delivery_prepared' }">
                     <option  value="delivery_prepared" selected>배송준비중</option>
                     <option  value="delivering">배송중</option>
                     <option  value="finished_delivering">배송완료</option>
                     <option  value="cancel_order">주문취소</option>
                     <option  value="returning_goods">반품</option>
                   </c:when>
                    <c:when test="${item.delivery_state=='delivering' }">
                    <option  value="delivery_prepared" >배송준비중</option>
                     <option  value="delivering" selected >배송중</option>
                     <option  value="finished_delivering">배송완료</option>
                     <option  value="cancel_order">주문취소</option>
                     <option  value="returning_goods">반품</option>
                   </c:when>
                   <c:when test="${item.delivery_state=='finished_delivering' }">
                    <option  value="delivery_prepared" >배송준비중</option>
                     <option  value="delivering"  >배송중</option>
                     <option  value="finished_delivering" selected>배송완료</option>
                     <option  value="cancel_order">주문취소</option>
                     <option  value="returning_goods">반품</option>
                   </c:when>
                   <c:when test="${item.delivery_state=='cancel_order' }">
                    <option  value="delivery_prepared" >배송준비중</option>
                     <option  value="delivering"  >배송중</option>
                     <option  value="finished_delivering" >배송완료</option>
                     <option  value="cancel_order" selected>주문취소</option>
                     <option  value="returning_goods">반품</option>
                   </c:when>
                   <c:when test="${item.delivery_state=='returning_goods' }">
                    <option  value="delivery_prepared" >배송준비중</option>
                     <option  value="delivering"  >배송중</option>
                     <option  value="finished_delivering" >배송완료</option>
                     <option  value="cancel_order" >주문취소</option>
                     <option  value="returning_goods" selected>반품</option>
                   </c:when>
                   </c:choose>
                 </select> 
                </td>
                <td width=10%>
                 <input  type="button" value="배송수정"  onClick="fn_modify_order_state('${item.order_id}','s_delivery_state${i.index}')"/>
                </td>
            </tr>
        </c:when>
        </c:choose>    
        <c:set  var="pre_order_id" value="${item.order_id }" />
    </c:forEach>
    </c:otherwise>
  </c:choose>    
         <tr>
             <td colspan=8 class="fixed">
                 <c:forEach   var="page" begin="1" end="10" step="1" >
                 <c:if test="${section >1 && page==1 }">
                  <a href="${contextPath}/admin/order/adminOrderMain.do?chapter=${section-1}&pageNum=${(section-1)*10 +1 }">&nbsp;&nbsp;</a>
                 </c:if>
                  <a href="${contextPath}/admin/order/adminOrderMain.do?chapter=${section}&pageNum=${page}">${(section-1)*10 +page } </a>
                 <c:if test="${page ==10 }">
                  <a href="${contextPath}/admin/order/adminOrderMain.do?chapter=${section+1}&pageNum=${section*10+1}">&nbsp; next</a>
                 </c:if> 
                  </c:forEach> 
           </td>
        </tr>             
        </tbody>
    </table>
  </form>       
    <div class="clear"></div>
</body>
</html>