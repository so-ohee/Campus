package com.ssafy.camping.service.Impl;

import com.ssafy.camping.entity.*;
import com.ssafy.camping.repository.FileBoardRepository;
import com.ssafy.camping.repository.FileNoticeRepository;
import com.ssafy.camping.repository.FileReviewRepository;
import com.ssafy.camping.repository.ReviewRepository;
import com.ssafy.camping.service.FileService;
import com.ssafy.camping.service.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Properties;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    private final S3Service s3Service;
    private final FileReviewRepository fileReviewRepository;
    private final FileNoticeRepository fileNoticeRepository;
    private final FileBoardRepository fileBoardRepository;

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
    public void reviewFileDelete(List<FileReview> files) throws Exception {
        log.debug("FileService reviewFileDelete call");

        for(FileReview file : files) {
            //S3에서 파일 삭제
            s3Service.delete(file.getFilePath());
            //파일 테이블에서 삭제
            fileReviewRepository.deleteById(file.getFileId());
        }
    }

    @Override
    public void noticeFileSave(Notice notice, MultipartFile[] files) throws Exception {
        log.debug("FileService noticeFileSave call");

        for (MultipartFile mfile : files) {
            String imgURL = s3Service.upload(mfile);  //S3에 파일 업로드 후 URL 가져오기
            FileNotice file =  FileNotice.builder()
                    .filePath(imgURL)
                    .notice(notice).build();
            fileNoticeRepository.save(file); //DB에 S3 URL 저장
        }
    }

    @Override
    public void noticeFileDelete(List<FileNotice> files) throws Exception {
        log.debug("FileService noticeFileDelete call");

        for(FileNotice file : files) {
            //S3에서 파일 삭제
            s3Service.delete(file.getFilePath());
        }
    }

    @Override
    public void boardFileSave(Board board, MultipartFile[] files) throws Exception {
        log.debug("FileService boardFileSave call");

        for (MultipartFile mfile : files) {
            String imgURL = s3Service.upload(mfile);  //S3에 파일 업로드 후 URL 가져오기
            FileBoard file =  FileBoard.builder()
                    .filePath(imgURL)
                    .board(board).build();
            fileBoardRepository.save(file); //DB에 S3 URL 저장
        }
    }

    @Override
    public void boardFileDelete(List<FileBoard> files) throws Exception {
        log.debug("FileService boardFileDelete call");

        for(FileBoard file : files) {
            //S3에서 파일 삭제
            s3Service.delete(file.getFilePath());
            //파일 테이블에서 삭제
            fileBoardRepository.deleteById(file.getFileId());
        }
    }
}
