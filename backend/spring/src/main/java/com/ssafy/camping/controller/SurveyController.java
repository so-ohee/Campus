package com.ssafy.camping.controller;

import com.ssafy.camping.dto.Survey.SurveyReqDto;
import com.ssafy.camping.service.SurveyService;
import com.ssafy.camping.utils.Message;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/survey")
@RequiredArgsConstructor
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class SurveyController {

    private final SurveyService surveyService;

    @ApiOperation(value = "설문 등록/수정")
    @PostMapping
    public ResponseEntity registerSurvey(@Valid @RequestBody SurveyReqDto survey) {
        log.debug("SurveyController registerSurvey call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = surveyService.registerSurvey(survey);

            if (resultMap.get("message").equals(Message.CREATE_BOARD_SUCCESS)) {
                status = HttpStatus.CREATED;
            }
        } catch (Exception e) {
            log.error(Message.CREATE_BOARD_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.CREATE_BOARD_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "설문 조회")
    @GetMapping("/{userUid}")
    public ResponseEntity getSurvey(@PathVariable String userUid){
        log.debug("SurveyController getSurvey call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = surveyService.getSurvey(userUid);

            if(resultMap.get("message").equals(Message.FIND_BOARD_SUCCESS)) {
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            log.error(Message.FIND_BOARD_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.FIND_BOARD_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }
}