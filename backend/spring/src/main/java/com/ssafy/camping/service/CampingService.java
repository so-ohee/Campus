package com.ssafy.camping.service;

import com.ssafy.camping.dto.Camping.CampingListDto;

import java.util.List;
import java.util.Map;

public interface CampingService {
    //캠핑장 상세보기
    Map<String, Object> getCampsite(int campingId, String userUid) throws Exception;
    //캠핑장 목록 만들기
    List<CampingListDto> makeListCampsite (List<Integer> campingIds) throws Exception;
    //지역별 캠핑장 조회
    Map<String, Object> searchCampsite(String doNm, String sigunguNm, String facltNm, int page) throws Exception;
}
