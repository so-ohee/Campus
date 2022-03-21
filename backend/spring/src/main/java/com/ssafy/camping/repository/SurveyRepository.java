package com.ssafy.camping.repository;

import com.ssafy.camping.entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyRepository extends JpaRepository<Survey, String> {
    boolean existsByUserUid(String userUid);
}
