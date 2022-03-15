package com.ssafy.camping.repository;

import com.ssafy.camping.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Page<Review> findByCampingIdAndDeleteState(Integer campingId, int deleteState, Pageable pageable);
}
