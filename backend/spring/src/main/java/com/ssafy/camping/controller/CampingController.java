package com.ssafy.camping.controller;

import com.ssafy.camping.service.CampingService;
import com.ssafy.camping.utils.Message;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/camping")
@RequiredArgsConstructor
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class CampingController {

    private final CampingService campingService;

    @ApiOperation(value = "캠핑장 상세보기")
    @GetMapping
    @ApiImplicitParams({
            @ApiImplicitParam(name = "campingId", value = "캠핑장 고유 번호", required = true,
                    dataType = "int", paramType = "query"),
            @ApiImplicitParam(name = "userUid", value = "회원 고유 번호", required = false,
                    dataType = "string", paramType = "query")
    })
    public ResponseEntity getCampsite(@RequestParam int campingId,
                                      @RequestParam(required = false) String userUid) {
        log.debug("CampingController getCamping call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = campingService.getCampsite(campingId, userUid);
            if(resultMap.get("message").equals(Message.FIND_CAMPSITE_SUCCESS)) //캠핑장 조회 성공
                status = HttpStatus.OK;
        } catch (Exception e) {
            log.error(Message.FIND_CAMPSITE_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.FIND_CAMPSITE_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "지역별 캠핑장 검색")
    @GetMapping("search")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "doNm", value = "시/도", required = true,
                    dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "sigunguNm", value = "시/군/구", required = false,
                    dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "page", value = "페이지 번호", required = false,
                    dataType = "int", paramType = "query")
    })
    public ResponseEntity searchCampsite(@RequestParam String doNm,
                                         @RequestParam(required = false) String sigunguNm,
                                         @RequestParam(defaultValue = "1") int page) {
        log.debug("CampingController searchCampsite call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = campingService.searchCampsite(doNm, sigunguNm, page-1);
            if(resultMap.get("message").equals(Message.FIND_CAMPSITE_SUCCESS)) //캠핑장 조회 성공
                status = HttpStatus.OK;
        } catch (Exception e) {
            log.error(Message.FIND_CAMPSITE_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.FIND_CAMPSITE_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }
}
