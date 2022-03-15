package com.ssafy.camping.service.Impl;

import com.ssafy.camping.entity.FileReview;
import com.ssafy.camping.entity.Review;
import com.ssafy.camping.repository.FileReviewRepository;
import com.ssafy.camping.repository.ReviewRepository;
import com.ssafy.camping.service.FileService;
import com.ssafy.camping.service.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    private final S3Service s3Service;
    private final FileReviewRepository fileReviewRepository;
    private final ReviewRepository reviewRepository;

    @Override
    public boolean fileExtensionCheck(MultipartFile[] files) throws Exception{
        log.debug("FileService fileExtensionCheck call");

        for(MultipartFile mfile : files){ //파일 확장자 검사
            String originFileName = mfile.getOriginalFilename();
            String extension = originFileName.substring(originFileName.length()-3);

            if(!(extension.equals("jpg") || extension.equals("png")))
                return false;
        }
        return true;
    }

    @Override
    public void reviewFileSave(Review review, MultipartFile[] files) throws Exception {
        log.debug("FileService reviewFileSave call");

        for (MultipartFile mfile : files) {
            String imgURL = s3Service.upload(mfile);  //S3에 파일 업로드 후 URL 가져오기
            FileReview file =  FileReview.builder()
                    .filePath(imgURL)
                    .review(review).build();
            fileReviewRepository.save(file); //DB에 S3 URL 저장
        }
    }

    @Override
    @Transactional
    public void reviewFileDelete(Integer reviewId) throws Exception {
        log.debug("FileService reviewFileDelete call");

        Optional<Review> review = reviewRepository.findById(reviewId);
        //파일이 존재할 경우
        if(review.get().getFiles()!=null) {
            for(FileReview file : review.get().getFiles()) {
                //S3에서 파일 삭제
                s3Service.delete(file.getFilePath());
                //파일 테이블에서 삭제
                fileReviewRepository.deleteById(file.getFileId());
            }

        }
    }
}
