import com.ojo.ojoa.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    public CartServiceImpl(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public Cart getCartByCartNum(int cartNum) {
        return cartRepository.findById(cartNum).orElse(null);
    }

    @Override
    public void deleteCartByCartNum(int cartNum) {
        cartRepository.deleteById(cartNum);
    }

    @Override
    public List<Cart> getCartsByUserId(String userId) {
        return cartRepository.findByUserId(userId); // 사용자 ID에 해당하는 장바구니 목록을 가져오는 메서드로 수정
    }

    // 다른 인터페이스 메서드들의 구현 추가 가능
}
