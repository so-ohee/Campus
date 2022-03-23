package com.ssafy.camping.controller;

import java.util.HashMap;
import java.util.Map;

import com.ssafy.camping.service.NewsService;
import com.ssafy.camping.utils.Message;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/news")
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class NewsController {

    private final NewsService newsService;

    @ApiOperation(value = "캠핑 뉴스 목록")
    @ApiImplicitParam(name = "page", value = "페이지 번호", required = false,
            dataType = "int", paramType = "query")
    @GetMapping()
    public ResponseEntity getNews(@RequestParam(defaultValue = "1") Integer page) throws Exception {
        log.debug("NewsController getNews call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = newsService.getNews(page);
            if(resultMap.get("message").equals(Message.FIND_NEWS_SUCCESS)) {
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            log.error(Message.FIND_NEWS_FAIL+": {}", e.getMessage());

            resultMap.put("message", Message.FIND_NEWS_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }
}