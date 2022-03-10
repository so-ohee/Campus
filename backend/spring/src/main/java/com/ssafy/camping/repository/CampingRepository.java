package com.ssafy.camping.repository;

import com.ssafy.camping.entity.Camping;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampingRepository extends JpaRepository<Camping, Integer> {
}
