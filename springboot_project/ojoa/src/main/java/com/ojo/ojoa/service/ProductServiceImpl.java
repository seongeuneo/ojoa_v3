package com.ojo.ojoa.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ojo.ojoa.domain.ProdIMGDTO;
import com.ojo.ojoa.entity.Product;
import com.ojo.ojoa.repository.ProductRepository;
import com.ojo.ojoa.repository.ReviewRepository;

import lombok.RequiredArgsConstructor;

//@Log4j2
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

	private final ProductRepository productRepository;
	private final ReviewRepository reviewRepository;

	// ** selectList
	@Override
	public List<Product> selectList() {
		return productRepository.findAll();
	}

	// ** selectOne
	@Override
	public Product selectOne(int prod_num) {
		Optional<Product> result = productRepository.findById(prod_num);
		if (result.isPresent())
			return result.get();
		else
			return null;
	}

	// ** insert, update
	@Override
	public int save(Product entity) {
		productRepository.save(entity); // 저장 또는 수정
		return entity.getProd_num(); // 저장후 key return
	}

	// ** delete
	@Override
	public int delete(int prod_num) {
		productRepository.deleteById(prod_num);
		return prod_num; // 삭제후 key return
	}

	@Override
	public Product getProductById(String productId) {
		int prodNum = Integer.parseInt(productId);
		Optional<Product> result = productRepository.findById(prodNum);
		return result.orElse(null);
	}

	// 평점
	public void rUpdate(Integer prod_num) {
		// productId를 사용하여 review_rate의 평균 계산
		float averageRate = reviewRepository.calculateAverageRateByProdNum(prod_num);

		// Product 엔티티를 데이터베이스에서 가져와서 prod_grade 값을 설정한 후 저장
		Product product = productRepository.findById(prod_num).orElse(null);
		if (product != null) {
			product.setProd_grade(averageRate);
			productRepository.save(product);
		}
	}

	public void update(int prod_num) {
		productRepository.update(prod_num);

	}

	// 페이지네이션
	@Override
	public Page<Product> getProductList(Pageable pageable) {

		return productRepository.getProductList(pageable);
	}

	// ** (상품+상품이미지) 테이블 Join
	@Override
	public List<ProdIMGDTO> findProdIMG() {
		return productRepository.findProdIMG();
	}
	
	@Override
    public Map<String, Object> getProductListWithImages(Pageable pageable) {
        Map<String, Object> productListWithImages = new HashMap<>();
        
        // 페이지네이션된 제품 목록 가져오기
        Page<Product> productList = getProductList(pageable);
        productListWithImages.put("productList", productList.getContent());

        // 제품 이미지 정보 가져오기
        List<ProdIMGDTO> prodIMGList = findProdIMG();
        productListWithImages.put("prodIMGList", prodIMGList);

        return productListWithImages;
    }
	
	@Override
	public boolean checkIfProductNameExists(String prod_name) {
		// 상품 이름이 존재하는지 확인하는 로직을 구현합니다.
        // 여기서는 데이터베이스에서 해당 이름을 검색하여 존재 여부를 확인하는 예시를 보여드립니다.
        // 실제 데이터베이스 조회 및 확인을 위한 코드를 작성해야 합니다.
        
        // 예를 들어, ProductRepository를 통해 데이터베이스에서 상품 이름을 검색하는 코드
        boolean exists = productRepository.existsByProductName(prod_name);
        
        // 검색 결과를 반환합니다. 존재하면 true, 존재하지 않으면 false를 반환합니다.
        return exists;
	}

} // class
