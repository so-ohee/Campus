package com.ssafy.camping.service;

public interface BookmarkService {
    //북마크 여부 확인
    boolean stateBookmark (Integer campingId, String userUid) throws Exception;
}
