package com.ssafy.camping.repository;

import com.ssafy.camping.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository<Bookmark, Integer> {
    boolean existsByCampingIdAndUserUid(Integer campingId, String userUid);
}
