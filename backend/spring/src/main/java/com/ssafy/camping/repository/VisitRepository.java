package com.ssafy.camping.repository;

import com.ssafy.camping.entity.Visit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitRepository extends JpaRepository<Visit, Integer> {
    boolean existsByCampingIdAndUserUid(Integer campingId, String userUid);

    Page<Visit> findByUserUid(String userUid, Pageable pageable);

    void deleteByCampingIdAndUserUid(Integer campingId, String userUid);
}
