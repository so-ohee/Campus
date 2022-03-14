package com.ssafy.camping.service;

import com.ssafy.camping.dto.Review.ReviewCreateDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface ReviewService {
    //캠핑장 후기 등록
    Map<String, Object> register (ReviewCreateDto reviewDto, MultipartFile[] files) throws Exception;
    //캠핑장 상세보기에서 후기 조회
    Map<String, Object> campsiteReviewList (Integer campingId, int page) throws Exception;
}
