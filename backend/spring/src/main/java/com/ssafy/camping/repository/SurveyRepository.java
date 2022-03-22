package com.ssafy.camping.repository;

import com.ssafy.camping.entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SurveyRepository extends JpaRepository<Survey, String> {
    boolean existsByUserUid(String userUid);
    Optional<Survey> findByUserUid(String s);
}
