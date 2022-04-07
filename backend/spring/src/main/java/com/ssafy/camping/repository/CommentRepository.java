package com.ssafy.camping.repository;

import com.ssafy.camping.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    void deleteByBoardId(Integer boardId);

    Page<Comment> findByBoardId(Integer boardId, Pageable pageable);

    List<Comment> findByUserUid(String userUid);
}
