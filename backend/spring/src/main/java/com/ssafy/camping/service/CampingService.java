package com.ssafy.camping.service;

import java.util.Map;

public interface CampingService {
    //캠핑장 상세보기
    Map<String, Object> getCampsite(int campingId, String userUid) throws Exception;
}
