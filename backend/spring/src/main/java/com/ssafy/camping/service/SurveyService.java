package com.ssafy.camping.service;

import com.ssafy.camping.dto.Survey.SurveyReqDto;

import java.util.Map;

public interface SurveyService {
    //설문 등록
    Map<String, Object> registerSurvey(SurveyReqDto surveyReqDto) throws Exception;
    
    //설문 조회
    Map<String, Object> getSurvey(String userUid) throws Exception;
}
