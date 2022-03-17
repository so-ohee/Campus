package com.ssafy.camping.repository;

import com.ssafy.camping.entity.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitRepository extends JpaRepository<Visit, Integer> {
    Visit findByCampingIdAndUserUid(Integer campingId, String userUid);
}
