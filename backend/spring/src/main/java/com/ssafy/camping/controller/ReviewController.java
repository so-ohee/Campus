package com.ssafy.camping.controller;

import com.ssafy.camping.dto.Review.ReviewCreateDto;
import com.ssafy.camping.service.ReviewService;
import com.ssafy.camping.utils.Message;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class ReviewController {

    private final ReviewService reviewService;

    @ApiOperation(value = "캠핑장 후기 등록")
    @PostMapping
    public ResponseEntity register(@RequestPart ReviewCreateDto review,
                                   @RequestPart(required = false) MultipartFile[] files) {
        log.debug("ReviewController register call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = reviewService.register(review, files);
            if(resultMap.get("message").equals(Message.CREATE_REVIEW_SUCCESS)) {
                status = HttpStatus.CREATED;
            }
        } catch (Exception e) {
            log.error(Message.CREATE_REVIEW_FAIL+" : {}", e.getMessage());

            resultMap.put("message", Message.CREATE_REVIEW_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }
}
