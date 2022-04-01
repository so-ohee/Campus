package com.ssafy.camping.repository;

import com.ssafy.camping.entity.Camping;
import com.ssafy.camping.entity.FileCamping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileCampingRepository extends JpaRepository<FileCamping, Integer> {
    List<FileCamping> findByCamping(Camping camping);
}
