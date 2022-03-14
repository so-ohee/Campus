package com.ssafy.camping.service;

import com.ssafy.camping.entity.Review;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    //파일 확장자 검사
    boolean fileExtensionCheck(MultipartFile[] files) throws Exception;

    //리뷰 파일 저장
    void reviewFileSave(Review review, MultipartFile[] files) throws Exception;
    //리뷰 파일 삭제
    void reviewFileDelete(Integer reviewId) throws Exception;
}
