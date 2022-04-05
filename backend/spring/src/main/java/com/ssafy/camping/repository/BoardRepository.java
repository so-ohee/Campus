package com.ssafy.camping.repository;

import com.ssafy.camping.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Integer> {
    Page<Board> findByCampingIdAndDeleteState(Integer campingId, int deleteState, Pageable pageable);

    Page<Board> findByDeleteState(int deleteState, Pageable pageable);

    Page<Board> findByCategoryAndDeleteState(String category, int deleteState, Pageable pageable);

    boolean existsByCampingIdAndUserUidAndDeleteState(Integer campingId, String userUid, int deleteState);

    Page<Board> findByUserUidAndDeleteState(String userUid, int deleteState, Pageable pageable);

    List<Board> findByUserUidAndDeleteState(String userUid, int deleteState);

    @Query(value = "select b from Board b where b.deleteState = ?1 and (b.title like %?2% or b.content like %?3%)")
    Page<Board> findByDeleteStateAndTitleContainingIgnoreCaseOrContentContainingIgnoreCase(int deleteState, String title, String content, Pageable pageable);
}
