package com.ssafy.camping.service;

import com.ssafy.camping.entity.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileService {
    //파일 확장자 검사
    boolean fileExtensionCheck(MultipartFile[] files) throws Exception;

    //게시글 파일 저장
    void boardFileSave(Board board, MultipartFile[] files) throws Exception;
    //게시글 파일 삭제
    void boardFileDelete(List<FileBoard> files) throws Exception;
}
