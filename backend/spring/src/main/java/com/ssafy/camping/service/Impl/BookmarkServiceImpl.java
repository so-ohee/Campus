package com.ssafy.camping.service.Impl;

import com.ssafy.camping.entity.Bookmark;
import com.ssafy.camping.repository.BookmarkRepository;
import com.ssafy.camping.repository.CampingRepository;
import com.ssafy.camping.service.BookmarkService;
import com.ssafy.camping.service.CampingService;
import com.ssafy.camping.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final CampingRepository campingRepository;
    private final CampingService campingService;

    @Override
    public Map<String, Object> userListBookmark(String userUid, int page) throws Exception {
        log.debug("BookmarkService userListBookmark call");

        Map<String, Object> resultMap = new HashMap<>();
        Page<Bookmark> bookmarks = bookmarkRepository.findByUserUid(userUid, PageRequest.of(page, 6, Sort.by(Sort.Direction.DESC, "bookmarkId")));
        if(bookmarks.isEmpty()) {
            resultMap.put("message", Message.NOT_FOUND_BOOKMARK);
            return resultMap;
        }

        List<Integer> campingIds = new ArrayList<>();
        for(Bookmark b : bookmarks) {
            campingIds.add(b.getCampingId());
        }

        resultMap.put("message", Message.FIND_BOOKMARK_SUCCESS);
        resultMap.put("campsite", campingService.makeListCampsite(campingIds));
        resultMap.put("totalPage", bookmarks.getTotalPages());
        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> bookmark(String userUid, Integer campingId) throws Exception {
        log.debug("BookmarkService bookmark call");

        Map<String, Object> resultMap = new HashMap<>();
        if(!campingRepository.findById(campingId).isPresent()) { //존재하는 캠핑장인지 확인
            resultMap.put("message", Message.NOT_FOUND_CAMPSITE);
            return resultMap;
        }

        if(bookmarkRepository.existsByCampingIdAndUserUid(campingId, userUid)) { //북마크 저장되어 있으므로 취소
            bookmarkRepository.deleteByCampingIdAndUserUid(campingId, userUid); //북마크 취소
            resultMap.put("message", Message.DELETE_BOOKMARK_SUCCESS);
        } else { //북마크 저장 안되어 있으므로 저장
            Bookmark bookmark = Bookmark.builder()
                    .campingId(campingId)
                    .userUid(userUid).build();
            bookmarkRepository.save(bookmark);
            resultMap.put("message", Message.SAVE_BOOKMARK_SUCCESS);
        }

        resultMap.put("bookmark", bookmarkRepository.existsByCampingIdAndUserUid(campingId, userUid));
        return resultMap;
    }
}
