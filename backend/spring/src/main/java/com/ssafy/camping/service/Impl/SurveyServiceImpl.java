package com.ssafy.camping.service.Impl;

import com.ssafy.camping.dto.Survey.SurveyReqDto;
import com.ssafy.camping.dto.Survey.SurveyResDto;
import com.ssafy.camping.entity.*;
import com.ssafy.camping.repository.*;
import com.ssafy.camping.service.SurveyService;
import com.ssafy.camping.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class SurveyServiceImpl implements SurveyService {

    private final SurveyRepository surveyRepository;

    @Override
    public Map<String, Object> registerSurvey(SurveyReqDto surveyReqDto) throws Exception {
        log.debug("SurveyService registerSurvey call");
        Map<String, Object> resultMap = new HashMap<>();

        //설문 저장
        Survey survey = Survey.builder()
                .userUid(surveyReqDto.getUserUid())
                .q1Equipment(surveyReqDto.getQ1Equipment())
                .q2Distance(surveyReqDto.getQ2Distance())
                .q3Environment(surveyReqDto.getQ3Environment())
                .q4Pet(surveyReqDto.getQ4Pet())
                .userX(surveyReqDto.getUserX())
                .userY(surveyReqDto.getUserY()).build();

        surveyRepository.save(survey);

        resultMap.put("message", Message.CREATE_SURVEY_SUCCESS);

        return resultMap;
    }

    @Override
    public Map<String, Object> getSurvey(String userUid) throws Exception {
        log.debug("SurveyService getSurvey call");
        Map<String, Object> resultMap = new HashMap<>();

        Optional<Survey> survey = surveyRepository.findByUserUid(userUid);
        if(!survey.isPresent()){
            resultMap.put("message", Message.NOT_FOUND_USER);
            return resultMap;
        }

        SurveyResDto surveyResDto = SurveyResDto.builder()
                .q1Equipment(survey.get().getQ1Equipment())
                .q2Distance(survey.get().getQ2Distance())
                .q3Environment(survey.get().getQ3Environment())
                .q4Pet(survey.get().getQ4Pet())
                .userX(survey.get().getUserX())
                .userY(survey.get().getUserY()).build();

        resultMap.put("survey", surveyResDto);
        resultMap.put("message", Message.FIND_SURVEY_SUCCESS);

        return resultMap;
    }
}
