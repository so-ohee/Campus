package com.ssafy.camping.service;

public interface VisitService {
    //방문 여부 확인
    boolean stateVisitCampsite (Integer campingId, String userUid) throws Exception;
}
