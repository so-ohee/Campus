package com.ssafy.camping.repository;

import com.ssafy.camping.entity.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VisitRepository extends JpaRepository<Visit, Integer> {
    Optional<Visit> findByUserUid(String userUid);
}
