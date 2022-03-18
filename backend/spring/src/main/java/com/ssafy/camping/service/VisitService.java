package com.ssafy.camping.service;

import java.util.Map;

public interface VisitService {
    //방문 여부 확인
    boolean stateVisitCampsite (Integer campingId, String userUid) throws Exception;
    //방문 추가
    Map<String, Object> saveVisitCampsite(Integer campingId, String userUid) throws Exception;
}
