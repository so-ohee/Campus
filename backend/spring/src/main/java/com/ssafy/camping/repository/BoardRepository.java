package com.ssafy.camping.repository;

import com.ssafy.camping.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Integer> {
    Page<Board> findByCampingIdAndDeleteState(Integer campingId, int deleteState, Pageable pageable);

    Page<Board> findByDeleteState(int deleteState, Pageable pageable);

    Page<Board> findByCategoryAndDeleteState(String category, int deleteState, Pageable pageable);
}
