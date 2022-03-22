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
                .induty(surveyReqDto.getInduty())
                .lctCl(surveyReqDto.getLctCl())
                .doNm(surveyReqDto.getDoNm())
                .siteBottomCl(surveyReqDto.getSiteBottomCl())
                .sbrsCl(surveyReqDto.getSbrsCl())
                .animalCmgCl(surveyReqDto.getAnimalCmgCl()).build();

        surveyRepository.save(survey);

        resultMap.put("message", Message.CREATE_BOARD_SUCCESS);

        return resultMap;
    }

    @Override
    public Map<String, Object> getSurvey(String userUid) throws Exception {
        log.debug("SurveyService getSurvey call");
        Map<String, Object> resultMap = new HashMap<>();

        Optional<Survey> survey = surveyRepository.findByUserUid(userUid);
        if(!survey.isPresent()){
            resultMap.put("message", Message.NOT_FOUND_BOARD);
            return resultMap;
        }

        SurveyResDto surveyResDto = SurveyResDto.builder()
                .induty(survey.get().getInduty())
                .lctCl(survey.get().getLctCl())
                .doNm(survey.get().getDoNm())
                .siteBottomCl(survey.get().getSiteBottomCl())
                .sbrsCl(survey.get().getSbrsCl())
                .animalCmgCl(survey.get().getAnimalCmgCl()).build();

        resultMap.put("survey", surveyResDto);
        resultMap.put("message", Message.FIND_BOARD_SUCCESS);

        return resultMap;
    }
}
