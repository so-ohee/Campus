package com.ssafy.camping.service.Impl;

import com.ssafy.camping.dto.Review.ReviewCreateDto;
import com.ssafy.camping.entity.Rating;
import com.ssafy.camping.entity.Review;
import com.ssafy.camping.repository.RatingRepository;
import com.ssafy.camping.repository.ReviewRepository;
import com.ssafy.camping.service.FileService;
import com.ssafy.camping.service.ReviewService;
import com.ssafy.camping.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final RatingRepository ratingRepository;

    private final FileService fileService;

    @Override
    public Map<String, Object> register(ReviewCreateDto reviewDto, MultipartFile[] files) throws Exception {
        log.debug("ReviewService register call");
        Map<String, Object> resultMap = new HashMap<>();

        //캠핑장 후기 저장
        Review review = Review.builder()
                .userUid(reviewDto.getUserUid())
                .campingId(reviewDto.getCampingId())
                .title(reviewDto.getTitle())
                .content(reviewDto.getContent()).build();
        reviewRepository.save(review);

        //파일이 존재할 경우 캠핑장 후기 파일 저장
        if(files != null){
            //파일 확장자 검사
            if(!fileService.fileExtensionCheck(files)) {
                resultMap.put("message", Message.FILE_EXTENSION_EXCEPTION);
                return resultMap;
            }
            //파일 저장
            fileService.reviewFileSave(review, files);
        }

        //캠핑장 평점 저장
        Rating rating = Rating.builder()
                .reviewId(review.getReviewId())
                .environment(reviewDto.getEnvironment())
                .facility(reviewDto.getFacility())
                .service(reviewDto.getService()).build();
        ratingRepository.save(rating);

        resultMap.put("message", Message.CREATE_REVIEW_SUCCESS);
        resultMap.put("reviewId", review.getReviewId());

        return resultMap;
    }
}
