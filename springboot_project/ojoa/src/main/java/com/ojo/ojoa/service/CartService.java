import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ojo.ojoa.repository.CartRepository;

@Service
@Transactional
public class CartService {

    private final CartRepository cartRepository;

    @Autowired
    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    // Cart 엔티티 저장
    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }

    // Cart 엔티티 조회 (cartNum으로 조회)
    public Cart getCartByCartNum(int cartNum) {
        return cartRepository.findById(cartNum).orElse(null);
    }

    // Cart 엔티티 삭제 (cartNum으로 삭제)
    public void deleteCartByCartNum(int cartNum) {
        cartRepository.deleteById(cartNum);
    }

    // 유저 ID로 해당 유저의 장바구니 목록 조회
    public List<Cart> getCartsByUserId(String userId) {
        return cartRepository.findByUserId(userId);
    }

    // 기타 필요한 비즈니스 로직 추가 가능
}