package com.ssafy.camping.service.Impl;

import com.ssafy.camping.entity.*;
import com.ssafy.camping.repository.FileBoardRepository;
import com.ssafy.camping.service.FileService;
import com.ssafy.camping.service.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    private final S3Service s3Service;
    private final FileBoardRepository fileBoardRepository;

    @Override
    public boolean fileExtensionCheck(MultipartFile[] files) throws Exception{
        log.debug("FileService fileExtensionCheck call");

        for(MultipartFile mfile : files){ //파일 확장자 검사
            String originFileName = mfile.getOriginalFilename();
            String extension = originFileName.substring(originFileName.length()-3);

            if(!(extension.equals("jpg") || extension.equals("png") || extension.equals("JPG") || extension.equals("PNG")
                    || extension.equals("jpeg") || extension.equals("JPEG")))
                return false;
        }
        return true;
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

    @Override
    public String userFileUpdate(String profile, MultipartFile file) throws Exception {
        //프로필이 s3에 저장되어 있는 경우 s3삭제
        if(profile!=null && profile.contains("s3")) {
            s3Service.delete(profile);
        }

        //profile이 null이 아닌경우 s3에 저장
        return file!=null ? s3Service.upload(file) : "";
    }
}
