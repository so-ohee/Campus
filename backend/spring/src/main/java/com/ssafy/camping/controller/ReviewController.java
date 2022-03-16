package com.ssafy.camping.controller;

import com.ssafy.camping.dto.Review.ReviewCreateDto;
import com.ssafy.camping.service.ReviewService;
import com.ssafy.camping.utils.Message;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
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
    public ResponseEntity register(@Valid @RequestPart ReviewCreateDto review,
                                   @RequestPart(required = false) MultipartFile[] files) {
        log.debug("ReviewController register call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = reviewService.postReview(review, files);
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

    @ApiOperation(value = "캠핑장 상세보기에서 후기 목록 조회")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "campingId", value = "캠핑장 고유 번호", required = true,
                    dataType = "int", paramType = "query"),
            @ApiImplicitParam(name = "page", value = "페이지 번호", required = false,
                    dataType = "int", paramType = "query")
    })
    @GetMapping()
    public ResponseEntity campsiteReviewList(@RequestParam Integer campingId,
                                             @RequestParam(required = false, defaultValue = "0") int page) {
        log.debug("ReviewController campsiteReviewList call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = reviewService.campsiteReviewList(campingId, page-1);
            if(resultMap.get("message").equals(Message.FIND_CAMPSITE_REVIEW_SUCCESS)) {
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            log.error(Message.FIND_CAMPSITE_REVIEW_FAIL+": {}",e.getMessage());

            resultMap.put("message", Message.FIND_CAMPSITE_REVIEW_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "캠핑장 후기 상세보기")
    @GetMapping("/{reviewId}")
    public ResponseEntity getCampsiteReview(@PathVariable Integer reviewId) {
        log.debug("ReviewController getCampsiteReview call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = reviewService.getReview(reviewId);
            if(resultMap.get("message").equals(Message.FIND_CAMPSITE_REVIEW_SUCCESS)) {
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            log.error(Message.FIND_CAMPSITE_REVIEW_FAIL+": {}",e.getMessage());

            resultMap.put("message", Message.FIND_CAMPSITE_REVIEW_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }

    @ApiOperation(value = "캠핑장 후기 삭제")
    @DeleteMapping("/{reviewId}")
    public ResponseEntity capmsiteReviewDelete(@PathVariable Integer reviewId) {
        log.debug("ReviewController capmsiteReviewDelete call");

        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            resultMap = reviewService.deleteReview(reviewId);
            if(resultMap.get("message").equals(Message.DELETE_REVIEW_SUCCESS)) {
                status = HttpStatus.OK;
            }
        } catch (Exception e) {
            log.error(Message.DELETE_REVIEW_FAIL+": {}",e.getMessage());

            resultMap.put("message", Message.DELETE_REVIEW_FAIL);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity(resultMap, status);
    }
}
