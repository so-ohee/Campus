package com.ssafy.camping.service.Impl;

import com.ssafy.camping.entity.FileReview;
import com.ssafy.camping.entity.Review;
import com.ssafy.camping.repository.FileReviewRepository;
import com.ssafy.camping.service.FileService;
import com.ssafy.camping.service.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    private final S3Service s3Service;
    private final FileReviewRepository fileReviewRepository;

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
}
