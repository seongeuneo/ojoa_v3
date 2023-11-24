import com.ojo.ojoa.model.Cart;
import com.ojo.ojoa.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carts")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestBody Cart cart) {
        Cart addedCart = cartService.saveCart(cart);
        return new ResponseEntity<>(addedCart, HttpStatus.CREATED);
    }

    @GetMapping("/{cartNum}")
    public ResponseEntity<Cart> getCartByCartNum(@PathVariable int cartNum) {
        Cart cart = cartService.getCartByCartNum(cartNum);
        if (cart != null) {
            return new ResponseEntity<>(cart, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{cartNum}")
    public ResponseEntity<Void> deleteCartByCartNum(@PathVariable int cartNum) {
        cartService.deleteCartByCartNum(cartNum);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Cart>> getCartsByUserId(@PathVariable String userId) {
        List<Cart> carts = cartService.getCartsByUserId(userId);
        return new ResponseEntity<>(carts, HttpStatus.OK);
    }
}