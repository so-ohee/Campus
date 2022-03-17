package com.ssafy.camping.repository;

import com.ssafy.camping.entity.FileBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileBoardRepository extends JpaRepository<FileBoard, Integer> {
}
