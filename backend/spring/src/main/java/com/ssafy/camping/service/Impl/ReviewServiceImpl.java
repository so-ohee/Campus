package com.ssafy.camping.service.Impl;

import com.ssafy.camping.dto.FileDto;
import com.ssafy.camping.dto.Review.CampsiteReviewResDto;
import com.ssafy.camping.dto.Review.ReviewCreateDto;
import com.ssafy.camping.dto.Review.ReviewResDto;
import com.ssafy.camping.entity.FileReview;
import com.ssafy.camping.entity.Rating;
import com.ssafy.camping.entity.Review;
import com.ssafy.camping.repository.CampingRepository;
import com.ssafy.camping.repository.RatingRepository;
import com.ssafy.camping.repository.ReviewRepository;
import com.ssafy.camping.service.FileService;
import com.ssafy.camping.service.ReviewService;
import com.ssafy.camping.utils.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final RatingRepository ratingRepository;
    private final CampingRepository campingRepository;

    private final FileService fileService;

    @Override
    public Map<String, Object> postReview (ReviewCreateDto reviewDto, MultipartFile[] files) throws Exception {
        log.debug("ReviewService postReview call");
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
                .review(review)
                .environment(reviewDto.getEnvironment())
                .facility(reviewDto.getFacility())
                .service(reviewDto.getService()).build();
        ratingRepository.save(rating);

        resultMap.put("message", Message.CREATE_REVIEW_SUCCESS);
        resultMap.put("reviewId", review.getReviewId());

        return resultMap;
    }

    @Transactional
    @Override
    public Map<String, Object> campsiteReviewList(Integer campingId, int page) throws Exception {
        log.debug("ReviewService campsiteReviewList call");

        Map<String, Object> resultMap = new HashMap<>();
        Page<Review> review = reviewRepository.findByCampingIdAndDeleteState(campingId, 0, PageRequest.of(page, 5, Sort.by(Sort.Direction.DESC, "reviewId")));
        if(review.isEmpty()) {
            resultMap.put("message", Message.NOT_FOUND_CAMPSITE_REVIEW);
            return resultMap;
        }

        List<CampsiteReviewResDto> list = new ArrayList<>();
        for(Review r : review) {
            Rating rating = r.getRating();
            double ratingAvg = (rating.getEnvironment() + rating.getFacility() + rating.getService()) / 3.0;

            CampsiteReviewResDto campsiteReviewResDto = CampsiteReviewResDto.builder()
                    .reviewId(r.getReviewId())
                    .userUid(r.getUserUid())
                    .rating(ratingAvg)
                    .title(r.getTitle())
                    .createTime(r.getCreateTime())
                    .hit(r.getHit()).build();
            list.add(campsiteReviewResDto);
        }

        resultMap.put("message", Message.FIND_CAMPSITE_REVIEW_SUCCESS);
        resultMap.put("totalPage", review.getTotalPages()+1); //총 페이지 수
        resultMap.put("review", list);

        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> getReview(Integer reviewId) throws Exception {
        log.debug("ReviewService getReview call");

        Map<String, Object> resultMap = new HashMap<>();
        Optional<Review> review = reviewRepository.findById(reviewId);
        if(!review.isPresent() || review.get().getDeleteState()==1) { //존재하는 후기인지 확인
            resultMap.put("message", Message.NOT_FOUND_CAMPSITE_REVIEW);
            return resultMap;
        }

        //캠핑장 명
        String campsite = campingRepository.findById(review.get().getCampingId()).get().getFacltNm();
        //평점
        Rating rating = review.get().getRating();

        //파일
        List<FileDto> files = new ArrayList<>();
        for(FileReview file : review.get().getFiles()) {
            files.add(new FileDto(file.getFileId(), file.getFilePath()));
        }

        //조회수
        int hit = review.get().getHit()+1;
        //조회수 증가
        review.get().setHit(hit);
        reviewRepository.save(review.get());

        ReviewResDto reviewDto = ReviewResDto.builder()
                .reviewId(review.get().getReviewId())
                .userUid(review.get().getUserUid())
                .campingId(review.get().getCampingId())
                .facltNm(campsite)
                .environment(rating.getEnvironment())
                .facility(rating.getFacility())
                .service(rating.getService())
                .title(review.get().getTitle())
                .files(files)
                .content(review.get().getContent())
                .createTime(review.get().getCreateTime())
                .updateTime(review.get().getUpdateTime())
                .hit(hit).build();

        resultMap.put("review", reviewDto);
        resultMap.put("message", Message.FIND_CAMPSITE_REVIEW_SUCCESS);
        return resultMap;
    }

    @Override
    @Transactional
    public Map<String, Object> deleteReview(Integer reviewId) throws Exception {
        log.debug("ReviewService deleteReview call");

        Map<String, Object> resultMap = new HashMap<>();
        Optional<Review> review = reviewRepository.findById(reviewId);
        if(!review.isPresent() || review.get().getDeleteState()==1) {
            resultMap.put("message", Message.NOT_FOUND_CAMPSITE_REVIEW);
            return resultMap;
        }
        //캠핑장 후기 삭제 처리
        review.get().setDeleteState(1);
        reviewRepository.save(review.get());

        //해당 후기에 파일이 존재한다면 파일 삭제
        if(review.get().getFiles()!=null) {
            List<FileReview> files = review.get().getFiles();
            fileService.reviewFileDelete(files);
        }

        resultMap.put("message", Message.DELETE_REVIEW_SUCCESS);
        return resultMap;
    }
}
