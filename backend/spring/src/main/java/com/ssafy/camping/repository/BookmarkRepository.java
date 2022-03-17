package com.ssafy.camping.repository;

import com.ssafy.camping.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository<Bookmark, Integer> {
    Bookmark findByCampingIdAndUserUid(Integer campingId, String userUid);
}
