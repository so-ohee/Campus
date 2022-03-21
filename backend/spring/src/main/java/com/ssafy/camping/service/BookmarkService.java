package com.ssafy.camping.service;

import java.util.Map;

public interface BookmarkService {
    //북마크 목록
    Map<String, Object> userListBookmark(String userUid, int page) throws Exception;
}
