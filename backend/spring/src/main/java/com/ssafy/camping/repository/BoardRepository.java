package com.ssafy.camping.repository;

import com.ssafy.camping.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Integer> {
    Page<Board> findByCampingIdAndDeleteState(Integer campingId, int deleteState, Pageable pageable);

    Page<Board> findByDeleteState(int deleteState, Pageable pageable);

    Page<Board> findByCategoryAndDeleteState(String category, int deleteState, Pageable pageable);

    boolean existsByCampingIdAndUserUid(Integer campingId, String userUid);

    Page<Board> findByUserUidAndDeleteState(String userUid, int deleteState, Pageable pageable);

    List<Board> findByUserUid(String userUid);
}
