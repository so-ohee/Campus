package com.ssafy.camping.service;

import java.util.Map;

public interface VisitService {
    //방문 저장 or 취소
    Map<String, Object> userVisit(String userUid, Integer campingId) throws Exception;
    //방문 추가
    Map<String, Object> saveVisitCampsite(Integer campingId, String userUid) throws Exception;
    //방문 취소
    Map<String, Object> deleteVisitCampsite(Integer campingId, String userUid) throws Exception;
    //방문 목록
    Map<String, Object> userListVisit (String userUid, int page) throws Exception;
}
