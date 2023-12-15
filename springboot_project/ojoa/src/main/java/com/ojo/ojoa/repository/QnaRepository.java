package com.ojo.ojoa.repository;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ojo.ojoa.DTO.QnaDTO;
import com.ojo.ojoa.entity.Qna;

@Repository
public interface QnaRepository extends JpaRepository<Qna, Integer> {
	// Qna Entity와 관련된 데이터베이스 작업을 수행

	// 기본 리스트 반환
	// Qna Entity와 Product Entity를 조인하여, 특정 조건에 정렬된 QnA 목록을 검색
	@Query("SELECT new com.ojo.ojoa.DTO.QnaDTO$QnaMainListDTO(q.qna_seq, q.prod_num, p.prod_mainimage, p.prod_name, q.qna_category, q.qna_title, q.qna_content, '' AS titleIcon, q.qna_reply, q.id, q.qna_redate) FROM Qna q LEFT JOIN FETCH Product p ON q.prod_num = p.prod_num ORDER BY CASE WHEN q.qna_category = '공지사항' THEN 0 ELSE 1 END ASC, q.qna_redate DESC")
	// findAllQnaList(); : <QnaDTO.QnaMainListDTO>형식의 데이터를 검색하여 반환
	// 반환되는 DTO에는 QnA 항목의 주요정보가 포함되어있다.
	List<QnaDTO.QnaMainListDTO> findAllQnaList();

	// 검색 기능 조건 추가
	@Query("SELECT new com.ojo.ojoa.DTO.QnaDTO$QnaMainListDTO(q.qna_seq, q.prod_num,p.prod_mainimage, p.prod_name, q.qna_category, q.qna_title, q.qna_content, '' AS titleIcon, q.qna_reply, q.id, q.qna_redate) "
			+ "FROM Qna q LEFT JOIN FETCH Product p ON q.prod_num = p.prod_num "
			+ "WHERE (:board_category IS NULL OR :board_category = '' OR q.qna_category = :board_category) "
			// board_category가 null이거나 빈 문자열이면 무시, OR q.qna_category가 주어진 board_category와
			// 일치하는지 확인
			+ "AND (:search_date IS NULL OR q.qna_redate >= :search_date) "
			// search_date가 null이거나 현재 날짜보다 이전인 경우를 무시, OR q.qna_redate가 주어진 search_date보다
			// 크거나 같은지 확인
			+ "AND (:search_query IS NULL OR :search_query = '' OR  ( "
			// search_query가 null이거나 빈 문자열이면 무시, OR 다음 조건 중 하나를 만족하는지 확인
			+ "       (:search_key = 'subject' AND q.qna_title LIKE %:search_query%) OR "
			// search_key = 'subject'이고, q.qna_title이 주어진 search_query를 포함하는지 확인
			+ "       (:search_key = 'content' AND q.qna_content LIKE %:search_query%) OR "
			// search_key = 'content'이고, q.qna_content가 주어진 search_query를 포함하는지 확인
			+ "       (:search_key = 'writer_name' AND q.id LIKE %:search_query%) OR "
			// search_key = 'writer_name'이고, q.id가 주어진 search_query를 포함하는지 확인
			+ "       (:search_key = 'product' AND p.prod_name LIKE %:search_query%))) "
			// search_key = 'product'이고, p.prod_name이 주어진 search_query를 포함하는지 확인
			+ "ORDER BY CASE WHEN q.qna_category = '공지사항' THEN 0 ELSE 1 END, q.qna_redate DESC")
	List<QnaDTO.QnaMainListDTO> findConditionQnaList(
			// @Param: 메서드의 매개변수와 JPQL 쿼리에서 사용되는 매개변수를 매핑
			@Param("board_category") String board_category, @Param("search_date") LocalDateTime search_date,
			@Param("search_key") String search_key, @Param("search_query") String search_query);

	// 관리자 답글기능
	@Modifying
	@Transactional
	@Query("update Qna q SET q.qna_reply = :reply, q.qna_answer='O' where q.qna_seq = :seq")
	void replyUpdate(@Param("seq") int qna_seq, @Param("reply") String qna_reply);

	// 페이지네이션
	@Transactional
	@Query("Select q from Qna q order by q.qna_seq asc")
	Page<Qna> getQnaList(Pageable pageable);

	// mamber조인 - 회원정보
	@Query("SELECT new com.ojo.ojoa.DTO.QnaDTO$QnaItemResDTO(q.prod_num, m.name, q.qna_category, q.qna_title, q.qna_content) "
			+ "FROM Qna q LEFT JOIN FETCH com.ojo.ojoa.entity.Member m ON q.id = m.id "
			+ "WHERE q.id = :id AND q.qna_seq = :qna_seq")
	QnaDTO.QnaItemResDTO selectOneById(@Param("id") String id, @Param("qna_seq") int qna_seq);

	// 수정하기
	@Modifying
	@Query("UPDATE Qna q SET q.prod_num = :prod_num, q.qna_category = :qna_category, q.qna_title = :qna_title, q.qna_content = :qna_content, q.qna_redate = now() "
			+ "WHERE q.qna_seq = :qna_seq AND q.id = :id")
	void update(@Param("qna_seq") int qna_seq, @Param("id") String id, @Param("prod_num") int prod_num,
			@Param("qna_title") String qna_title, @Param("qna_category") String qna_category,
			@Param("qna_content") String qna_content);

} // class
