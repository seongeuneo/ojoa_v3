package com.ojo.ojoa.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ojo.ojoa.DTO.QnaDTO;
import com.ojo.ojoa.entity.Member;
import com.ojo.ojoa.entity.Qna;
import com.ojo.ojoa.repository.QnaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QnaServiceImpl implements QnaService {
//QnA 데이터에 대한 비즈니스 로직을 구현한 서비스 클래스

	private final QnaRepository qnaRepository;
	// 모두 QnaRepository를 통해 실행하여 결화를 반환

	// 답변달기!!!
	@Override
	public int replyUpdate(int qna_seq, String qna_reply) {
		qnaRepository.replyUpdate(qna_seq, qna_reply);
		return qna_seq;
	}

	// ** selectList
	@Override
	public List<Qna> selectList() {
		return qnaRepository.findAll();
	}

	// 페이지네이션
	@Override
	public Page<Qna> getQnaList(Pageable pageable) {
		return qnaRepository.getQnaList(pageable);
	}

	// ** selectOne
	@Override
	public Qna selectOne(int qna_seq) {
		Optional<Qna> result = qnaRepository.findById(qna_seq);
		if (result.isPresent())
			return result.get();
		else
			return null;
	}

	// ** insert, update
	@Override
	public int save(Qna entity) {
		qnaRepository.save(entity); // 저장 또는 수정
		return entity.getQna_seq(); // 저장후 key return
	}

	// ** delete
	@Override
	public int delete(int qna_seq) {
		qnaRepository.deleteById(qna_seq);
		return qna_seq; // 삭제후 key return
	}

	// ** reply
//	 	@Override
//	    public void replyinsert(int qna_seq, String qna_reply) {
//	 		qnaRepository.replyinsert(qna_seq, qna_reply);
//	    }

	// QnA 목록 조회 (selectAllList를 구현)
	@Override
	public List<QnaDTO.QnaMainListDTO> selectAllList(String board_category, String search_date, String search_key,
			String search_query) {

		// 매개변수 값의 일관성을 유지하기 위해 null 및 공백 처리
		board_category = board_category != null ? board_category.trim() : "";
		search_date = search_date != null ? search_date.trim() : "";
		search_query = search_query != null ? search_query.trim() : "";
		if (board_category.isEmpty() && search_date.isEmpty() && search_query.isEmpty()) {
			return qnaRepository.findAllQnaList();
		} else {

			// 현재 날짜를 기준으로 검색 날짜를 계산
			LocalDateTime currentDate = LocalDateTime.now();

			// 검색 날짜는 "week", "month", "month3" 중 하나에 따라 현재 날짜에서 일정 기간을 빼서 설정
			if ("week".equals(search_date)) {
				search_date = currentDate.minus(1, ChronoUnit.WEEKS).toString();
			} else if ("month".equals(search_date)) {
				search_date = currentDate.minus(1, ChronoUnit.MONTHS).toString();
			} else if ("month3".equals(search_date)) {
				search_date = currentDate.minus(3, ChronoUnit.MONTHS).toString();
			} else {
				search_date = "";
			}

			// 검색 날짜는 LocalDateTime 객체로 변환
			LocalDateTime searchDate = (search_date != null && !search_date.isEmpty())
					? LocalDateTime.parse(search_date)
					: null;

			// 조건에 따라 findConditionQnaList 메서드에 전달
			return qnaRepository.findConditionQnaList(board_category, searchDate, search_key, search_query);
		}

	}
}
