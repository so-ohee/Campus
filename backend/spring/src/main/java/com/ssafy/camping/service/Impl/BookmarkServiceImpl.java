package com.ssafy.camping.service.Impl;

import com.ssafy.camping.entity.Bookmark;
import com.ssafy.camping.repository.BookmarkRepository;
import com.ssafy.camping.service.BookmarkService;
import com.ssafy.camping.service.CampingService;
import com.ssafy.camping.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final CampingService campingService;

    @Override
    public boolean stateBookmark(Integer campingId, String userUid) throws Exception {
        log.debug("BookmarkService stateBookmark call");

        return bookmarkRepository.existsByCampingIdAndUserUid(campingId, userUid);
    }

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
}
