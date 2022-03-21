package com.ssafy.camping.service;

import java.util.Map;

public interface BookmarkService {
    //북마크 여부 확인
    boolean stateBookmark (Integer campingId, String userUid) throws Exception;
    //북마크 목록
    Map<String, Object> userListBookmark(String userUid, int page) throws Exception;
}
