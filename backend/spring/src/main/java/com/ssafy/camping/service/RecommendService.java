package com.ssafy.camping.service;

import com.ssafy.camping.dto.Camping.CampingListDto;
import com.ssafy.camping.entity.Camping;

import java.util.List;
import java.util.Map;

public interface RecommendService {
    //메인 페이지 캠핑장 추천
    Map<String, Object> mainRecommend(String userUid) throws Exception;
    List<CampingListDto> randomSelect(List<Camping> list) throws Exception;
}
