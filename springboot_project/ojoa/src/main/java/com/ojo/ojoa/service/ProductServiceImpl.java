package com.ojo.ojoa.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ojo.ojoa.domain.CartProdDTO;
import com.ojo.ojoa.domain.ProdIMGDTO;
import com.ojo.ojoa.entity.Member;
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

} // class
