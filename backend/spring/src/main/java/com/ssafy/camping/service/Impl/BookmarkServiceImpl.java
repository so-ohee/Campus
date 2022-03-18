package com.ssafy.camping.service.Impl;

import com.ssafy.camping.repository.BookmarkRepository;
import com.ssafy.camping.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;

    @Override
    public boolean stateBookmark(Integer campingId, String userUid) throws Exception {
        log.debug("BookmarkService stateBookmark call");

        return bookmarkRepository.existsByCampingIdAndUserUid(campingId, userUid);
    }
}
