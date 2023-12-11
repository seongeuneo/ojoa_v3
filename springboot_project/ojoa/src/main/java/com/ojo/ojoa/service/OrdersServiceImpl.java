package com.ojo.ojoa.service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.ojo.ojoa.DTO.OrdersDetailReqDTO;
import com.ojo.ojoa.DTO.OrdersReqDTO;
import com.ojo.ojoa.DTO.OrdersResDTO;
import com.ojo.ojoa.entity.Orders;
import com.ojo.ojoa.entity.OrdersDetail;
import com.ojo.ojoa.repository.OrdersDetailRepository;
import com.ojo.ojoa.repository.OrdersRepository;

import lombok.RequiredArgsConstructor;

//@Log4j2
@Service
@RequiredArgsConstructor 
public class OrdersServiceImpl implements OrdersService {

    private final OrdersRepository ordersRepository;
    private final OrdersDetailRepository ordersDetailRepository;

 // ** selectList
 	@Override
 	public List<Orders> selectList() {
 		return ordersRepository.findAll();
 	}
 	
 	// ** selectOne
 	@Override
 	public Orders selectOne(int orders_num) {
 		Optional<Orders> result = ordersRepository.findById(orders_num);
     	if ( result.isPresent() ) return result.get();
     	else return null;
 	}

 	// ** insert, update
 	@Override
 	public String save(Orders entity) {
 		ordersRepository.save(entity); // 저장 또는 수정
         return entity.getId();   // 저장후 key return
 	}
 	 
 	// ** cancel
 	@Override
 	public int delete(int orders_num) {
 		ordersRepository.deleteById(orders_num);
 		return orders_num ; // 삭제후 key return
 	}
 	
 // ** react selectAllList
//  	@Override
//  	public List<OrdersDTO> selectAllList() {
//  		return ordersRepository.findAllOrdersList();
//  	}
 	
 	// 주문번호 생성
 	public String generateOrderNumber(String loginID) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
        String timestamp = dateFormat.format(new Date());
        String prefix = "1";
        if (loginID == "" || loginID == null) {
        	prefix = "2";
        }
        return prefix + timestamp + generateRandomNumber();
    }
 	
 	// 5자리의 랜덤숫자 생성
 	private String generateRandomNumber() {
 	    Random random = new Random();
 	    StringBuilder randomNumber = new StringBuilder();

 	    for (int i = 0; i < 5; i++) {
 	        randomNumber.append(random.nextInt(10)); // 0부터 9까지의 숫자 중 하나를 추가
 	    }

 	    return randomNumber.toString();
 	}
 	
 	// 주문정보 DB 저장 후 정보 반환
 	@Override
 	public OrdersResDTO.OrderCompleteDTO saveOrders(String loginID, OrdersReqDTO entity) {
 		OrdersResDTO.OrderCompleteDTO result = new OrdersResDTO.OrderCompleteDTO();
 		Orders orders = new Orders();
 		String orderNum = generateOrderNumber(loginID);
 		//주문정보 설정
 		orders.setOrders_num_confirm(orderNum);
 		orders.setOrders_password(entity.getMemberCheck());
 		orders.setId(loginID);
 		orders.setOrders_indate(LocalDateTime.now());
 		orders.setOrders_totalprice(entity.getOrders_totalprice());
 		orders.setOrders_price(entity.getOrders_price());
 		orders.setOrders_method(entity.getOrders_method());
 		orders.setBuyer(entity.getBuyer());
 		orders.setPost_number(entity.getPost_number());
 		orders.setAddress1(entity.getAddress1());
 		orders.setAddress2(entity.getAddress2());
 		orders.setPhone1(entity.getPhone1());
 		orders.setPhone2(entity.getPhone2());
 		orders.setPhone3(entity.getPhone3());
 		orders.setEmail1(entity.getEmail1());
 		orders.setEmail2(entity.getEmail2());
 		orders.setMessage(entity.getMessage());
		Orders ordersResult = ordersRepository.save(orders); // 현재까지의 주문 정보를 데이터베이스에 저장 또는 수정
		
		if (ordersResult != null) {
			result.setOrders_num_confirm(orderNum);
			result.setOrders_totalprice(entity.getOrders_totalprice());
			result.setOrders_price(entity.getOrders_price());
			
			// 상세주문정보 저장
			// 주문 상세 정보가 성공적으로 저장되었다면, ordersDetailCnt를 증가시킴
			int ordersDetailCnt = 0;
			for (OrdersDetailReqDTO ordersDetail :entity.getOrdersDetail()) {
				OrdersDetail saveOrdersDetail = new OrdersDetail();
				saveOrdersDetail.setOrders_num(ordersResult.getOrders_num());
				saveOrdersDetail.setProd_num(ordersDetail.getProd_num());
				saveOrdersDetail.setQuantity(ordersDetail.getQuantity());
				int totalPrice = ordersDetail.getProductPriceFormatted() * ordersDetail.getQuantity();
				saveOrdersDetail.setOrdersdt_totalprice(totalPrice);
				
				// 필요한 값을 추가적으로 넣어야함.
				// saveOrdersDetail.setOrdersdt_shippingfee(0);
				// saveOrdersDetail.setOrdersdt_result("");
					
				OrdersDetail ordersDetailResult = ordersDetailRepository.save(saveOrdersDetail);
				if (ordersDetailResult != null) {
					ordersDetailCnt += 1;
				}
			}
			return result; // 모든 주문 정보가 성공적일 경우
		} else {
			return null; // 주문정보 저장실패일 경우 null
		}
 	}
 	
 	// 비회원 : 주문번호와 비밀번호를 이용하여 주문 정보를 조회
 	@Override
 	public List<OrdersResDTO.OrderNonMemberDTO> selectOneOrderNum(String ordersdt_num, String password) {
 		List<OrdersResDTO.OrderNonMemberDTO> result = ordersRepository.findNonMemberOrder(ordersdt_num, password);
 		return result ;
 	}
 	
 	// 회원 : 주문정보 조회
 	// loginID : 사용자ID
 	// startDate : 조회시작날짜 (null일경우 제한 없음)
 	// endDate : 조회종료날짜 (null일경우 제한없음)
 	// orderNumber : 조회할 특정 주문번호 (null일경우 제한없음)
 	@Override
 	public List<OrdersResDTO.OrderNonMemberDTO> selectOrderList(String loginID, String startDate, String endDate, String orderNumber) {
 		LocalDateTime tmp_startDate = null;
 		LocalDateTime tmp_endDate = null;
 		if (startDate != null) {
 			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
 			tmp_startDate = LocalDateTime.parse(startDate + "T00:00:00");
 		}
		
 		if (endDate != null) {
 			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
 			tmp_endDate = LocalDateTime.parse(endDate + "T00:00:00");
 		}
        
 		List<OrdersResDTO.OrderNonMemberDTO> result = ordersRepository.findOrderList(loginID, tmp_startDate, tmp_endDate, orderNumber);
 		return result ;
 	}
 	
 	
 	
 	
 	
 	
 	
 } //class
