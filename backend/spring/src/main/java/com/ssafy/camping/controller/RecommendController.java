package com.ssafy.camping.controller;

import com.ssafy.camping.service.CampingService;
import com.ssafy.camping.service.RecommendService;
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
@RequestMapping("/mainRecommend")
@RequiredArgsConstructor
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class RecommendController {

    private final RecommendService recommendService;

    @ApiOperation(value = "메인 페이지 캠핑장 추천(계절, 블로그 인기)")
    @GetMapping()
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userUid", value = "회원 고유 번호(임시, 없어도 됨)", required = false,
                    dataType = "string", paramType = "query")
    })
    public ResponseEntity mainRecommend(@RequestParam(required = false) String userUid) {
        log.debug("RecommendController mainRecommend call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = recommendService.mainRecommend(userUid);
            if(resultMap.get("message").equals(Message.FIND_CAMPSITE_SUCCESS)) //캠핑장 조회 성공
                status = HttpStatus.OK;
        } catch (Exception e) {
//            e.printStackTrace();
            log.error(Message.FIND_CAMPSITE_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.FIND_CAMPSITE_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }
}
